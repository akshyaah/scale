import mongoose from 'mongoose';
import { isUsingMongoDB, localDB } from '../db.js';

const AdminSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

export const AdminModel = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export const Admin = {
  findOne: async (query) => {
    if (isUsingMongoDB) {
      return await AdminModel.findOne(query);
    } else {
      const data = localDB.read();
      return data.admins.find(admin => {
        return Object.keys(query).every(key => admin[key] === query[key]);
      }) || null;
    }
  },
  create: async (doc) => {
    if (isUsingMongoDB) {
      return await AdminModel.create(doc);
    } else {
      const data = localDB.read();
      const newDoc = {
        _id: 'admin_' + Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        ...doc
      };
      data.admins.push(newDoc);
      localDB.write(data);
      return newDoc;
    }
  }
};
