import mongoose from 'mongoose';
import { isUsingMongoDB, localDB } from '../db.js';

const OpportunitySchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  title: { type: String, required: true },
  industry: { type: String, required: true },
  riskScore: { type: Number, required: true },
  investmentRange: { type: String, required: true },
  growthPotential: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
  aiRecommendation: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

OpportunitySchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const OpportunityModel = mongoose.models.Opportunity || mongoose.model('Opportunity', OpportunitySchema);

export const Opportunity = {
  find: async (query = {}) => {
    if (isUsingMongoDB) {
      const findQuery = {};
      if (query.status) findQuery.status = query.status;
      if (query.industry) findQuery.industry = query.industry;
      if (query.growthPotential) findQuery.growthPotential = query.growthPotential;
      if (query.search) {
        findQuery.$or = [
          { title: { $regex: query.search, $options: 'i' } },
          { description: { $regex: query.search, $options: 'i' } },
          { industry: { $regex: query.search, $options: 'i' } }
        ];
      }
      return await OpportunityModel.find(findQuery).sort({ createdAt: -1 });
    } else {
      const data = localDB.read();
      let list = data.opportunities || [];

      if (query.status) {
        list = list.filter(item => item.status === query.status);
      }
      if (query.industry) {
        list = list.filter(item => item.industry.toLowerCase() === query.industry.toLowerCase());
      }
      if (query.growthPotential) {
        list = list.filter(item => item.growthPotential.toLowerCase() === query.growthPotential.toLowerCase());
      }
      if (query.search) {
        const searchVal = query.search.toLowerCase();
        list = list.filter(item => 
          item.title.toLowerCase().includes(searchVal) || 
          item.description.toLowerCase().includes(searchVal) ||
          item.industry.toLowerCase().includes(searchVal)
        );
      }

      return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  },
  findById: async (id) => {
    if (isUsingMongoDB) {
      return await OpportunityModel.findById(id);
    } else {
      const data = localDB.read();
      return (data.opportunities || []).find(item => item._id === id) || null;
    }
  },
  create: async (doc) => {
    if (isUsingMongoDB) {
      return await OpportunityModel.create(doc);
    } else {
      const data = localDB.read();
      if (!data.opportunities) data.opportunities = [];
      const newDoc = {
        _id: 'o_' + Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'published',
        aiRecommendation: '',
        ...doc
      };
      data.opportunities.push(newDoc);
      localDB.write(data);
      return newDoc;
    }
  },
  findByIdAndUpdate: async (id, updateDoc) => {
    if (isUsingMongoDB) {
      return await OpportunityModel.findByIdAndUpdate(id, { ...updateDoc, updatedAt: new Date() }, { new: true });
    } else {
      const data = localDB.read();
      const list = data.opportunities || [];
      const idx = list.findIndex(item => item._id === id);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          ...updateDoc,
          updatedAt: new Date().toISOString()
        };
        data.opportunities = list;
        localDB.write(data);
        return list[idx];
      }
      return null;
    }
  },
  findByIdAndDelete: async (id) => {
    if (isUsingMongoDB) {
      return await OpportunityModel.findByIdAndDelete(id);
    } else {
      const data = localDB.read();
      const list = data.opportunities || [];
      const idx = list.findIndex(item => item._id === id);
      if (idx !== -1) {
        const removed = list.splice(idx, 1);
        data.opportunities = list;
        localDB.write(data);
        return removed[0];
      }
      return null;
    }
  },
  countDocuments: async (query = {}) => {
    if (isUsingMongoDB) {
      return await OpportunityModel.countDocuments(query);
    } else {
      const list = await Opportunity.find(query);
      return list.length;
    }
  }
};
