import express from 'express';
import { auth } from '../middleware/auth.js';
import { Opportunity } from '../models/Opportunity.js';
import { Trend } from '../models/Trend.js';
import { FundingSource } from '../models/FundingSource.js';
import { Analysis } from '../models/Analysis.js';
import { UserQuery } from '../models/UserQuery.js';

import {
  getAllOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
} from '../controllers/opportunityController.js';

import {
  getAllTrends,
  getTrendById,
  createTrend,
  updateTrend,
  deleteTrend
} from '../controllers/trendController.js';

import {
  getAllFundingSources,
  getFundingSourceById,
  createFundingSource,
  updateFundingSource,
  deleteFundingSource
} from '../controllers/fundingController.js';

import {
  getReportsList,
  getReportsStats
} from '../controllers/analysisController.js';

import {
  getQueries,
  deleteQuery
} from '../controllers/queryController.js';

const router = express.Router();

// SECURE ADMIN DASHBOARD OVERVIEW METRICS
router.get('/stats', auth, async (req, res) => {
  try {
    const oppCount = await Opportunity.countDocuments({});
    const trendCount = await Trend.countDocuments({});
    const fundingCount = await FundingSource.countDocuments({});
    const reportCount = await Analysis.countDocuments({});
    const queryCount = await UserQuery.countDocuments({});

    // Fetch recent analyses reports
    const recentAnalyses = await Analysis.find({});
    
    // Fetch recent queries
    const recentQueries = await UserQuery.find({});

    res.json({
      opportunities: oppCount,
      trends: trendCount,
      fundingSources: fundingCount,
      reports: reportCount,
      queries: queryCount,
      recentActivities: {
        analyses: recentAnalyses.slice(0, 5),
        queries: recentQueries.slice(0, 5)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// OPPORTUNITY MANAGEMENT CRUD
router.get('/opportunities', auth, getAllOpportunities);
router.get('/opportunities/:id', auth, getOpportunityById);
router.post('/opportunities', auth, createOpportunity);
router.put('/opportunities/:id', auth, updateOpportunity);
router.delete('/opportunities/:id', auth, deleteOpportunity);

// TREND MANAGEMENT CRUD
router.get('/trends', auth, getAllTrends);
router.get('/trends/:id', auth, getTrendById);
router.post('/trends', auth, createTrend);
router.put('/trends/:id', auth, updateTrend);
router.delete('/trends/:id', auth, deleteTrend);

// FUNDING MANAGEMENT CRUD
router.get('/funding', auth, getAllFundingSources);
router.get('/funding/:id', auth, getFundingSourceById);
router.post('/funding', auth, createFundingSource);
router.put('/funding/:id', auth, updateFundingSource);
router.delete('/funding/:id', auth, deleteFundingSource);

// REPORT ANALYTICS MANAGEMENT
router.get('/reports', auth, getReportsList);
router.get('/reports/stats', auth, getReportsStats);

// USER CONTACT QUERIES INSPECT
router.get('/queries', auth, getQueries);
router.delete('/queries/:id', auth, deleteQuery);

export default router;
