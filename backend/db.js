import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { config } from './config/config.js';
import { AdminModel } from './models/Admin.js';
import { OpportunityModel } from './models/Opportunity.js';
import { TrendModel } from './models/Trend.js';
import { FundingSourceModel } from './models/FundingSource.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JSON_DB_PATH = path.join(__dirname, 'db.json');

export let isUsingMongoDB = false;

const getInitialSeedData = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);
  
  const defaultAdmin = {
    _id: 'admin_default_id',
    name: 'VenturePilot Advisor',
    email: 'admin@venturepilot.ai',
    password: hashedPassword,
    role: 'admin',
    createdAt: new Date()
  };

  const initialOpportunities = [
    {
      _id: 'o_ai_agency',
      title: 'AI Automation Agency (AAA)',
      industry: 'Artificial Intelligence',
      riskScore: 35,
      investmentRange: '₹20,000 - ₹80,000',
      growthPotential: 'High',
      description: 'Help small and medium businesses integrate ChatGPT, automated customer support bots, and internal workflow automations using Make.com or Zapier. Low upfront cost and high recurring retainer margins.',
      status: 'published',
      aiRecommendation: 'Recommended for tech-savvy founders who can sell SaaS integration services.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 'o_micro_saas',
      title: 'Micro-SaaS for Local Logistics',
      industry: 'Software',
      riskScore: 50,
      investmentRange: '₹30,000 - ₹1,50,000',
      growthPotential: 'High',
      description: 'A simple subscription portal for local delivery drivers and vendors to manage routing, invoicing, and proof-of-delivery receipts. Solve niche bottlenecks without bloated enterprise software.',
      status: 'published',
      aiRecommendation: 'High scalability with recurring monthly subscription models.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 'o_fractional',
      title: 'Fractional COO/Services Hub',
      industry: 'Business Services',
      riskScore: 20,
      investmentRange: '₹5,000 - ₹25,000',
      growthPotential: 'Medium',
      description: 'Provide part-time operational management and administrative workflows for growing startups. Structure it as a productized service with pre-defined monthly packages.',
      status: 'published',
      aiRecommendation: 'Lowest risk model with immediate cash-flow potential.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 'o_dropship',
      title: 'Curated Eco-Friendly Home Goods Brand',
      industry: 'E-commerce',
      riskScore: 65,
      investmentRange: '₹50,000 - ₹2,00,000',
      growthPotential: 'Medium',
      description: 'Launch an online boutique store showcasing zero-waste kitchenware, organic bedsheets, and bamboo organizers. Market via Instagram reels and direct-to-consumer influencer partnerships.',
      status: 'published',
      aiRecommendation: 'Requires medium marketing budget. Focus on social media brand building.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 'o_edtech',
      title: 'Bilingual Coding Cohorts for Kids',
      industry: 'Education',
      riskScore: 25,
      investmentRange: '₹10,000 - ₹40,000',
      growthPotential: 'Medium',
      description: 'Interactive online group classes teaching scratch, game design, and Python to school children in native languages. Focus on personalized attention and project portfolios.',
      status: 'published',
      aiRecommendation: 'High trust factor. Grow organically through school network referrals.',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const initialTrends = [
    {
      _id: 't_gen_ai',
      title: 'Hyper-Personalized AI Agents',
      industry: 'Technology',
      description: 'Businesses are rapidly moving from static chatbots to active AI agents that can read email inboxes, execute database queries, and initiate refund transactions autonomously.',
      growthRate: 145,
      source: 'Gartner Tech Trends 2026',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 't_fractional',
      title: 'Rise of the Fractional Gig Economy',
      industry: 'HR & Business',
      description: 'Due to economic tightening, early-stage startups prefer hiring fractional executives (CFOs, CMOs, CTOs) for 5-10 hours a week rather than committing to expensive full-time salaries.',
      growthRate: 68,
      source: 'LinkedIn Workforce Report',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 't_green_commerce',
      title: 'D2C Sustainable Logistics',
      industry: 'Logistics',
      description: 'Retail consumers are increasingly seeking zero-plastic packing options, local delivery methods, and carbon-neutral shipping badges at checkout, driving brands to overhaul fulfillment.',
      growthRate: 38,
      source: 'McKinsey Consumer Study',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 't_nocode',
      title: 'Enterprise No-Code Adoption',
      industry: 'Enterprise Software',
      description: 'Non-technical departments are increasingly empowered to spin up localized inventory systems, feedback trackers, and reporting widgets using toolsets like Airtable and Glide.',
      growthRate: 84,
      source: 'Forrester Research',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const initialFundingSources = [
    {
      _id: 'f_startup_india',
      name: 'Startup India Seed Fund Scheme (SISFS)',
      type: 'Government Scheme',
      amount: 'Up to ₹20,00,000 for validation / ₹50,00,000 for market entry',
      eligibility: 'DPIIT-recognized startups incorporated within the last 2 years working on innovative solutions.',
      website: 'https://seedfund.startupindia.gov.in',
      description: 'Financial assistance to startups for proof of concept, prototype development, product trials, market-entry, and commercialization.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 'f_yc_school',
      name: 'Y Combinator (YC) Funding Program',
      type: 'Investor',
      amount: '$500,000 seed investment (standard terms)',
      eligibility: 'Early-stage tech startups with high scalability potential globally. Accepts applications twice a year.',
      website: 'https://www.ycombinator.com',
      description: 'The world\'s most famous startup accelerator program. Invests $500k in exchange for equity, provides intensive coaching, and hosts Demo Day.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 'f_techstars',
      name: 'Techstars Worldwide Accelerator',
      type: 'Accelerator',
      amount: 'Up to $120,000 seed investment + mentoring network',
      eligibility: 'A team of full-time founders with a working prototype or early market feedback.',
      website: 'https://www.techstars.com',
      description: 'A 3-month mentorship-driven startup accelerator offering access to funding, deep corporate partners, and global alumni resources.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 'f_sequoia_surge',
      name: 'Peak XV Surge Program',
      type: 'Investor',
      amount: '$1,000,000 - $3,000,000 seed round',
      eligibility: 'Highly ambitious startups focused on India, Southeast Asia, or global SaaS markets.',
      website: 'https://www.surgeahead.com',
      description: 'A rapid scale-up program combining seed capital with immersive operational workshops, hiring advice, and investor connections.',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  return { 
    admins: [defaultAdmin], 
    opportunities: initialOpportunities,
    trends: initialTrends,
    fundingSources: initialFundingSources,
    analyses: [],
    usersQueries: [],
    chatHistory: []
  };
};

function getInitialSeedDataSync() {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('admin123', salt);
  
  return {
    admins: [{
      _id: 'admin_default_id',
      name: 'VenturePilot Advisor',
      email: 'admin@venturepilot.ai',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date().toISOString()
    }],
    opportunities: [
      {
        _id: 'o_ai_agency',
        title: 'AI Automation Agency (AAA)',
        industry: 'Artificial Intelligence',
        riskScore: 35,
        investmentRange: '₹20,000 - ₹80,000',
        growthPotential: 'High',
        description: 'Help small and medium businesses integrate ChatGPT, automated customer support bots, and internal workflow automations using Make.com or Zapier. Low upfront cost and high recurring retainer margins.',
        status: 'published',
        aiRecommendation: 'Recommended for tech-savvy founders who can sell SaaS integration services.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'o_micro_saas',
        title: 'Micro-SaaS for Local Logistics',
        industry: 'Software',
        riskScore: 50,
        investmentRange: '₹30,000 - ₹1,50,000',
        growthPotential: 'High',
        description: 'A simple subscription portal for local delivery drivers and vendors to manage routing, invoicing, and proof-of-delivery receipts. Solve niche bottlenecks without bloated enterprise software.',
        status: 'published',
        aiRecommendation: 'High scalability with recurring monthly subscription models.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'o_fractional',
        title: 'Fractional COO/Services Hub',
        industry: 'Business Services',
        riskScore: 20,
        investmentRange: '₹5,000 - ₹25,000',
        growthPotential: 'Medium',
        description: 'Provide part-time operational management and administrative workflows for growing startups. Structure it as a productized service with pre-defined monthly packages.',
        status: 'published',
        aiRecommendation: 'Lowest risk model with immediate cash-flow potential.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    trends: [
      {
        _id: 't_gen_ai',
        title: 'Hyper-Personalized AI Agents',
        industry: 'Technology',
        description: 'Businesses are rapidly moving from static chatbots to active AI agents that can read email inboxes, execute database queries, and initiate refund transactions autonomously.',
        growthRate: 145,
        source: 'Gartner Tech Trends 2026',
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 't_nocode',
        title: 'Enterprise No-Code Adoption',
        industry: 'Enterprise Software',
        description: 'Non-technical departments are increasingly empowered to spin up localized inventory systems, feedback trackers, and reporting widgets using toolsets like Airtable and Glide.',
        growthRate: 84,
        source: 'Forrester Research',
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    fundingSources: [
      {
        _id: 'f_startup_india',
        name: 'Startup India Seed Fund Scheme (SISFS)',
        type: 'Government Scheme',
        amount: 'Up to ₹20,00,000 for validation / ₹50,00,000 for market entry',
        eligibility: 'DPIIT-recognized startups incorporated within the last 2 years working on innovative solutions.',
        website: 'https://seedfund.startupindia.gov.in',
        description: 'Financial assistance to startups for proof of concept, prototype development, product trials, market-entry, and commercialization.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'f_yc_school',
        name: 'Y Combinator (YC) Funding Program',
        type: 'Investor',
        amount: '$500,000 seed investment (standard terms)',
        eligibility: 'Early-stage tech startups with high scalability potential globally. Accepts applications twice a year.',
        website: 'https://www.ycombinator.com',
        description: 'The world\'s most famous startup accelerator program. Invests $500k in exchange for equity, provides intensive coaching, and hosts Demo Day.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    analyses: [],
    usersQueries: [],
    chatHistory: []
  };
}

class JSONDatabase {
  constructor() {
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(JSON_DB_PATH)) {
        const defaultData = getInitialSeedDataSync();
        fs.writeFileSync(JSON_DB_PATH, JSON.stringify(defaultData, null, 2), 'utf-8');
      } else {
        const content = fs.readFileSync(JSON_DB_PATH, 'utf-8');
        const parsed = JSON.parse(content);
        if (!parsed.opportunities || !parsed.trends || !parsed.fundingSources || !parsed.admins) {
          const defaultData = getInitialSeedDataSync();
          fs.writeFileSync(JSON_DB_PATH, JSON.stringify(defaultData, null, 2), 'utf-8');
        }
      }
    } catch (error) {
      console.error('Error initializing JSON database, resetting file:', error);
      const defaultData = getInitialSeedDataSync();
      fs.writeFileSync(JSON_DB_PATH, JSON.stringify(defaultData, null, 2), 'utf-8');
    }
  }

  read() {
    try {
      this.init();
      return JSON.parse(fs.readFileSync(JSON_DB_PATH, 'utf-8'));
    } catch (error) {
      return getInitialSeedDataSync();
    }
  }

  write(data) {
    try {
      fs.writeFileSync(JSON_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Failed to write to JSON db:', error);
    }
  }
}

export const localDB = new JSONDatabase();

export const connectDB = async () => {
  if (config.mongoUri) {
    try {
      await mongoose.connect(config.mongoUri);
      isUsingMongoDB = true;
      console.log('MongoDB connected successfully.');

      const adminCount = await AdminModel.countDocuments();
      if (adminCount === 0) {
        const seed = await getInitialSeedData();
        await AdminModel.create(seed.admins[0]);
        await OpportunityModel.insertMany(seed.opportunities);
        await TrendModel.insertMany(seed.trends);
        await FundingSourceModel.insertMany(seed.fundingSources);
        console.log('MongoDB seeded with default VenturePilot admin and initial data.');
      }
    } catch (error) {
      console.error('MongoDB connection failed. Falling back to local JSON database.', error.message);
      isUsingMongoDB = false;
    }
  } else {
    console.log('No MONGO_URI specified in env. Using local JSON database (db.json).');
    isUsingMongoDB = false;
  }
};
