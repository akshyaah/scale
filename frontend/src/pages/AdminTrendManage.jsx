import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  adminGetTrends, 
  adminCreateTrend, 
  adminUpdateTrend, 
  adminDeleteTrend 
} from '../utils/api';
import { 
  Shield, LayoutDashboard, ListFilter, TrendingUp, DollarSign, 
  Plus, Edit2, Trash2, Search, X 
} from 'lucide-react';

export default function AdminTrendManage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState('');

  // Form inputs
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState('Technology');
  const [growthRate, setGrowthRate] = useState('50');
  const [source, setSource] = useState('');
  const [description, setDescription] = useState('');

  const industries = ['Technology', 'Software', 'Business Services', 'HR & Business', 'Logistics', 'E-commerce', 'Education', 'Hardware', 'HealthTech', 'Fintech'];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await adminGetTrends();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trend?')) {
      try {
        await adminDeleteTrend(id);
        setItems(items.filter(item => item._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete trend.');
      }
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setIndustry('Technology');
    setGrowthRate('50');
    setSource('');
    setDescription('');
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setTitle(item.title);
    setIndustry(item.industry);
    setGrowthRate(item.growthRate.toString());
    setSource(item.source || '');
    setDescription(item.description);
    setError('');
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError('Please fill in Title and Description.');
      return;
    }

    const payload = {
      title,
      industry,
      growthRate: Number(growthRate) || 0,
      source: source || 'Internal Analytics',
      description
    };

    try {
      if (editingItem) {
        const updated = await adminUpdateTrend(editingItem._id, payload);
        setItems(items.map(item => item._id === editingItem._id ? updated : item));
      } else {
        const created = await adminCreateTrend(payload);
        setItems([created, ...items]);
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Failed to save trend details.');
    }
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.industry.toLowerCase().includes(search.toLowerCase())
  );

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
            <Link to="/admin/dashboard" className="px-3.5 py-3.5 rounded-xl hover:bg-dark-800 border border-transparent hover:border-dark-700/50 text-slate-455 hover:text-white flex items-center gap-2.5 transition-all">
              <LayoutDashboard className="w-4.5 h-4.5 text-indigo-450" />
              Overview
            </Link>
            <Link to="/admin/opportunities" className="px-3.5 py-3.5 rounded-xl hover:bg-dark-800 border border-transparent hover:border-dark-700/50 text-slate-455 hover:text-white flex items-center gap-2.5 transition-all">
              <ListFilter className="w-4.5 h-4.5 text-indigo-455" />
              Opportunities
            </Link>
            <Link to="/admin/trends" className="px-3.5 py-3.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-white flex items-center gap-2.5">
              <TrendingUp className="w-4.5 h-4.5 text-indigo-400" />
              Market Trends
            </Link>
            <Link to="/admin/funding" className="px-3.5 py-3.5 rounded-xl hover:bg-dark-800 border border-transparent hover:border-dark-700/50 text-slate-455 hover:text-white flex items-center gap-2.5 transition-all">
              <DollarSign className="w-4.5 h-4.5 text-indigo-455" />
              Funding Sources
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Market Trends Management</h1>
            <p className="text-slate-400 text-xs">Register and track sectoral growth curves, sources, and descriptions.</p>
          </div>
          <button 
            onClick={openAddModal}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Trend
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-slate-550" />
          <input
            type="text"
            placeholder="Search trends..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass-input pl-10 pr-4 py-2 text-xs"
          />
        </div>

        {/* Table Display */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-8 h-8 border-3 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-2xl">
            <p className="text-slate-450 text-xs font-semibold">No trends registered yet. Add a trend report to show public charts.</p>
          </div>
        ) : (
          <div className="glass-card rounded-2xl border border-slate-800/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-dark-900/50 text-slate-400 font-bold border-b border-dark-700 uppercase tracking-wider text-[10px]">
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Industry</th>
                    <th className="px-6 py-4">YoY Growth Rate</th>
                    <th className="px-6 py-4">Source</th>
                    <th className="px-6 py-4">Recorded Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-700/40">
                  {filteredItems.map((item, idx) => (
                    <tr key={item._id || idx} className="hover:bg-dark-800/20 text-slate-300">
                      <td className="px-6 py-4 font-bold text-white max-w-[150px] truncate" title={item.title}>{item.title}</td>
                      <td className="px-6 py-4">{item.industry}</td>
                      <td className="px-6 py-4 font-metrics font-bold text-emerald-400">+{item.growthRate}%</td>
                      <td className="px-6 py-4 text-indigo-300 font-semibold">{item.source}</td>
                      <td className="px-6 py-4">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right space-x-2.5">
                        <button 
                          onClick={() => openEditModal(item)}
                          className="text-slate-400 hover:text-indigo-400 p-1 rounded hover:bg-dark-800 transition-all cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="text-slate-400 hover:text-rose-400 p-1 rounded hover:bg-dark-800 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal Form Dialog */}
        {modalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-dark-950/80 p-4 overflow-y-auto">
            <div className="w-full max-w-lg glass border border-slate-700/80 rounded-2xl shadow-2xl p-6 space-y-4 animate-fade-in my-8">
              <div className="flex justify-between items-center pb-3 border-b border-dark-700">
                <h3 className="font-bold text-base text-white">
                  {editingItem ? 'Edit Trend' : 'Add Trend'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Trend Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Hyper-Personalized AI Agents"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full glass-input px-3 py-2 text-xs"
                    required
                  />
                </div>

                {/* Industry & Source */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Industry</label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full glass-input px-3 py-2 text-xs"
                    >
                      {industries.map((ind, i) => (
                        <option key={i} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Analytics Source</label>
                    <input
                      type="text"
                      placeholder="e.g. Gartner Report 2026"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      className="w-full glass-input px-3 py-2 text-xs"
                      required
                    />
                  </div>
                </div>

                {/* YoY Growth Rate */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">YoY Growth Rate (Percentage)</label>
                  <input
                    type="number"
                    min="-100"
                    max="1000"
                    placeholder="e.g. 85"
                    value={growthRate}
                    onChange={(e) => setGrowthRate(e.target.value)}
                    className="w-full glass-input px-3 py-2 text-xs"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Description</label>
                  <textarea
                    rows="4"
                    placeholder="Enter detailed description regarding the trend's market drivers..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full glass-input px-3 py-2 text-xs"
                    required
                  />
                </div>

                {/* Error handling */}
                {error && (
                  <div className="p-3 bg-error/10 border border-error/20 text-error rounded-xl text-[11px]">
                    {error}
                  </div>
                )}

                {/* Save Buttons */}
                <div className="flex justify-end gap-3 pt-3 border-t border-dark-700">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-dark-700 hover:border-slate-500 rounded-lg text-slate-350 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
