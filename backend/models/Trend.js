import mongoose from 'mongoose';
import { isUsingMongoDB, localDB } from '../db.js';

const TrendSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  title: { type: String, required: true },
  industry: { type: String, required: true },
  description: { type: String, required: true },
  growthRate: { type: Number, default: 0 },
  source: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

TrendSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const TrendModel = mongoose.models.Trend || mongoose.model('Trend', TrendSchema);

export const Trend = {
  find: async (query = {}) => {
    if (isUsingMongoDB) {
      const findQuery = {};
      if (query.industry) findQuery.industry = query.industry;
      if (query.search) {
        findQuery.$or = [
          { title: { $regex: query.search, $options: 'i' } },
          { description: { $regex: query.search, $options: 'i' } },
          { industry: { $regex: query.search, $options: 'i' } }
        ];
      }
      return await TrendModel.find(findQuery).sort({ date: -1 });
    } else {
      const data = localDB.read();
      let list = data.trends || [];

      if (query.industry) {
        list = list.filter(item => item.industry.toLowerCase() === query.industry.toLowerCase());
      }
      if (query.search) {
        const searchVal = query.search.toLowerCase();
        list = list.filter(item => 
          item.title.toLowerCase().includes(searchVal) || 
          item.description.toLowerCase().includes(searchVal) ||
          item.industry.toLowerCase().includes(searchVal)
        );
      }

      return [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  findById: async (id) => {
    if (isUsingMongoDB) {
      return await TrendModel.findById(id);
    } else {
      const data = localDB.read();
      return (data.trends || []).find(item => item._id === id) || null;
    }
  },
  create: async (doc) => {
    if (isUsingMongoDB) {
      return await TrendModel.create(doc);
    } else {
      const data = localDB.read();
      if (!data.trends) data.trends = [];
      const newDoc = {
        _id: 't_' + Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...doc
      };
      data.trends.push(newDoc);
      localDB.write(data);
      return newDoc;
    }
  },
  findByIdAndUpdate: async (id, updateDoc) => {
    if (isUsingMongoDB) {
      return await TrendModel.findByIdAndUpdate(id, { ...updateDoc, updatedAt: new Date() }, { new: true });
    } else {
      const data = localDB.read();
      const list = data.trends || [];
      const idx = list.findIndex(item => item._id === id);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          ...updateDoc,
          updatedAt: new Date().toISOString()
        };
        data.trends = list;
        localDB.write(data);
        return list[idx];
      }
      return null;
    }
  },
  findByIdAndDelete: async (id) => {
    if (isUsingMongoDB) {
      return await TrendModel.findByIdAndDelete(id);
    } else {
      const data = localDB.read();
      const list = data.trends || [];
      const idx = list.findIndex(item => item._id === id);
      if (idx !== -1) {
        const removed = list.splice(idx, 1);
        data.trends = list;
        localDB.write(data);
        return removed[0];
      }
      return null;
    }
  },
  countDocuments: async (query = {}) => {
    if (isUsingMongoDB) {
      return await TrendModel.countDocuments(query);
    } else {
      const list = await Trend.find(query);
      return list.length;
    }
  }
};
