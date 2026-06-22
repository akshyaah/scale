import React, { useState } from 'react';
import { publicAnalyzeStartup } from '../utils/api';
import { Sparkles, AlertCircle, FileText, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react';

function CircularProgress({ value, label, color = 'stroke-indigo-500' }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        {/* SVG Circle background and progress */}
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-dark-700 fill-none"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            className={`${color} fill-none transition-all duration-1000 ease-out`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {/* Text inside circle */}
        <div className="absolute inset-0 flex flex-col justify-center items-center font-metrics text-white font-extrabold text-lg">
          {value}%
        </div>
      </div>
      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{label}</span>
    </div>
  );
}

export default function StartupAnalyzer() {
  // Input fields
  const [idea, setIdea] = useState('');
  const [industry, setIndustry] = useState('Artificial Intelligence');
  const [budget, setBudget] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [teamSize, setTeamSize] = useState('2');

  // Report state
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const industries = ['Artificial Intelligence', 'Software', 'Business Services', 'E-commerce', 'Education', 'Hardware', 'HealthTech', 'Fintech'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idea.trim() || !budget || !targetMarket.trim() || !teamSize) {
      setError('Please fill in all inputs before triggering AI analysis.');
      return;
    }

    setError('');
    setLoading(true);
    setReport(null);

    try {
      const data = await publicAnalyzeStartup({
        idea,
        industry,
        budget: Number(budget),
        targetMarket,
        teamSize: Number(teamSize)
      });
      // The backend returns the saved analysis report containing { type, inputData, result }
      setReport(data.result);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze idea. Please check your connection or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-6 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Title Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Startup Analyzer</h1>
        <p className="text-slate-400 max-w-xl text-xs sm:text-sm">
          Submit your startup idea details, and our AI core model will diagnose market size, feasibility ratings, and generate a SWOT matrix.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input Form Panel */}
        <aside className="lg:col-span-5 glass border border-slate-700/60 p-6 rounded-2xl">
          <h2 className="font-bold text-base text-white flex items-center gap-2 mb-6 border-b border-dark-700 pb-3">
            <Sparkles className="w-5 h-5 text-brand-400" /> Venture Diagnoser
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Idea textarea */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Business Idea Detail</label>
              <textarea
                rows="4"
                placeholder="Describe your startup. What problem does it solve? What is the product?"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 text-xs leading-relaxed"
                required
              />
            </div>

            {/* Industry and Team Size */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full glass-input px-3 py-2.5 text-xs"
                >
                  {industries.map((ind, i) => (
                    <option key={i} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Initial Team Size</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full glass-input px-3.5 py-2 text-xs"
                  required
                />
              </div>
            </div>

            {/* Target Audience and Seed Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Target Audience</label>
                <input
                  type="text"
                  placeholder="e.g. College Students, Gyms"
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  className="w-full glass-input px-3.5 py-2 text-xs"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Seed Budget (INR)</label>
                <input
                  type="number"
                  min="1000"
                  placeholder="e.g. 50000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full glass-input px-3.5 py-2 text-xs"
                  required
                />
              </div>
            </div>

            {/* Error box */}
            {error && (
              <div className="p-3 bg-error/10 border border-error/20 text-error rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Trigger Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 font-bold text-sm bg-gradient-brand hover:scale-[1.01] active:scale-[0.99] text-white rounded-xl shadow-lg shadow-indigo-500/15 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Analyzing Idea...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-300" /> Diagnose Idea
                </>
              )}
            </button>
          </form>
        </aside>

        {/* Right Output AI Report Panel */}
        <section className="lg:col-span-7 min-h-[500px]">
          {loading && (
            <div className="glass border border-slate-700/60 p-12 rounded-2xl h-full flex flex-col justify-center items-center text-center space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <h3 className="font-bold text-lg text-white">Generating AI Diagnostics...</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Evaluating demand curves, checking operational viability, and assembling SWOT arrays.
              </p>
            </div>
          )}

          {!loading && !report && (
            <div className="glass border border-slate-700/60 p-12 rounded-2xl h-full flex flex-col justify-center items-center text-center space-y-4">
              <FileText className="w-12 h-12 text-slate-500" />
              <h3 className="font-bold text-base text-slate-300">Awaiting Diagnostics Input</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Describe your startup venture on the left side form and hit "Diagnose" to unlock a comprehensive audit.
              </p>
            </div>
          )}

          {!loading && report && (
            <div className="glass border border-slate-700/60 p-6 rounded-2xl space-y-6 animate-fade-in">
              <div className="flex justify-between items-center pb-4 border-b border-dark-700">
                <h3 className="font-bold text-base text-white flex items-center gap-2 uppercase tracking-wide">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Evaluation Report
                </h3>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full flex items-center gap-1">
                  {report.riskAssessment}
                </span>
              </div>

              {/* Progress Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-center items-center bg-[#070c17]/60 p-5 rounded-2xl border border-slate-800">
                <CircularProgress value={report.demandScore} label="Market Demand" color="stroke-indigo-500" />
                <CircularProgress value={report.feasibilityScore} label="Operational Feasibility" color="stroke-emerald-500" />
                <div className="col-span-2 sm:col-span-1 text-center sm:text-left space-y-1">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">1st Year Valuation</p>
                  <p className="font-metrics font-extrabold text-xl text-white">
                    ₹{report.revenuePotential.toLocaleString()}
                  </p>
                  <p className="text-[9px] text-slate-500 font-medium leading-none">Estimated gross potential</p>
                </div>
              </div>

              {/* SWOT Matrix Grid */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">SWOT Matrix Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                    <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest">Strengths (S)</span>
                    <ul className="list-disc pl-4 mt-2 text-[11px] text-slate-300 space-y-1">
                      {report.swotAnalysis.strengths.map((str, i) => (
                        <li key={i}>{str}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                    <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest">Weaknesses (W)</span>
                    <ul className="list-disc pl-4 mt-2 text-[11px] text-slate-300 space-y-1">
                      {report.swotAnalysis.weaknesses.map((wk, i) => (
                        <li key={i}>{wk}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Opportunities */}
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">Opportunities (O)</span>
                    <ul className="list-disc pl-4 mt-2 text-[11px] text-slate-300 space-y-1">
                      {report.swotAnalysis.opportunities.map((opp, i) => (
                        <li key={i}>{opp}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Threats */}
                  <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10">
                    <span className="text-[10px] font-extrabold text-rose-400 uppercase tracking-widest">Threats (T)</span>
                    <ul className="list-disc pl-4 mt-2 text-[11px] text-slate-300 space-y-1">
                      {report.swotAnalysis.threats.map((thr, i) => (
                        <li key={i}>{thr}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actionable Suggestions */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Co-Founder Roadmap Advice</h4>
                <div className="space-y-2">
                  {report.aiSuggestions.map((sug, i) => (
                    <div key={i} className="flex gap-2.5 items-start p-3 bg-dark-800 border border-slate-800 rounded-xl text-xs text-slate-200">
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
