import { FundingSource } from '../models/FundingSource.js';

export const getStats = async (req, res) => {
  try {
    const total = await FundingSource.countDocuments({});
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getAllFundingSources = async (req, res) => {
  try {
    const fundingSources = await FundingSource.find(req.query);
    res.json(fundingSources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getFundingSourceById = async (req, res) => {
  try {
    const item = await FundingSource.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Funding source not found' });
    }
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const createFundingSource = async (req, res) => {
  const { name, type, amount, eligibility, website, description } = req.body;

  if (!name || !type || !amount || !eligibility || !description) {
    return res.status(400).json({ msg: 'Name, type, amount, eligibility, and description are required' });
  }

  try {
    const newItem = await FundingSource.create({
      name,
      type,
      amount,
      eligibility,
      website: website || '',
      description
    });
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const updateFundingSource = async (req, res) => {
  try {
    const existing = await FundingSource.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ msg: 'Funding source not found' });
    }

    const updated = await FundingSource.findByIdAndUpdate(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteFundingSource = async (req, res) => {
  try {
    const deleted = await FundingSource.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Funding source not found' });
    }
    res.json({ msg: 'Deleted successfully', item: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
