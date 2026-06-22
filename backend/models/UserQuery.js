import mongoose from 'mongoose';
import { isUsingMongoDB, localDB } from '../db.js';

const UserQuerySchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const UserQueryModel = mongoose.models.UserQuery || mongoose.model('UserQuery', UserQuerySchema);

export const UserQuery = {
  find: async (query = {}) => {
    if (isUsingMongoDB) {
      return await UserQueryModel.find(query).sort({ createdAt: -1 });
    } else {
      const data = localDB.read();
      let list = data.usersQueries || [];
      return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  },
  create: async (doc) => {
    if (isUsingMongoDB) {
      return await UserQueryModel.create(doc);
    } else {
      const data = localDB.read();
      if (!data.usersQueries) data.usersQueries = [];
      const newDoc = {
        _id: 'uq_' + Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        ...doc
      };
      data.usersQueries.push(newDoc);
      localDB.write(data);
      return newDoc;
    }
  },
  findByIdAndDelete: async (id) => {
    if (isUsingMongoDB) {
      return await UserQueryModel.findByIdAndDelete(id);
    } else {
      const data = localDB.read();
      const list = data.usersQueries || [];
      const idx = list.findIndex(item => item._id === id);
      if (idx !== -1) {
        const removed = list.splice(idx, 1);
        data.usersQueries = list;
        localDB.write(data);
        return removed[0];
      }
      return null;
    }
  },
  countDocuments: async (query = {}) => {
    if (isUsingMongoDB) {
      return await UserQueryModel.countDocuments(query);
    } else {
      const list = await UserQuery.find(query);
      return list.length;
    }
  }
};
