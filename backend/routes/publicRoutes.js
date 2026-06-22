import express from 'express';
import { 
  getPublicOpportunities, 
  getOpportunityById 
} from '../controllers/opportunityController.js';
import { 
  getAllTrends, 
  getTrendById 
} from '../controllers/trendController.js';
import { 
  getAllFundingSources, 
  getFundingSourceById 
} from '../controllers/fundingController.js';
import { 
  analyzeStartup, 
  planFinance, 
  optimizeResource 
} from '../controllers/analysisController.js';
import { 
  handleChat, 
  getHistory, 
  clearChat 
} from '../controllers/chatController.js';
import { 
  submitQuery 
} from '../controllers/queryController.js';

const router = express.Router();

// Directory listings
router.get('/opportunities', getPublicOpportunities);
router.get('/opportunities/:id', getOpportunityById);

router.get('/trends', getAllTrends);
router.get('/trends/:id', getTrendById);

router.get('/funding', getAllFundingSources);
router.get('/funding/:id', getFundingSourceById);

// AI Engines
router.post('/analyze-startup', analyzeStartup);
router.post('/plan-finance', planFinance);
router.post('/optimize-resource', optimizeResource);

// AI Co-Founder Chat
router.post('/chat', handleChat);
router.get('/chat/history/:sessionId', getHistory);
router.post('/chat/clear/:sessionId', clearChat);

// General User contact queries
router.post('/query', submitQuery);

export default router;
