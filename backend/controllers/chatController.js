import { ChatHistory } from '../models/ChatHistory.js';
import { aiService } from '../services/aiService.js';

export const handleChat = async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message) {
    return res.status(400).json({ msg: 'Message is required' });
  }

  const sId = sessionId || 'session_default';

  try {
    // 1. Fetch previous session history (chronological order)
    const history = await ChatHistory.find({ sessionId: sId });

    // 2. Call AI service to get the response
    const reply = await aiService.chat(message, history);

    // 3. Save user message to database
    await ChatHistory.create({
      sessionId: sId,
      role: 'user',
      content: message
    });

    // 4. Save model reply to database
    await ChatHistory.create({
      sessionId: sId,
      role: 'model',
      content: reply
    });

    // 5. Send reply back to user
    res.json({ sessionId: sId, reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getHistory = async (req, res) => {
  const sId = req.params.sessionId || 'session_default';
  try {
    const history = await ChatHistory.find({ sessionId: sId });
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const clearChat = async (req, res) => {
  const sId = req.params.sessionId || 'session_default';
  try {
    await ChatHistory.deleteSession(sId);
    res.json({ msg: 'Chat history cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
