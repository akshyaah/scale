import mongoose from 'mongoose';
import { isUsingMongoDB, localDB } from '../db.js';

const AnalysisSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  type: { 
    type: String, 
    enum: ['startup', 'finance', 'resource', 'business_plan'], 
    required: true 
  },
  inputData: { type: mongoose.Schema.Types.Mixed, required: true },
  result: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const AnalysisModel = mongoose.models.Analysis || mongoose.model('Analysis', AnalysisSchema);

export const Analysis = {
  find: async (query = {}) => {
    if (isUsingMongoDB) {
      const findQuery = {};
      if (query.type) findQuery.type = query.type;
      return await AnalysisModel.find(findQuery).sort({ createdAt: -1 });
    } else {
      const data = localDB.read();
      let list = data.analyses || [];
      if (query.type) {
        list = list.filter(item => item.type === query.type);
      }
      return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  },
  findById: async (id) => {
    if (isUsingMongoDB) {
      return await AnalysisModel.findById(id);
    } else {
      const data = localDB.read();
      return (data.analyses || []).find(item => item._id === id) || null;
    }
  },
  create: async (doc) => {
    if (isUsingMongoDB) {
      return await AnalysisModel.create(doc);
    } else {
      const data = localDB.read();
      if (!data.analyses) data.analyses = [];
      const newDoc = {
        _id: 'a_' + Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        ...doc
      };
      data.analyses.push(newDoc);
      localDB.write(data);
      return newDoc;
    }
  },
  findByIdAndDelete: async (id) => {
    if (isUsingMongoDB) {
      return await AnalysisModel.findByIdAndDelete(id);
    } else {
      const data = localDB.read();
      const list = data.analyses || [];
      const idx = list.findIndex(item => item._id === id);
      if (idx !== -1) {
        const removed = list.splice(idx, 1);
        data.analyses = list;
        localDB.write(data);
        return removed[0];
      }
      return null;
    }
  },
  countDocuments: async (query = {}) => {
    if (isUsingMongoDB) {
      return await AnalysisModel.countDocuments(query);
    } else {
      const list = await Analysis.find(query);
      return list.length;
    }
  }
};
