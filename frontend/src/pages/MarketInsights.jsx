import React, { useState, useEffect } from 'react';
import { publicGetTrends, publicGetFunding } from '../utils/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Sparkles, TrendingUp, Info, DollarSign, Award, ExternalLink } from 'lucide-react';

export default function MarketInsights() {
  const [activeTab, setActiveTab] = useState('trends'); // 'trends' or 'funding'
  const [trends, setTrends] = useState([]);
  const [funding, setFunding] = useState([]);
  const [loading, setLoading] = useState(true);

  // Funding filtering state
  const [fundingType, setFundingType] = useState('All');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const trendsData = await publicGetTrends();
      const fundingData = await publicGetFunding();
      setTrends(trendsData);
      setFunding(fundingData);
    } catch (err) {
      console.error('Failed to load market insights:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredFunding = fundingType === 'All' 
    ? funding 
    : funding.filter(f => f.type === fundingType);

  // Chart data preparing (taking top growth trends)
  const chartData = trends.map(t => ({
    name: t.title.length > 20 ? t.title.substring(0, 18) + '...' : t.title,
    growth: t.growthRate
  })).sort((a, b) => b.growth - a.growth);

  return (
    <div className="min-h-screen py-10 px-6 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Title Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Market Insights</h1>
        <p className="text-slate-400 max-w-xl text-xs sm:text-sm">
          Keep track of global growth rates, industry demand trajectories, government grants, and incubator networks.
        </p>
      </div>

      {/* Tabs Control */}
      <div className="flex border-b border-dark-700">
        <button
          onClick={() => setActiveTab('trends')}
          className={`px-6 py-3 font-bold text-xs uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
            activeTab === 'trends'
              ? 'border-indigo-500 text-white bg-indigo-500/5'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Industry Trends
        </button>
        <button
          onClick={() => setActiveTab('funding')}
          className={`px-6 py-3 font-bold text-xs uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
            activeTab === 'funding'
              ? 'border-indigo-500 text-white bg-indigo-500/5'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Funding Ecosystem
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      ) : activeTab === 'trends' ? (
        // TRENDS TAB
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Trends Charts */}
          <div className="lg:col-span-6 space-y-6">
            {/* Recharts Bar Chart */}
            <div className="glass-card p-5 rounded-2xl border border-slate-800">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-6 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-brand-400" /> Sector Growth Trajectories
              </h3>
              <div className="w-full h-[280px] text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity="0.3" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" tickFormatter={(v) => `+${v}%`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                      formatter={(value) => [`+${value}% Growth`, '']}
                    />
                    <Bar dataKey="growth" fill="#4F46E5" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#10B981' : '#4F46E5'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Summary Panel */}
            <div className="glass p-5 rounded-2xl border border-slate-700/60 flex items-start gap-3 bg-indigo-500/5">
              <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-indigo-400 tracking-wider">AI Executive Summary</span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  Autonomous agents and fractional team setups are driving current market shifts. Tech companies leveraging lean developer nodes and open API frameworks are showing 3x faster customer launch timelines compared to standard capital-heavy businesses.
                </p>
              </div>
            </div>
          </div>

          {/* Trends List */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Current Industry Trends</h3>
            {trends.map((item, index) => (
              <div key={item._id || index} className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-slate-750 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400">{item.industry}</span>
                    <h4 className="font-bold text-sm text-white leading-snug mt-0.5">{item.title}</h4>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                    +{item.growthRate}% YoY
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold border-t border-dark-700/50 pt-2.5 mt-1">
                  <span>Source: {item.source}</span>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        // FUNDING TAB
        <div className="space-y-6">
          {/* Category Filter buttons */}
          <div className="flex flex-wrap gap-2.5">
            {['All', 'Government Scheme', 'Investor', 'Incubator', 'Accelerator'].map((t, idx) => (
              <button
                key={idx}
                onClick={() => setFundingType(t)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  fundingType === t
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-dark-800 border-dark-700 text-slate-450 hover:text-white hover:border-slate-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Funding Source Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFunding.map((item, index) => (
              <div
                key={item._id || index}
                className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700/60 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2.5 py-1 rounded">
                        {item.type}
                      </span>
                      <h4 className="font-bold text-sm text-white leading-snug mt-2.5">{item.name}</h4>
                    </div>
                    {item.website && (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-dark-900 border border-dark-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                        title="Visit Website"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed">
                    {item.description}
                  </p>

                  {/* Summary Box */}
                  <div className="space-y-2 pt-2 border-t border-dark-700/50">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Funding Limit</p>
                      <p className="text-xs text-white font-bold font-metrics mt-0.5">{item.amount}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Eligibility Requirements</p>
                      <p className="text-xs text-slate-350 mt-0.5">{item.eligibility}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
