import { Trend } from '../models/Trend.js';

export const getStats = async (req, res) => {
  try {
    const total = await Trend.countDocuments({});
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getAllTrends = async (req, res) => {
  try {
    const trends = await Trend.find(req.query);
    res.json(trends);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getTrendById = async (req, res) => {
  try {
    const item = await Trend.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Trend not found' });
    }
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const createTrend = async (req, res) => {
  const { title, industry, description, growthRate, source, date } = req.body;

  if (!title || !industry || !description) {
    return res.status(400).json({ msg: 'Title, industry, and description are required' });
  }

  try {
    const newItem = await Trend.create({
      title,
      industry,
      description,
      growthRate: Number(growthRate) || 0,
      source: source || 'Internal Analytics',
      date: date ? new Date(date) : new Date()
    });
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const updateTrend = async (req, res) => {
  try {
    const existing = await Trend.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ msg: 'Trend not found' });
    }

    const updated = await Trend.findByIdAndUpdate(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteTrend = async (req, res) => {
  try {
    const deleted = await Trend.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Trend not found' });
    }
    res.json({ msg: 'Deleted successfully', item: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
