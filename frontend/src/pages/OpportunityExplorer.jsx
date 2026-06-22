import React, { useState, useEffect } from 'react';
import { publicGetOpportunities } from '../utils/api';
import { Search, SlidersHorizontal, AlertCircle, ArrowUpRight, Shield, TrendingUp, Info } from 'lucide-react';

export default function OpportunityExplorer() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter state
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');
  const [risk, setRisk] = useState('');
  const [growth, setGrowth] = useState('');
  const [budgetLimit, setBudgetLimit] = useState(250000); // Max budget limit

  // Categories list
  const industries = ['Artificial Intelligence', 'Software', 'Business Services', 'E-commerce', 'Education'];

  useEffect(() => {
    fetchOpportunities();
  }, [industry, growth, budgetLimit]);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      // Query parameters
      const params = {};
      if (industry) params.industry = industry;
      if (growth) params.growthPotential = growth;
      
      const data = await publicGetOpportunities(params);
      
      // Client-side filtering for budget limit, risk, and search term
      let filtered = data;
      
      // Budget limit filtering
      filtered = filtered.filter(item => {
        // Parse investment range to check against budget limit
        // Format is e.g. "₹20,000 - ₹80,000"
        const numStr = item.investmentRange.replace(/[^0-9-]/g, ''); // get digits and dash
        const parts = numStr.split('-');
        const minVal = parseInt(parts[0], 10) || 0;
        return minVal <= budgetLimit;
      });

      // Risk level filtering
      if (risk) {
        filtered = filtered.filter(item => {
          if (risk.toLowerCase() === 'low') return item.riskScore <= 30;
          if (risk.toLowerCase() === 'medium') return item.riskScore > 30 && item.riskScore <= 60;
          return item.riskScore > 60;
        });
      }

      // Search term filtering
      if (search.trim()) {
        const query = search.toLowerCase();
        filtered = filtered.filter(item => 
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.industry.toLowerCase().includes(query)
        );
      }

      setOpportunities(filtered);
    } catch (err) {
      console.error('Failed to load opportunities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchOpportunities();
  };

  const getRiskLabel = (score) => {
    if (score <= 30) return { text: 'Low Risk', class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
    if (score <= 60) return { text: 'Medium Risk', class: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
    return { text: 'High Risk', class: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
  };

  return (
    <div className="min-h-screen py-10 px-6 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Title Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Opportunity Explorer</h1>
        <p className="text-slate-400 max-w-xl text-xs sm:text-sm">
          Discover verified business blueprints, evaluate financial startup ranges, and uncover AI co-founder recommended models.
        </p>
      </div>

      {/* Main Panel grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Panel */}
        <aside className="lg:col-span-3 glass border border-slate-700/60 p-5 rounded-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-dark-700">
            <h3 className="font-bold text-sm text-white flex items-center gap-1.5 uppercase tracking-wide">
              <SlidersHorizontal className="w-4 h-4 text-brand-400" /> Filters
            </h3>
            <button 
              onClick={() => {
                setIndustry('');
                setRisk('');
                setGrowth('');
                setBudgetLimit(250000);
                setSearch('');
              }}
              className="text-[10px] text-slate-400 hover:text-white font-bold transition-colors uppercase tracking-wider cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Industry Filter */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full glass-input px-3 py-2 text-xs"
            >
              <option value="">All Industries</option>
              {industries.map((ind, i) => (
                <option key={i} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Risk Level Filter */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Risk Profile</label>
            <select
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              className="w-full glass-input px-3 py-2 text-xs"
            >
              <option value="">All Risks</option>
              <option value="low">Low Risk (&le; 30)</option>
              <option value="medium">Medium Risk (31-60)</option>
              <option value="high">High Risk (&gt; 60)</option>
            </select>
          </div>

          {/* Growth Potential Filter */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Growth Potential</label>
            <select
              value={growth}
              onChange={(e) => setGrowth(e.target.value)}
              className="w-full glass-input px-3 py-2 text-xs"
            >
              <option value="">All Potentials</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Budget Limit Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <span>Capital Limit</span>
              <span className="font-metrics font-bold text-brand-400">₹{budgetLimit.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="10000"
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(Number(e.target.value))}
              className="w-full h-1 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
        </aside>

        {/* Right Opportunity Grid */}
        <section className="lg:col-span-9 space-y-6">
          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2.5 text-xs"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Grid content */}
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
          ) : opportunities.length === 0 ? (
            <div className="glass-card p-12 text-center rounded-2xl space-y-4">
              <AlertCircle className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="font-bold text-lg text-white">No Opportunities Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No matching opportunities found. Try adjusting your filters or expanding your capital search limit.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {opportunities.map((item, index) => {
                const riskLabel = getRiskLabel(item.riskScore);
                return (
                  <div
                    key={item._id || index}
                    className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700/60 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400">{item.industry}</span>
                          <h3 className="font-bold text-base text-white leading-snug mt-1">{item.title}</h3>
                        </div>
                        <span className="shrink-0 text-[10px] font-bold px-2 py-1 rounded border bg-indigo-500/10 text-indigo-400 border-indigo-500/20 uppercase tracking-wider">
                          {item.growthPotential} Growth
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      {/* Core Metrics */}
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-dark-700/50">
                        <div>
                          <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Capital Needed</p>
                          <p className="font-metrics font-bold text-xs text-white mt-0.5">{item.investmentRange}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Risk Profile</p>
                          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border mt-0.5 ${riskLabel.class}`}>
                            {riskLabel.text} ({item.riskScore})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* AI recommendation badge */}
                    {item.aiRecommendation && (
                      <div className="mt-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-start gap-2 text-[11px] text-emerald-300">
                        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                        <span>{item.aiRecommendation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
