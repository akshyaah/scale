import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, ShieldCheck, Zap, Cpu, Sparkles, TrendingUp, DollarSign } from 'lucide-react';

function RollingCounter({ target, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target.replace(/[^0-9]/g, ''), 10);
    if (isNaN(end)) {
      setCount(target);
      return;
    }

    const increment = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  const formatNumber = (num) => {
    if (typeof num === 'number') {
      return num.toLocaleString();
    }
    return num;
  };

  return (
    <span className="font-metrics font-extrabold text-4xl sm:text-5xl text-gradient-brand">
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export default function Home() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
      title: "Opportunity Evaluation",
      desc: "Identify, filter, and score new business markets based on risk margins, industry benchmarks, and initial capital.",
      link: "/opportunities"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
      title: "Financial Planning",
      desc: "Simulate cash flow runways, calculate breakeven periods, and get smart recommendations to extend startup viability.",
      link: "/planner"
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      title: "Resource Optimization",
      desc: "Allocate operating capital across departments, outline hiring schedules, and discover cost-saving redundancies.",
      link: "/optimizer"
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      title: "AI Startup Mentor",
      desc: "Consult our real-time Co-Founder assistant to review business models, drafting operational guides, and testing hypotheses.",
      link: "/analyzer"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32 px-6 flex items-center justify-center min-h-[85vh]">
        {/* Animated mesh grid background */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-95"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Scale advisory platform
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Launch Smarter. <br />
              <span className="text-gradient-brand">Grow Faster.</span>
            </h1>
            
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Transform your raw business ideas into highly feasible, investor-ready ventures using advanced AI-powered modeling, cash forecasting, and resource allocations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/analyzer" 
                className="px-6 py-3.5 rounded-xl bg-gradient-brand font-bold text-sm text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Analyze My Startup <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/opportunities" 
                className="px-6 py-3.5 rounded-xl border border-dark-700 hover:border-slate-500 font-bold text-sm text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Explore Opportunities
              </Link>
            </div>
          </div>

          {/* Right SVG Illustration / Floating Widgets */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Visual background circles */}
            <div className="w-72 h-72 rounded-full bg-brand-500/10 absolute -top-8 filter blur-3xl"></div>
            <div className="w-72 h-72 rounded-full bg-emerald-500/5 absolute -bottom-8 filter blur-3xl"></div>
            
            {/* Premium Vector SVG Composition representing growth and AI */}
            <div className="w-full max-w-[420px] relative animate-float">
              <svg viewBox="0 0 400 400" className="w-full h-auto text-slate-400">
                {/* Circuit Grid Background */}
                <path d="M 50 150 L 350 150 M 50 250 L 350 250 M 150 50 L 150 350 M 250 50 L 250 350" stroke="#334155" strokeWidth="1.5" strokeDasharray="5,5" opacity="0.3" />
                
                {/* Connection lines */}
                <path d="M 80 280 L 160 200 L 240 240 L 320 120" stroke="url(#scale-line-gradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Core Nodes */}
                <circle cx="80" cy="280" r="8" fill="#4F46E5" />
                <circle cx="160" cy="200" r="8" fill="#3B82F6" />
                <circle cx="240" cy="240" r="8" fill="#3B82F6" />
                <circle cx="320" cy="120" r="10" fill="#10B981" />
                
                {/* Pulsing indicator on the final node */}
                <circle cx="320" cy="120" r="18" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.5" className="animate-ping" style={{ transformOrigin: '320px 120px' }} />

                {/* SVG Definitions */}
                <defs>
                  <linearGradient id="scale-line-gradient" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="50%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Widgets */}
              {/* Widget 1: Revenue index */}
              <div className="absolute top-4 -left-6 glass border border-slate-700/60 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-pulse-subtle">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">MRR Forecast</p>
                  <p className="font-metrics font-bold text-sm text-white">₹8,45,200</p>
                </div>
              </div>

              {/* Widget 2: Business Score */}
              <div className="absolute bottom-8 -right-6 glass border border-slate-700/60 p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Feasibility</p>
                  <p className="font-metrics font-bold text-sm text-emerald-400">89.4% (Strong)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-dark-700/50">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Advisory Suite</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Sleek analytical modules to run diagnostic checks, forecast capital runtimes, and formulate strategic actions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <Link 
              key={index} 
              to={item.link}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between h-72 border border-slate-800 hover:border-slate-700/60 transition-all cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-dark-900 border border-dark-700 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors">
                Launch Module <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STATISTICS COUNTERS */}
      <section className="py-16 px-6 bg-dark-800/45 border-y border-dark-700/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-30"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10 text-center relative z-10">
          <div className="space-y-2">
            <RollingCounter target="15230" suffix="+" />
            <p className="text-slate-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">Opportunities Analyzed</p>
          </div>
          <div className="space-y-2">
            <RollingCounter target="480" suffix="+" />
            <p className="text-slate-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">Funding Programs</p>
          </div>
          <div className="space-y-2">
            <RollingCounter target="24" suffix="+" />
            <p className="text-slate-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">Industries Covered</p>
          </div>
          <div className="space-y-2">
            <RollingCounter target="84900" suffix="+" />
            <p className="text-slate-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">Success Insights Generated</p>
          </div>
        </div>
      </section>
    </div>
  );
}
