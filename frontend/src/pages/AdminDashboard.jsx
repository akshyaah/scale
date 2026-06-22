import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminGetStats } from '../utils/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Rocket, Shield, LayoutDashboard, ListFilter, TrendingUp, DollarSign, HelpCircle, 
  Plus, Calendar, Mail, FileText, ArrowRight, UserCheck 
} from 'lucide-react';

export default function AdminDashboard({ admin }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await adminGetStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  // Dummy area chart data (monthly report growth)
  const reportGrowthData = [
    { name: 'Jan', reports: 5 },
    { name: 'Feb', reports: 12 },
    { name: 'Mar', reports: 22 },
    { name: 'Apr', reports: 40 },
    { name: 'May', reports: 68 },
    { name: 'Jun', reports: 94 }
  ];

  const colors = ['#4F46E5', '#3B82F6', '#10B981', '#F59E0B'];

  return (
    <div className="min-h-screen bg-transparent flex flex-col lg:flex-row font-sans">
      
      {/* Sidebar Layout */}
      <aside className="w-full lg:w-64 bg-dark-950 border-r border-dark-700/50 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-dark-700/50 pb-5">
            <Shield className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-xs uppercase tracking-widest text-slate-400">Admin Console</span>
          </div>

          <div className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wider text-slate-350">
            <Link to="/admin/dashboard" className="px-3.5 py-3.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-white flex items-center gap-2.5">
              <LayoutDashboard className="w-4.5 h-4.5 text-indigo-400" />
              Overview
            </Link>
            <Link to="/admin/opportunities" className="px-3.5 py-3.5 rounded-xl hover:bg-dark-800 border border-transparent hover:border-dark-700/50 text-slate-400 hover:text-white flex items-center gap-2.5 transition-all">
              <ListFilter className="w-4.5 h-4.5 text-indigo-400" />
              Opportunities
            </Link>
            <Link to="/admin/trends" className="px-3.5 py-3.5 rounded-xl hover:bg-dark-800 border border-transparent hover:border-dark-700/50 text-slate-400 hover:text-white flex items-center gap-2.5 transition-all">
              <TrendingUp className="w-4.5 h-4.5 text-indigo-400" />
              Market Trends
            </Link>
            <Link to="/admin/funding" className="px-3.5 py-3.5 rounded-xl hover:bg-dark-800 border border-transparent hover:border-dark-700/50 text-slate-400 hover:text-white flex items-center gap-2.5 transition-all">
              <DollarSign className="w-4.5 h-4.5 text-indigo-400" />
              Funding Sources
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-dark-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/35 flex items-center justify-center text-indigo-400 shrink-0">
              <UserCheck className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Role: Pilot</p>
              <p className="text-xs font-bold text-white truncate max-w-[120px]">{admin?.name}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-grow p-6 lg:p-8 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Console Overview</h1>
            <p className="text-slate-400 text-xs sm:text-sm font-medium">Control data grids, run AI-assisted analyses, and check incoming user forms.</p>
          </div>
          <div className="flex gap-2">
            <Link 
              to="/admin/opportunities"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Manage Data
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        ) : !stats ? (
          <div className="glass p-12 text-center rounded-2xl">
            <p className="text-sm text-slate-400">Failed to aggregate dashboard analytics.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Widgets grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Opportunities</span>
                <p className="font-metrics font-extrabold text-3xl text-white">{stats.opportunities}</p>
                <div className="text-[9px] text-slate-500 font-medium">Browse explorer counts</div>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Market Trends</span>
                <p className="font-metrics font-extrabold text-3xl text-white">{stats.trends}</p>
                <div className="text-[9px] text-slate-500 font-medium">Sector insights tagged</div>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Funding Channels</span>
                <p className="font-metrics font-extrabold text-3xl text-white">{stats.fundingSources}</p>
                <div className="text-[9px] text-slate-500 font-medium">Schemes & accelerators</div>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">AI Diagnoses Generated</span>
                <p className="font-metrics font-extrabold text-3xl text-white">{stats.reports}</p>
                <div className="text-[9px] text-slate-500 font-medium">Venture plans + runways</div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Report Growth Line Chart */}
              <div className="lg:col-span-8 p-5 rounded-2xl bg-[#080d19]/80 border border-slate-800/80">
                <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-6">Diagnoses Report Volume (MoM)</h3>
                <div className="w-full h-[240px] text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={reportGrowthData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity="0.3" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }} />
                      <Area type="monotone" dataKey="reports" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorReports)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Funding Distribution Pie Chart */}
              <div className="lg:col-span-4 p-5 rounded-2xl bg-[#080d19]/80 border border-slate-800/80 flex flex-col justify-between">
                <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-4">Funding Schemes Share</h3>
                
                <div className="h-[180px] w-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Govt Schemes', value: 30 },
                          { name: 'Venture Capital', value: 25 },
                          { name: 'Accelerators', value: 45 }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        <Cell fill="#4F46E5" />
                        <Cell fill="#3B82F6" />
                        <Cell fill="#10B981" />
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-around text-[10px] font-bold text-slate-450 uppercase mt-2">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-indigo-600"></span> Schemes</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500"></span> Investors</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Accelerators</span>
                </div>
              </div>
            </div>

            {/* Recent inquiries Table */}
            <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-dark-700 flex justify-between items-center bg-[#070c17]/60">
                <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-brand-400" /> Incoming Query Inbox ({stats.queries})
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-dark-900/40 text-slate-400 font-bold border-b border-dark-700 uppercase tracking-wider text-[10px]">
                      <th className="px-6 py-3.5">Name</th>
                      <th className="px-6 py-3.5">Email</th>
                      <th className="px-6 py-3.5">Subject</th>
                      <th className="px-6 py-3.5">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-700/40">
                    {stats.recentActivities.queries.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-12 text-center text-slate-500 font-semibold">
                          Inbox is empty. No public user messages received yet.
                        </td>
                      </tr>
                    ) : (
                      stats.recentActivities.queries.map((q, i) => (
                        <tr key={q._id || i} className="hover:bg-dark-800/20 text-slate-200">
                          <td className="px-6 py-4 font-bold text-white">{q.name}</td>
                          <td className="px-6 py-4">{q.email}</td>
                          <td className="px-6 py-4 font-semibold text-indigo-300">{q.subject}</td>
                          <td className="px-6 py-4 text-slate-400 truncate max-w-[200px]" title={q.message}>
                            {q.message}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}
      </main>

    </div>
  );
}
