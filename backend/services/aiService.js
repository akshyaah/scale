import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/config.js';

let gemini = null;

if (config.geminiApiKey) {
  try {
    gemini = new GoogleGenerativeAI(config.geminiApiKey);
    console.log('Gemini AI initialized successfully.');
  } catch (err) {
    console.error('Failed to initialize Gemini AI:', err.message);
  }
}

// SIMULATOR HELPERS
const simulateStartupAnalyzer = (idea, industry, budget, targetMarket, teamSize) => {
  const textLength = (idea + targetMarket).length;
  const demandScore = Math.min(98, Math.max(35, 65 + (textLength % 25)));
  const feasibilityScore = Math.min(95, Math.max(40, 70 + (teamSize * 3) - (budget < 50000 ? 15 : 0)));
  const revenuePotential = budget * 3.5 + (textLength * 1200);

  const swot = {
    strengths: [
      `Addresses a high-intent segment within the ${industry} sector.`,
      `Agile cost structures enabling rapid iterations.`,
      `Low initial staffing overhead (Team size: ${teamSize}).`
    ],
    weaknesses: [
      `High reliance on founders for technical and product milestones.`,
      `Tight initial budget of ₹${Number(budget).toLocaleString()} limits premium marketing campaigns.`,
      `Lack of established brand trust in the targeted "${targetMarket}" market.`
    ],
    opportunities: [
      `Integration of automated services or AI agents to reduce operational margins.`,
      `Strategic partnerships with micro-influencers catering to the ${targetMarket} demographic.`,
      `Developing high-margin premium templates or specialized subscriptions.`
    ],
    threats: [
      `Potential fast-follower copycats launching cheap copy platforms.`,
      `Shifting customer acquisition costs (CAC) on standard channels.`,
      `Potential local regulations regarding compliance or licensing in the ${industry} space.`
    ]
  };

  const riskAssessment = feasibilityScore > 80 ? 'Low Risk' : feasibilityScore > 55 ? 'Moderate Risk' : 'High Risk';

  return {
    demandScore,
    feasibilityScore,
    revenuePotential,
    riskAssessment,
    swotAnalysis: swot,
    aiSuggestions: [
      'Create a simple, interactive landing page to gather email pre-registrations before building complex logic.',
      `Target B2B clients in ${targetMarket} via direct outreach to establish 5 early reference cases.`,
      'Structure a subscription billing model to achieve recurring cash flow early.'
    ]
  };
};

const simulateFinancialPlanner = (capital, revenue, expenses, investment) => {
  const cap = Number(capital) || 0;
  const rev = Number(revenue) || 0;
  const exp = Number(expenses) || 0;
  const inv = Number(investment) || 0;

  // Monthly projections
  const monthlyGrowth = 0.15; // 15% growth
  const cashFlowForecast = [];
  let currentCash = cap + inv;

  for (let i = 1; i <= 6; i++) {
    const projectedRev = Math.round(rev * Math.pow(1 + monthlyGrowth, i - 1));
    const projectedExp = Math.round(exp * (1 + (monthlyGrowth * 0.4) * (i - 1)));
    const netProfit = projectedRev - projectedExp;
    currentCash += netProfit;

    cashFlowForecast.push({
      month: `Month ${i}`,
      revenue: projectedRev,
      expenses: projectedExp,
      profit: netProfit,
      cashBalance: currentCash
    });
  }

  // Break-even month estimate
  let breakEvenMonth = 'Exceeds 6 Months';
  if (rev > exp) {
    breakEvenMonth = 'Immediate';
  } else if (rev > 0 && rev * 1.5 > exp) {
    breakEvenMonth = 'Month 3';
  } else if (rev > 0) {
    breakEvenMonth = 'Month 5';
  }

  // Health Score (0-100)
  let healthScore = 50;
  if (cap > exp * 6) healthScore += 25; // 6 months runway
  else if (cap > exp * 3) healthScore += 15; // 3 months runway
  if (rev > exp) healthScore += 25; // Profitable
  else if (rev > exp * 0.7) healthScore += 10;
  healthScore = Math.min(100, Math.max(10, healthScore));

  return {
    cashFlowForecast,
    breakEvenMonth,
    profitProjection: Math.round(rev * 1.8),
    financialHealthScore: healthScore,
    aiSuggestions: [
      `Your current monthly runway is roughly ${(cap / (exp || 1)).toFixed(1)} months. Aim to extend runway to 6+ months by trimming non-essential fixed overheads.`,
      'Optimize fixed variables. Re-negotiate contract subscriptions and leverage free tiers for cloud software during early testing.',
      'Prioritize direct sales efforts to reach unit profitability before raising additional institutional capital.'
    ]
  };
};

