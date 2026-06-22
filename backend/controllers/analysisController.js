import { aiService } from '../services/aiService.js';
import { Analysis } from '../models/Analysis.js';

export const analyzeStartup = async (req, res) => {
  const { idea, industry, budget, targetMarket, teamSize } = req.body;

  if (!idea || !industry || budget === undefined || !targetMarket || teamSize === undefined) {
    return res.status(400).json({ msg: 'Idea, industry, budget, target market, and team size are required' });
  }

  try {
    const analysisResult = await aiService.analyzeStartup({
      idea,
      industry,
      budget: Number(budget),
      targetMarket,
      teamSize: Number(teamSize)
    });

    const savedAnalysis = await Analysis.create({
      type: 'startup',
      inputData: { idea, industry, budget, targetMarket, teamSize },
      result: analysisResult
    });

    res.json(savedAnalysis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const planFinance = async (req, res) => {
  const { capital, revenue, expenses, investment } = req.body;

  if (capital === undefined || revenue === undefined || expenses === undefined || investment === undefined) {
    return res.status(400).json({ msg: 'Capital, revenue, expenses, and investment are required' });
  }

  try {
    const plannerResult = await aiService.runFinancialPlanner({
      capital: Number(capital),
      revenue: Number(revenue),
      expenses: Number(expenses),
      investment: Number(investment)
    });

    const savedAnalysis = await Analysis.create({
      type: 'finance',
      inputData: { capital, revenue, expenses, investment },
      result: plannerResult
    });

    res.json(savedAnalysis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const optimizeResource = async (req, res) => {
  const { employees, departments, budget, resources } = req.body;

  if (employees === undefined || !departments || budget === undefined || resources === undefined) {
    return res.status(400).json({ msg: 'Employees, departments, budget, and resources description are required' });
  }

  try {
    const optimizerResult = await aiService.optimizeResources({
      employees: Number(employees),
      departments,
      budget: Number(budget),
      resources
    });

    const savedAnalysis = await Analysis.create({
      type: 'resource',
      inputData: { employees, departments, budget, resources },
      result: optimizerResult
    });

    res.json(savedAnalysis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Admin metrics check: Return list of generated reports
export const getReportsList = async (req, res) => {
  try {
    const reports = await Analysis.find({});
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getReportsStats = async (req, res) => {
  try {
    const total = await Analysis.countDocuments({});
    const startup = await Analysis.countDocuments({ type: 'startup' });
    const finance = await Analysis.countDocuments({ type: 'finance' });
    const resource = await Analysis.countDocuments({ type: 'resource' });
    res.json({ total, startup, finance, resource });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
