import React, { useState } from 'react';
import { publicPlanFinance } from '../utils/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Sparkles, DollarSign, Calculator, AlertCircle, TrendingUp, ShieldAlert, Award } from 'lucide-react';

export default function FinancialPlanner() {
  // Inputs
  const [capital, setCapital] = useState('');
  const [revenue, setRevenue] = useState('');
  const [expenses, setExpenses] = useState('');
  const [investment, setInvestment] = useState('');

  // Results state
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!capital || !revenue || !expenses || !investment) {
      setError('Please provide all cash flow inputs to generate projections.');
      return;
    }

    setError('');
    setLoading(true);
    setForecast(null);

    try {
      const data = await publicPlanFinance({
        capital: Number(capital),
        revenue: Number(revenue),
        expenses: Number(expenses),
        investment: Number(investment)
      });
      // Backend returns saved analysis containing { type, inputData, result }
      setForecast(data.result);
    } catch (err) {
      console.error(err);
      setError('Failed to calculate forecast metrics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getHealthClass = (score) => {
    if (score >= 80) return { label: 'Strong Runway', text: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    if (score >= 50) return { label: 'Moderate Health', text: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    return { label: 'High Burn Risk', text: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
  };

  return (
    <div className="min-h-screen py-10 px-6 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Title Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Financial Planner</h1>
        <p className="text-slate-400 max-w-xl text-xs sm:text-sm">
          Model operating budgets, simulate 6-month runways, calculate cash break-evens, and map capital projections using Recharts visualization.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Form Panel */}
        <aside className="lg:col-span-4 glass border border-slate-700/60 p-6 rounded-2xl">
          <h2 className="font-bold text-base text-white flex items-center gap-2 mb-6 border-b border-dark-700 pb-3">
            <Calculator className="w-5 h-5 text-brand-400" /> Capital & Burn Modeler
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Seed Capital */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Available Capital (INR)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold font-metrics">₹</span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 150000"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  className="w-full glass-input pl-8 pr-4 py-2.5 text-xs"
                  required
                />
              </div>
            </div>

            {/* Outside Investment */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Secured Funding/Investments (INR)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold font-metrics">₹</span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 50000"
                  value={investment}
                  onChange={(e) => setInvestment(e.target.value)}
                  className="w-full glass-input pl-8 pr-4 py-2.5 text-xs"
                  required
                />
              </div>
            </div>

            {/* Projected Revenue */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Projected Monthly Revenue (INR)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold font-metrics">₹</span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 35000"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  className="w-full glass-input pl-8 pr-4 py-2.5 text-xs"
                  required
                />
              </div>
            </div>

            {/* Fixed Expenses */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Projected Monthly Expenses (INR)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold font-metrics">₹</span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 20000"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  className="w-full glass-input pl-8 pr-4 py-2.5 text-xs"
                  required
                />
              </div>
            </div>

            {/* Error handling */}
            {error && (
              <div className="p-3 bg-error/10 border border-error/20 text-error rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 font-bold text-sm bg-gradient-brand hover:scale-[1.01] active:scale-[0.99] text-white rounded-xl shadow-lg shadow-indigo-500/15 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Simulating Cash Flows...
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4 text-emerald-300" /> Forecast Budget
                </>
              )}
            </button>
          </form>
        </aside>

        {/* Right Output Dashboard Panel */}
        <section className="lg:col-span-8 min-h-[520px]">
          {loading && (
            <div className="glass border border-slate-700/60 p-12 rounded-2xl h-full flex flex-col justify-center items-center text-center space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <h3 className="font-bold text-lg text-white">Modeling Budget Runs...</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Projecting income expansion, graphing cash depletion trends, and calculating break-even milestones.
              </p>
            </div>
          )}

          {!loading && !forecast && (
            <div className="glass border border-slate-700/60 p-12 rounded-2xl h-full flex flex-col justify-center items-center text-center space-y-4">
              <DollarSign className="w-12 h-12 text-slate-500" />
              <h3 className="font-bold text-base text-slate-300">Awaiting Budget Inputs</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Provide operational figures on the left dashboard to generate line models, burn charts, and runway suggestions.
              </p>
            </div>
          )}

          {!loading && forecast && (
            <div className="glass border border-slate-700/60 p-6 rounded-2xl space-y-6 animate-fade-in">
              <div className="flex justify-between items-center pb-4 border-b border-dark-700">
                <h3 className="font-bold text-base text-white flex items-center gap-2 uppercase tracking-wide">
                  <TrendingUp className="w-5 h-5 text-brand-400" /> Projections Dashboard
                </h3>
                <span className={`text-[10px] uppercase font-bold border px-2.5 py-1 rounded-full flex items-center gap-1 ${getHealthClass(forecast.financialHealthScore).text}`}>
                  Health Score: {forecast.financialHealthScore}% ({getHealthClass(forecast.financialHealthScore).label})
                </span>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#080d19] border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Break-Even Point</span>
                  <p className="text-lg font-bold text-emerald-400">{forecast.breakEvenMonth}</p>
                  <p className="text-[9px] text-slate-500 font-medium">Projected profit match</p>
                </div>
                <div className="p-4 rounded-xl bg-[#080d19] border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">6-Month Profit</span>
                  <p className="text-lg font-bold text-white font-metrics">₹{forecast.profitProjection.toLocaleString()}</p>
                  <p className="text-[9px] text-slate-500 font-medium">Estimated net accumulation</p>
                </div>
                <div className="p-4 rounded-xl bg-[#080d19] border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Ending Runway Cash</span>
                  <p className="text-lg font-bold text-indigo-400 font-metrics">
                    ₹{forecast.cashFlowForecast[forecast.cashFlowForecast.length - 1].cashBalance.toLocaleString()}
                  </p>
                  <p className="text-[9px] text-slate-500 font-medium">Final month capital surplus</p>
                </div>
              </div>

              {/* Recharts Cash Flow Line Chart */}
              <div className="p-4 rounded-2xl bg-[#080d19]/80 border border-slate-800/80">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-4">6-Month Cash Projection Model</h4>
                <div className="w-full h-[240px] text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecast.cashFlowForecast} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity="0.3" />
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" tickFormatter={(v) => `₹${v/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                        formatter={(value) => [`₹${value.toLocaleString()}`, '']}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="cashBalance" name="Cash Balance" stroke="#4F46E5" strokeWidth={3} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#EF4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Suggestions */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">AI Financial Optimization Actions</h4>
                <div className="space-y-2">
                  {forecast.aiSuggestions.map((sug, i) => (
                    <div key={i} className="flex gap-2.5 items-start p-3 bg-dark-800 border border-slate-850 rounded-xl text-xs text-slate-200">
                      <div className="w-5 h-5 rounded bg-brand-500/15 border border-brand-500/25 flex items-center justify-center text-[10px] font-bold text-brand-400 shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </section>
      </div>
    </div>
  );
}
