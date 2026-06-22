import mongoose from 'mongoose';
import { isUsingMongoDB, localDB } from '../db.js';

const ChatHistorySchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  sessionId: { type: String, required: true },
  role: { type: String, enum: ['user', 'model'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const ChatHistoryModel = mongoose.models.ChatHistory || mongoose.model('ChatHistory', ChatHistorySchema);

export const ChatHistory = {
  find: async (query = {}) => {
    if (isUsingMongoDB) {
      const findQuery = {};
      if (query.sessionId) findQuery.sessionId = query.sessionId;
      return await ChatHistoryModel.find(findQuery).sort({ createdAt: 1 }); // Chronological order
    } else {
      const data = localDB.read();
      let list = data.chatHistory || [];
      if (query.sessionId) {
        list = list.filter(item => item.sessionId === query.sessionId);
      }
      return [...list].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
  },
  create: async (doc) => {
    if (isUsingMongoDB) {
      return await ChatHistoryModel.create(doc);
    } else {
      const data = localDB.read();
      if (!data.chatHistory) data.chatHistory = [];
      const newDoc = {
        _id: 'ch_' + Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        ...doc
      };
      data.chatHistory.push(newDoc);
      localDB.write(data);
      return newDoc;
    }
  },
  deleteSession: async (sessionId) => {
    if (isUsingMongoDB) {
      return await ChatHistoryModel.deleteMany({ sessionId });
    } else {
      const data = localDB.read();
      let list = data.chatHistory || [];
      list = list.filter(item => item.sessionId !== sessionId);
      data.chatHistory = list;
      localDB.write(data);
      return { deletedCount: list.length };
    }
  }
};
