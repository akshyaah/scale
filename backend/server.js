import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import { connectDB } from './db.js';
import apiRouter from './routes/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', time: new Date() });
});

// Root path handler
app.get('/', (req, res) => {
  res.send('VenturePilot AI API Server is running.');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Something went wrong on the server' });
});

// Start DB and listen
const startServer = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

startServer();
