import mongoose from 'mongoose';
import { isUsingMongoDB, localDB } from '../db.js';

const FundingSourceSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Government Scheme', 'Investor', 'Incubator', 'Accelerator'], 
    required: true 
  },
  amount: { type: String, required: true },
  eligibility: { type: String, required: true },
  website: { type: String, default: '' },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

FundingSourceSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const FundingSourceModel = mongoose.models.FundingSource || mongoose.model('FundingSource', FundingSourceSchema);

export const FundingSource = {
  find: async (query = {}) => {
    if (isUsingMongoDB) {
      const findQuery = {};
      if (query.type) findQuery.type = query.type;
      if (query.search) {
        findQuery.$or = [
          { name: { $regex: query.search, $options: 'i' } },
          { description: { $regex: query.search, $options: 'i' } },
          { eligibility: { $regex: query.search, $options: 'i' } }
        ];
      }
      return await FundingSourceModel.find(findQuery).sort({ createdAt: -1 });
    } else {
      const data = localDB.read();
      let list = data.fundingSources || [];

      if (query.type) {
        list = list.filter(item => item.type === query.type);
      }
      if (query.search) {
        const searchVal = query.search.toLowerCase();
        list = list.filter(item => 
          item.name.toLowerCase().includes(searchVal) || 
          item.description.toLowerCase().includes(searchVal) ||
          item.eligibility.toLowerCase().includes(searchVal)
        );
      }

      return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  },
  findById: async (id) => {
    if (isUsingMongoDB) {
      return await FundingSourceModel.findById(id);
    } else {
      const data = localDB.read();
      return (data.fundingSources || []).find(item => item._id === id) || null;
    }
  },
  create: async (doc) => {
    if (isUsingMongoDB) {
      return await FundingSourceModel.create(doc);
    } else {
      const data = localDB.read();
      if (!data.fundingSources) data.fundingSources = [];
      const newDoc = {
        _id: 'f_' + Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...doc
      };
      data.fundingSources.push(newDoc);
      localDB.write(data);
      return newDoc;
    }
  },
  findByIdAndUpdate: async (id, updateDoc) => {
    if (isUsingMongoDB) {
      return await FundingSourceModel.findByIdAndUpdate(id, { ...updateDoc, updatedAt: new Date() }, { new: true });
    } else {
      const data = localDB.read();
      const list = data.fundingSources || [];
      const idx = list.findIndex(item => item._id === id);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          ...updateDoc,
          updatedAt: new Date().toISOString()
        };
        data.fundingSources = list;
        localDB.write(data);
        return list[idx];
      }
      return null;
    }
  },
  findByIdAndDelete: async (id) => {
    if (isUsingMongoDB) {
      return await FundingSourceModel.findByIdAndDelete(id);
    } else {
      const data = localDB.read();
      const list = data.fundingSources || [];
      const idx = list.findIndex(item => item._id === id);
      if (idx !== -1) {
        const removed = list.splice(idx, 1);
        data.fundingSources = list;
        localDB.write(data);
        return removed[0];
      }
      return null;
    }
  },
  countDocuments: async (query = {}) => {
    if (isUsingMongoDB) {
      return await FundingSourceModel.countDocuments(query);
    } else {
      const list = await FundingSource.find(query);
      return list.length;
    }
  }
};
