import { Opportunity } from '../models/Opportunity.js';

export const getStats = async (req, res) => {
  try {
    const total = await Opportunity.countDocuments({});
    const published = await Opportunity.countDocuments({ status: 'published' });
    const draft = await Opportunity.countDocuments({ status: 'draft' });
    res.json({ total, published, draft });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getPublicOpportunities = async (req, res) => {
  try {
    // Only return published opportunities to public
    const opportunities = await Opportunity.find({ status: 'published', ...req.query });
    res.json(opportunities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getAllOpportunities = async (req, res) => {
  try {
    // Return all for admin
    const opportunities = await Opportunity.find(req.query);
    res.json(opportunities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getOpportunityById = async (req, res) => {
  try {
    const item = await Opportunity.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Opportunity not found' });
    }
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const createOpportunity = async (req, res) => {
  const { title, industry, riskScore, investmentRange, growthPotential, description, status, aiRecommendation } = req.body;

  if (!title || !industry || riskScore === undefined || !investmentRange || !growthPotential || !description) {
    return res.status(400).json({ msg: 'Title, industry, risk score, investment range, growth potential, and description are required' });
  }

  try {
    const newItem = await Opportunity.create({
      title,
      industry,
      riskScore: Number(riskScore),
      investmentRange,
      growthPotential,
      description,
      status: status || 'published',
      aiRecommendation: aiRecommendation || ''
    });
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const updateOpportunity = async (req, res) => {
  try {
    const existing = await Opportunity.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ msg: 'Opportunity not found' });
    }

    const updated = await Opportunity.findByIdAndUpdate(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteOpportunity = async (req, res) => {
  try {
    const deleted = await Opportunity.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Opportunity not found' });
    }
    res.json({ msg: 'Deleted successfully', item: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
