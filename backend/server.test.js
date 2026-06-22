import request from 'supertest';
import express from 'express';
import apiRouter from './routes/index.js';
import { connectDB } from './db.js';

import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

// Health check endpoint mocked for local server test checks
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

beforeAll(async () => {
  await connectDB();
}, 20000);

afterAll(async () => {
  await mongoose.disconnect();
});

describe('VenturePilot AI API Tests', () => {
  let adminToken = '';
  let createdOpportunityId = '';

  // 1. Health check
  test('GET /health returns server status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('healthy');
  });

  // 2. Admin Auth: Login Failure
  test('POST /api/auth/login returns 400 for incorrect details', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@venturepilot.ai',
        password: 'incorrect-password'
      });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.msg).toEqual('Invalid credentials');
  });

  // 3. Admin Auth: Login Success
  test('POST /api/auth/login returns token for correct details', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@venturepilot.ai',
        password: 'admin123'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.admin.email).toEqual('admin@venturepilot.ai');
    adminToken = res.body.token; // save for subsequent tests
  });

  // 4. Admin Auth: Get Me
  test('GET /api/auth/me returns admin information if authorized', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${adminToken}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.email).toEqual('admin@venturepilot.ai');
  });

  // 5. Public Panel: Get Published Opportunities
  test('GET /api/public/opportunities returns published entries only', async () => {
    const res = await request(app).get('/api/public/opportunities');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach(item => {
      expect(item.status).toEqual('published');
    });
  });

  // 6. Admin Panel: Create Opportunity Entry
  test('POST /api/admin/opportunities creates a new item when authorized', async () => {
    const res = await request(app)
      .post('/api/admin/opportunities')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Test Opportunity Title',
        industry: 'Software',
        riskScore: 25,
        investmentRange: '₹10,000 - ₹50,000',
        growthPotential: 'High',
        description: 'Test description of the new draft opportunity model.',
        status: 'draft',
        aiRecommendation: 'Not evaluated yet'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toEqual('Test Opportunity Title');
    expect(res.body.status).toEqual('draft');
    createdOpportunityId = res.body._id; // save for subsequent tests
  });

  // 7. Public Panel: Draft items are not accessible in public list
  test('GET /api/public/opportunities does not return draft items in query list', async () => {
    const res = await request(app).get('/api/public/opportunities');
    expect(res.statusCode).toEqual(200);
    const found = res.body.find(item => item._id === createdOpportunityId);
    expect(found).toBeUndefined();
  });

  // 8. Admin Panel: Update Opportunity Entry
  test('PUT /api/admin/opportunities/:id modifies item and publishes it', async () => {
    const res = await request(app)
      .put(`/api/admin/opportunities/${createdOpportunityId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Test Opportunity Title Updated',
        status: 'published' // Publish it!
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Test Opportunity Title Updated');
    expect(res.body.status).toEqual('published');
  });

  // 9. Public Panel: Now published item is accessible by direct link
  test('GET /api/public/opportunities/:id returns item details now that it is published', async () => {
    const res = await request(app).get(`/api/public/opportunities/${createdOpportunityId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Test Opportunity Title Updated');
  });

  // 10. Admin Panel: Delete Opportunity Entry
  test('DELETE /api/admin/opportunities/:id removes the item', async () => {
    const res = await request(app)
      .delete(`/api/admin/opportunities/${createdOpportunityId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toEqual('Deleted successfully');
  });
});
