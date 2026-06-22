import React, { useState } from 'react';
import { publicOptimizeResource } from '../utils/api';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Sparkles, Users, Layers, AlertCircle, TrendingDown, ClipboardList } from 'lucide-react';

export default function ResourceOptimizer() {
  // Inputs
  const [employees, setEmployees] = useState('');
  const [selectedDepts, setSelectedDepts] = useState(['Product', 'Marketing', 'Sales']);
  const [budget, setBudget] = useState('');
  const [resources, setResources] = useState('');

  // Results state
  const [loading, setLoading] = useState(false);
  const [optimizedData, setOptimizedData] = useState(null);
  const [error, setError] = useState('');

  const availableDepartments = ['Product', 'Marketing', 'Sales', 'Operations', 'Customer Support'];
  const colors = ['#4F46E5', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const handleDeptToggle = (dept) => {
    if (selectedDepts.includes(dept)) {
      if (selectedDepts.length > 1) {
        setSelectedDepts(selectedDepts.filter(d => d !== dept));
      }
    } else {
      setSelectedDepts([...selectedDepts, dept]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employees || selectedDepts.length === 0 || !budget || !resources.trim()) {
      setError('Please fill in headcount, select departments, specify budget, and enter active tools.');
      return;
    }

    setError('');
    setLoading(true);
    setOptimizedData(null);

    try {
      const data = await publicOptimizeResource({
        employees: Number(employees),
        departments: selectedDepts,
        budget: Number(budget),
        resources
      });
      // The backend returns saved analysis containing { type, inputData, result }
      setOptimizedData(data.result);
    } catch (err) {
      console.error(err);
      setError('Failed to optimize resources. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-6 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Title Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Resource Optimizer</h1>
        <p className="text-slate-400 max-w-xl text-xs sm:text-sm">
          Optimize payroll models, divide budgets across department channels, map hiring schedules, and receive structural scaling reviews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Panel */}
        <aside className="lg:col-span-4 glass border border-slate-700/60 p-6 rounded-2xl">
          <h2 className="font-bold text-base text-white flex items-center gap-2 mb-6 border-b border-dark-700 pb-3">
            <Users className="w-5 h-5 text-brand-400" /> Operational Inputs
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Total Employees */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Team Size (Headcount)</label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 5"
                value={employees}
                onChange={(e) => setEmployees(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 text-xs"
                required
              />
            </div>

            {/* Total Monthly Budget */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Monthly Resource Budget (INR)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold font-metrics">₹</span>
                <input
                  type="number"
                  min="1000"
                  placeholder="e.g. 100000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full glass-input pl-8 pr-4 py-2.5 text-xs"
                  required
                />
              </div>
            </div>

            {/* Active Departments Checklist */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Departments</label>
              <div className="flex flex-col gap-2 p-3 bg-[#070c17]/60 border border-slate-800 rounded-xl">
                {availableDepartments.map((dept, i) => (
                  <label key={i} className="flex items-center gap-2.5 text-xs text-slate-350 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedDepts.includes(dept)}
                      onChange={() => handleDeptToggle(dept)}
                      className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-transparent"
                    />
                    <span>{dept}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Key Software Tools */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">SaaS Tools & Core Assets</label>
              <textarea
                rows="3"
                placeholder="e.g. Slack, Zoom, AWS Hosting, Figma licenses, Canva Pro"
                value={resources}
                onChange={(e) => setResources(e.target.value)}
                className="w-full glass-input px-3.5 py-2 text-xs"
                required
              />
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
                  Optimizing Allocations...
                </>
              ) : (
                <>
                  <Layers className="w-4 h-4 text-emerald-300" /> Optimize Resources
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
              <h3 className="font-bold text-lg text-white">Running Allocation Audits...</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Apportioning operating budgets, reviewing SaaS license optimization options, and preparing recruiting roadmaps.
              </p>
            </div>
          )}

          {!loading && !optimizedData && (
            <div className="glass border border-slate-700/60 p-12 rounded-2xl h-full flex flex-col justify-center items-center text-center space-y-4">
              <ClipboardList className="w-12 h-12 text-slate-500" />
              <h3 className="font-bold text-base text-slate-300">Awaiting Resource Specifications</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Enter headcount, select channels, and outline expenses on the left sidebar to generate optimization models.
              </p>
            </div>
          )}

          {!loading && optimizedData && (
            <div className="glass border border-slate-700/60 p-6 rounded-2xl space-y-6 animate-fade-in">
              <div className="flex justify-between items-center pb-4 border-b border-dark-700">
                <h3 className="font-bold text-base text-white flex items-center gap-2 uppercase tracking-wide">
                  <Layers className="w-5 h-5 text-brand-400" /> Allocation Dashboard
                </h3>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full">
                  Audit Verified
                </span>
              </div>

              {/* Recharts Pie Chart & Legend Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#070c17]/60 p-5 rounded-2xl border border-slate-800">
                <div className="md:col-span-6 h-[220px] text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={optimizedData.resourceDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="allocatedBudget"
                        nameKey="department"
                      >
                        {optimizedData.resourceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                        formatter={(value) => `₹${value.toLocaleString()}`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend details */}
                <div className="md:col-span-6 space-y-3.5">
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Budget Apportionment</h4>
                  <div className="space-y-2">
                    {optimizedData.resourceDistribution.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded" style={{ backgroundColor: colors[idx % colors.length] }}></span>
                          <span className="text-slate-300 font-medium">{item.department}</span>
                        </div>
                        <span className="font-metrics font-bold text-white">
                          ₹{item.allocatedBudget.toLocaleString()} ({item.percentage}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Cost Optimization Directives</h4>
                <div className="space-y-2">
                  {optimizedData.costOptimizationSuggestions.map((sug, i) => (
                    <div key={i} className="flex gap-2.5 items-start p-3 bg-dark-800 border border-slate-800 rounded-xl text-xs text-slate-200">
                      <div className="w-5 h-5 rounded bg-brand-500/15 border border-brand-500/25 flex items-center justify-center text-[10px] font-bold text-brand-400 shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hiring Recommendations */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Recruiting Priorities</h4>
                <div className="space-y-2">
                  {optimizedData.hiringRecommendations.map((rec, i) => (
                    <div key={i} className="flex gap-2.5 items-start p-3 bg-dark-800 border border-slate-850 rounded-xl text-xs text-slate-250">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></div>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Productivity Insights */}
              <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Productivity Review</span>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {optimizedData.productivityInsights}
                </p>
              </div>

            </div>
          )}
        </section>
      </div>
    </div>
  );
}
