import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  adminGetFunding, 
  adminCreateFunding, 
  adminUpdateFunding, 
  adminDeleteFunding 
} from '../utils/api';
import { 
  Shield, LayoutDashboard, ListFilter, TrendingUp, DollarSign, 
  Plus, Edit2, Trash2, Search, X, ExternalLink 
} from 'lucide-react';

export default function AdminFundingManage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState('');

  // Form inputs
  const [name, setName] = useState('');
  const [type, setType] = useState('Government Scheme');
  const [amount, setAmount] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');

  const types = ['Government Scheme', 'Investor', 'Incubator', 'Accelerator'];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await adminGetFunding();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this funding source?')) {
      try {
        await adminDeleteFunding(id);
        setItems(items.filter(item => item._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete item.');
      }
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setName('');
    setType('Government Scheme');
    setAmount('');
    setEligibility('');
    setWebsite('');
    setDescription('');
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setName(item.name);
    setType(item.type);
    setAmount(item.amount);
    setEligibility(item.eligibility);
    setWebsite(item.website || '');
    setDescription(item.description);
    setError('');
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name || !amount || !eligibility || !description) {
      setError('Please fill in Name, Funding Amount, Eligibility, and Description.');
      return;
    }

    const payload = {
      name,
      type,
      amount,
      eligibility,
      website: website || '',
      description
    };

    try {
      if (editingItem) {
        const updated = await adminUpdateFunding(editingItem._id, payload);
        setItems(items.map(item => item._id === editingItem._id ? updated : item));
      } else {
        const created = await adminCreateFunding(payload);
        setItems([created, ...items]);
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Failed to save funding details.');
    }
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.type.toLowerCase().includes(search.toLowerCase())
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
              <LayoutDashboard className="w-4.5 h-4.5 text-indigo-455" />
              Overview
            </Link>
            <Link to="/admin/opportunities" className="px-3.5 py-3.5 rounded-xl hover:bg-dark-800 border border-transparent hover:border-dark-700/50 text-slate-455 hover:text-white flex items-center gap-2.5 transition-all">
              <ListFilter className="w-4.5 h-4.5 text-indigo-455" />
              Opportunities
            </Link>
            <Link to="/admin/trends" className="px-3.5 py-3.5 rounded-xl hover:bg-dark-800 border border-transparent hover:border-dark-700/50 text-slate-455 hover:text-white flex items-center gap-2.5 transition-all">
              <TrendingUp className="w-4.5 h-4.5 text-indigo-455" />
              Market Trends
            </Link>
            <Link to="/admin/funding" className="px-3.5 py-3.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-white flex items-center gap-2.5">
              <DollarSign className="w-4.5 h-4.5 text-indigo-450" />
              Funding Sources
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Funding Sources Directory</h1>
            <p className="text-slate-400 text-xs">Manage schemes, seed investors, accelerators, and business incubators.</p>
          </div>
          <button 
            onClick={openAddModal}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Funding
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-slate-550" />
          <input
            type="text"
            placeholder="Search funding programs..."
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
            <p className="text-slate-450 text-xs font-semibold">No funding sources registered yet.</p>
          </div>
        ) : (
          <div className="glass-card rounded-2xl border border-slate-800/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-dark-900/50 text-slate-400 font-bold border-b border-dark-700 uppercase tracking-wider text-[10px]">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Funding Amount</th>
                    <th className="px-6 py-4">Eligibility</th>
                    <th className="px-6 py-4">Website</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-700/40">
                  {filteredItems.map((item, idx) => (
                    <tr key={item._id || idx} className="hover:bg-dark-800/20 text-slate-300">
                      <td className="px-6 py-4 font-bold text-white max-w-[150px] truncate" title={item.name}>{item.name}</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-metrics font-bold text-white">{item.amount}</td>
                      <td className="px-6 py-4 text-slate-400 truncate max-w-[150px]" title={item.eligibility}>{item.eligibility}</td>
                      <td className="px-6 py-4">
                        {item.website ? (
                          <a href={item.website} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline inline-flex items-center gap-1">
                            Link <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : '-'}
                      </td>
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
                  {editingItem ? 'Edit Funding Source' : 'Add Funding Source'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Funding Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Startup India Seed Fund"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full glass-input px-3 py-2 text-xs"
                    required
                  />
                </div>

                {/* Type & Website */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full glass-input px-3 py-2 text-xs"
                    >
                      {types.map((t, i) => (
                        <option key={i} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Website URL</label>
                    <input
                      type="url"
                      placeholder="e.g. https://seedfund.gov.in"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full glass-input px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                {/* Amount & Eligibility */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Funding Amount Range</label>
                    <input
                      type="text"
                      placeholder="e.g. Up to ₹20,00,000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full glass-input px-3 py-2 text-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Eligibility Criteria</label>
                    <input
                      type="text"
                      placeholder="e.g. DPIIT recognized, incorporated under 2 years"
                      value={eligibility}
                      onChange={(e) => setEligibility(e.target.value)}
                      className="w-full glass-input px-3 py-2 text-xs"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Description</label>
                  <textarea
                    rows="3"
                    placeholder="Enter details regarding funding objectives, timelines, and application process..."
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