const simulateResourceOptimizer = (employees, departments, budget, resources) => {
  const empCount = Number(employees) || 1;
  const deptList = Array.isArray(departments) ? departments : ['Product', 'Marketing', 'Sales'];
  const bud = Number(budget) || 0;

  // Allocate budget across departments
  const resourceDistribution = deptList.map((dept, index) => {
    let percentage = 0.4;
    if (index === 1) percentage = 0.35;
    else if (index === 2) percentage = 0.25;
    else percentage = 1 / deptList.length;

    return {
      department: dept,
      allocatedBudget: Math.round(bud * percentage),
      percentage: Math.round(percentage * 100)
    };
  });

  const costOptimizationSuggestions = [
    'Leverage contractor models for specialized tasks (design, copy) instead of adding full-time payroll burdens.',
    'Consolidate workspace subscription counts. Do an audit on tools like Slack, Zoom, and Figma to drop unused seats.',
    'Automate scheduling, billing notifications, and user queries with AI bots to save up to 10 hours a week.'
  ];

  const hiringRecommendations = [];
  if (empCount < 3) {
    hiringRecommendations.push('Hire a part-time Virtual Assistant to handle operations and support queries.');
  } else if (empCount < 8) {
    hiringRecommendations.push('Add a full-stack developer or technical lead to manage release cycles.');
    hiringRecommendations.push('Bring on a dedicated Growth Marketing Manager to oversee CAC/LTV tracking.');
  } else {
    hiringRecommendations.push('Appoint Department Leads (Product, Growth) to delegate team deliverables.');
  }

  return {
    resourceDistribution,
    costOptimizationSuggestions,
    hiringRecommendations,
    productivityInsights: 'Operational leverage is optimized at current team sizes. Ensure that communication tools are integrated to prevent silo bottlenecks.'
  };
};

const simulateChat = (message, history) => {
  const msg = message.toLowerCase();
  
  if (msg.includes('50,000') || msg.includes('50000') || msg.includes('low budget') || msg.includes('minimal budget')) {
    return `Starting a business with a minimal budget (like ₹50,000) is highly feasible today. Focus on services or digital products that require high skill but low startup capital:

1. **AI Automations & Integrations**: Help local businesses integrate simple AI customer service bots, automated email schedulers, or data managers using Zapier or Make. Cost: Under ₹5,000 for templates/hosting.
2. **Productized Service**: Offer social media design, copywriting, or video editing on a recurring retainer model. Setup cost: Almost free. Use tools like Canva or CapCut.
3. **Micro-SaaS**: If you are a developer, build a simple niche tool (e.g. restaurant booking portal, small gym member tracker) and host it for free on Vercel/Render.

**Next Steps**:
- Validate target pain points before purchasing any software.
- Launch a simple waitlist page to collect lead emails.
- Secure 2 paying customers manually before scaling.`;
  }
  
  if (msg.includes('profit') || msg.includes('revenue') || msg.includes('cash flow') || msg.includes('financial')) {
    return `To build a stable financial structure for your startup, keep these core pillars in mind:

1. **Calculate Your Runway**: Total Cash divided by Monthly Net Burn. Always try to keep 6+ months of runway.
2. **Focus on Unit Economics**: Make sure the Lifetime Value (LTV) of your customer exceeds the Customer Acquisition Cost (CAC) by at least 3x.
3. **Cut Fixed Overheads**: Do not commit to physical offices, permanent employees, or multi-year software contracts early on. Use contractor hiring and flexible subscriptions.

What specific business are you planning? I can help you model your pricing or estimate expenses.`;
  }
  
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('start')) {
    return `Hello! I am your AI Co-Founder. I am here to help you evaluate startup opportunities, structure financial projections, audit resources, or refine business strategies. 

What business idea or challenge should we tackle first?`;
  }

  return `Great point. Validating your business assumptions is the first step toward launching successfully. For your question about "${message}", I recommend setting up a basic landing page with a waitlist or conducting 10 user interviews.

Would you like me to outline a structured 7-day validation plan for this, or check relevant market trends?`;
};

