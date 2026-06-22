import { UserQuery } from '../models/UserQuery.js';

export const submitQuery = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Name, email, and message are required' });
  }

  try {
    const newQuery = await UserQuery.create({
      name,
      email,
      subject: subject || 'General Query',
      message
    });
    res.status(201).json(newQuery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getQueries = async (req, res) => {
  try {
    const queries = await UserQuery.find({});
    res.json(queries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteQuery = async (req, res) => {
  try {
    const deleted = await UserQuery.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Query not found' });
    }
    res.json({ msg: 'Query deleted successfully', item: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