// AI SERVICE IMPLEMENTATION
class AIService {
  async analyzeStartup(data) {
    const { idea, industry, budget, targetMarket, teamSize } = data;
    if (gemini) {
      try {
        const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `You are a startup incubator director and venture analyst. Evaluate this startup idea:
Idea Details: ${idea}
Industry: ${industry}
Seed Budget: ${budget}
Target Market: ${targetMarket}
Team Size: ${teamSize}

Respond strictly in valid JSON format. Do not write markdown blocks or explain the JSON. The JSON must exactly match this schema:
{
  "demandScore": number (30 to 100),
  "feasibilityScore": number (30 to 100),
  "revenuePotential": number (estimated 1st year revenue in Rupees),
  "riskAssessment": "Low Risk" | "Moderate Risk" | "High Risk",
  "swotAnalysis": {
    "strengths": string[] (at least 3),
    "weaknesses": string[] (at least 3),
    "opportunities": string[] (at least 3),
    "threats": string[] (at least 3)
  },
  "aiSuggestions": string[] (at least 3 actionable recommendations)
}`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (err) {
        console.error('Gemini analyzeStartup failed, falling back:', err.message);
      }
    }
    return simulateStartupAnalyzer(idea, industry, budget, targetMarket, teamSize);
  }

  async runFinancialPlanner(data) {
    const { capital, revenue, expenses, investment } = data;
    if (gemini) {
      try {
        const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `You are an AI financial advisor. Analyze this startup financial plan:
Initial Capital: ${capital}
Monthly Projected Revenue: ${revenue}
Monthly Operating Expenses: ${expenses}
Outside Investment: ${investment}

Respond strictly in JSON format matching this schema:
{
  "cashFlowForecast": Array<{ month: string, revenue: number, expenses: number, profit: number, cashBalance: number }> (simulate 6 months),
  "breakEvenMonth": string (e.g. "Month 3" or "Exceeds 6 Months"),
  "profitProjection": number (estimated total net profit at the end of 6 months),
  "financialHealthScore": number (0 to 100),
  "aiSuggestions": string[] (at least 3 high-impact cost optimization suggestions)
}`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (err) {
        console.error('Gemini runFinancialPlanner failed, falling back:', err.message);
      }
    }
    return simulateFinancialPlanner(capital, revenue, expenses, investment);
  }

  async optimizeResources(data) {
    const { employees, departments, budget, resources } = data;
    if (gemini) {
      try {
        const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `You are a startup resource consultant. Help optimize resources and budgets:
Team Size (Employees): ${employees}
Departments Active: ${JSON.stringify(departments)}
Total Monthly Resource Budget: ${budget}
Existing Key Resources/Tools: ${resources}

Respond strictly in JSON format matching this schema:
{
  "resourceDistribution": Array<{ department: string, allocatedBudget: number, percentage: number }>,
  "costOptimizationSuggestions": string[] (at least 3),
  "hiringRecommendations": string[] (at least 2),
  "productivityInsights": string
}`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (err) {
        console.error('Gemini optimizeResources failed, falling back:', err.message);
      }
    }
    return simulateResourceOptimizer(employees, departments, budget, resources);
  }

  async chat(message, history) {
    if (gemini) {
      try {
        const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' });
        // Format history for Gemini API
        const formattedHistory = (history || []).map(h => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }]
        }));
        
        // Cap history to avoid context overflow in rapid sessions
        const chatInstance = model.startChat({
          history: formattedHistory.slice(-10),
          systemInstruction: "You are VenturePilot AI, a wise, encouraging, and highly analytical AI Co-Founder and business advisor. Your goal is to guide entrepreneurs on business models, startup evaluation, financial forecasting, and cost optimization. Keep answers readable, using bullet points and numbered lists where appropriate."
        });
        const result = await chatInstance.sendMessage(message);
        return result.response.text();
      } catch (err) {
        console.error('Gemini chat failed, falling back:', err.message);
      }
    }
    return simulateChat(message, history);
  }
}

export const aiService = new AIService();
