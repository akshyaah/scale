import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, BarChart3, ShieldCheck, Zap, Cpu, Sparkles, 
  TrendingUp, DollarSign, Compass, Maximize, Layers, Hammer, 
  Building, Sliders, MapPin, CheckCircle, Quote
} from 'lucide-react';

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

/* ==========================================
   Scale Studio Blueprint Studio Component
   ========================================== */
function BlueprintStudio() {
  const [width, setWidth] = useState(25);
  const [length, setLength] = useState(35);
  const [levels, setLevels] = useState(2);
  const [style, setStyle] = useState('minimalist'); // 'minimalist' | 'brutalist' | 'organic'

  // Calculations
  const floorArea = width * length * levels;
  const structuralIndex = Math.min(99.8, (96.5 - (levels * 2.8) + (style === 'brutalist' ? 5.2 : -1.5))).toFixed(1);
  const thermalIndex = (style === 'minimalist' ? 84.2 - levels * 1.1 : style === 'brutalist' ? 86.8 - levels * 1.5 : 91.5).toFixed(1);
  const estimatedDays = Math.round((floorArea * 0.35) + (levels * 35) + (style === 'brutalist' ? 40 : 15));

  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-zinc-250 shadow-sm text-zinc-900">
      {/* Parameter Panel */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800">Dynamic Sandbox</span>
          <h3 className="text-2xl font-extrabold text-zinc-900 mt-1">Spatial Planner</h3>
          <p className="text-zinc-600 text-xs mt-1">Configure dimensions and core architectural parameters to compute material ratios and structure ratings.</p>
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-xs font-semibold uppercase tracking-wider text-zinc-800">
          <div className="space-y-2">
            <div className="flex justify-between text-zinc-700">
              <span>Lot Width: {width}m</span>
              <span className="text-zinc-400 font-normal font-metrics">Max 45m</span>
            </div>
            <input 
              type="range" min="15" max="45" value={width} 
              onChange={(e) => setWidth(parseInt(e.target.value))}
              className="w-full accent-zinc-900 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-zinc-700">
              <span>Lot Length: {length}m</span>
              <span className="text-zinc-400 font-normal font-metrics">Max 60m</span>
            </div>
            <input 
              type="range" min="20" max="60" value={length} 
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-zinc-900 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-zinc-700">
              <span>Levels: {levels} {levels > 1 ? 'Stories' : 'Story'}</span>
            </div>
            <div className="flex gap-2 mt-1">
              {[1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setLevels(num)}
                  className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${levels === num ? 'bg-zinc-900 text-white border-zinc-900' : 'border-zinc-300 hover:border-zinc-500 text-zinc-700 bg-white/50'}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-zinc-700">Design Aesthetic</span>
            <div className="flex gap-2 mt-1">
              {[
                { id: 'minimalist', label: 'Minimal Glass' },
                { id: 'brutalist', label: 'Concrete Slab' },
                { id: 'organic', label: 'Natural Stone' }
              ].map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStyle(s.id)}
                  className={`flex-1 py-2 rounded-lg border text-[10px] font-bold uppercase transition-all cursor-pointer ${style === s.id ? 'bg-zinc-900 text-white border-zinc-900' : 'border-zinc-300 hover:border-zinc-500 text-zinc-700 bg-white/50'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live calculated feedback */}
        <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 pt-4">
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-550">Total Footprint</p>
            <p className="font-metrics font-extrabold text-lg text-zinc-900">{floorArea} m²</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-550">Simulated Build</p>
            <p className="font-metrics font-extrabold text-lg text-zinc-900">~{estimatedDays} Days</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-550">Structural Safety</p>
            <p className="font-metrics font-extrabold text-lg text-emerald-800">{structuralIndex}%</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-550">Thermal Efficiency</p>
            <p className="font-metrics font-extrabold text-lg text-amber-800">{thermalIndex}%</p>
          </div>
        </div>
      </div>

      {/* SVG Blueprint Canvas */}
      <div className="lg:col-span-7 bg-[#FAF9F5] border border-zinc-250 p-6 rounded-2xl shadow-inner min-h-[320px] flex items-center justify-center relative overflow-hidden">
        {/* Architectural drafting background */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(#C2A478 1.2px, transparent 1.2px)', 
          backgroundSize: '16px 16px',
          opacity: 0.15
        }}></div>

        <div className="relative z-10 w-full max-w-[400px] h-[300px] flex items-center justify-center">
          <svg viewBox="0 0 400 300" className="w-full h-full text-zinc-800">
            {/* Dimensions limits */}
            <line x1="40" y1="250" x2="360" y2="250" stroke="#C2A478" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.5" />
            <line x1="40" y1="40" x2="40" y2="250" stroke="#C2A478" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.5" />

            {/* Label texts */}
            <text x="200" y="268" fill="#C2A478" fontSize="9" fontWeight="bold" textAnchor="middle" letterSpacing="1">{width * 1.5}m LOT WIDTH</text>
            <text x="22" y="145" fill="#C2A478" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-90 22 145)" letterSpacing="1">{length * 1.2}m LOT DEPTH</text>

            {/* Render stories based on levels config */}
            {Array.from({ length: levels }).map((_, i) => {
              const boxWidth = width * 5.8;
              const boxHeight = 36;
              const xPos = 200 - boxWidth / 2;
              const yPos = 230 - (i + 1) * boxHeight - (i * 3);

              return (
                <g key={i} className="transition-all duration-500">
                  <rect 
                    x={xPos} 
                    y={yPos} 
                    width={boxWidth} 
                    height={boxHeight} 
                    fill={style === 'minimalist' ? 'rgba(194, 164, 120, 0.08)' : style === 'brutalist' ? 'rgba(18, 18, 18, 0.07)' : 'rgba(120, 113, 110, 0.06)'} 
                    stroke="#121212" 
                    strokeWidth="1.8" 
                  />

                  {/* Design details depending on architectural style */}
                  {style === 'minimalist' && (
                    <>
                      <line x1={xPos + boxWidth * 0.3} y1={yPos} x2={xPos + boxWidth * 0.3} y2={yPos + boxHeight} stroke="#C2A478" strokeWidth="0.8" />
                      <line x1={xPos + boxWidth * 0.7} y1={yPos} x2={xPos + boxWidth * 0.7} y2={yPos + boxHeight} stroke="#C2A478" strokeWidth="0.8" />
                      <rect x={xPos + 8} y={yPos + 6} width={14} height={14} fill="none" stroke="#C2A478" strokeWidth="1" opacity="0.6" />
                      <rect x={xPos + boxWidth - 22} y={yPos + 6} width={14} height={14} fill="none" stroke="#C2A478" strokeWidth="1" opacity="0.6" />
                    </>
                  )}

                  {style === 'brutalist' && (
                    <>
                      <rect x={xPos + 8} y={yPos} width={10} height={boxHeight} fill="#121212" />
                      <rect x={xPos + boxWidth - 18} y={yPos} width={10} height={boxHeight} fill="#121212" />
                      <rect x={xPos + boxWidth / 2 - 5} y={yPos} width={10} height={boxHeight} fill="#121212" opacity="0.75" />
                    </>
                  )}

                  {style === 'organic' && (
                    <>
                      <path d={`M ${xPos + 6} ${yPos + boxHeight} Q ${xPos + boxWidth/2} ${yPos + 8} ${xPos + boxWidth - 6} ${yPos + boxHeight}`} fill="none" stroke="#C2A478" strokeWidth="1.2" />
                      <circle cx={xPos + 18} cy={yPos + 18} r="3" fill="#C2A478" />
                      <circle cx={xPos + boxWidth - 18} cy={yPos + 18} r="3" fill="#C2A478" />
                    </>
                  )}

                  {/* Level label */}
                  <text x={xPos + boxWidth/2} y={yPos + boxHeight/2 + 3} fill="#121212" fontSize="8" fontWeight="extrabold" textAnchor="middle" letterSpacing="0.5">STORY {i+1}</text>
                </g>
              );
            })}

            {/* Foundation ground */}
            <line x1="30" y1="230" x2="370" y2="230" stroke="#121212" strokeWidth="3" />
            <line x1="40" y1="232" x2="360" y2="232" stroke="#C2A478" strokeWidth="1" opacity="0.7" />
          </svg>
        </div>

        {/* Blueprint watermark */}
        <div className="absolute bottom-3 right-4 text-[8px] font-bold text-zinc-400 tracking-widest font-metrics">
          SCALE.STUDIO // PLOT-{width}X{length}
        </div>
      </div>
    </div>
  );
}

export default function Home({ siteMode }) {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '', type: 'Residential' });
  const [submitted, setSubmitted] = useState(false);

  // Scroll to hash helper
  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [siteMode]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactForm({ name: '', email: '', message: '', type: 'Residential' });
    }, 4000);
  };

  const startupFeatures = [
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

  /* ==========================================
     RENDER B: Scale Studio (Architecture Theme)
     ========================================== */
  if (siteMode === 'architecture') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans transition-colors duration-500 overflow-x-hidden pt-6">
        {/* HERO SECTION */}
        <section id="home" className="relative pt-12 pb-24 md:py-32 px-6 flex items-center justify-center min-h-[85vh]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-200/60 border border-zinc-300 text-zinc-800 text-xs font-bold uppercase tracking-widest">
                <Compass className="w-3.5 h-3.5 text-zinc-900" /> Scale Studio Architecture
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.08] font-display">
                Form Follows <br />
                <span className="text-[#C2A478] font-light">Future.</span>
              </h1>
              
              <p className="text-zinc-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                We synthesize space, light, materials, and gravity to craft architectural masterpieces that stand for generations and represent the peak of minimalist design.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="#configurator" 
                  className="px-6 py-3.5 rounded-xl bg-zinc-900 text-white font-bold text-sm hover:bg-[#C2A478] hover:text-zinc-900 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
                >
                  Blueprint Studio <Maximize className="w-4 h-4" />
                </a>
                <a 
                  href="#projects" 
                  className="px-6 py-3.5 rounded-xl border border-zinc-350 hover:border-zinc-800 font-bold text-sm text-zinc-700 hover:text-zinc-900 transition-all flex items-center justify-center gap-2 cursor-pointer bg-white/50"
                >
                  Explore Projects
                </a>
              </div>
            </div>

            {/* Right Showcase Image */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="w-72 h-72 rounded-full bg-zinc-200/50 absolute -top-8 filter blur-3xl"></div>
              
              <div className="w-full max-w-[420px] relative animate-float">
                <div className="relative rounded-2xl overflow-hidden border border-zinc-300 shadow-xl bg-zinc-100 p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" 
                    alt="Scale Minimalist House" 
                    className="w-full h-auto object-cover rounded-xl"
                  />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass border border-white/20 shadow-md">
                    <p className="text-[10px] uppercase font-bold text-[#C2A478] tracking-widest">Featured Concept</p>
                    <p className="font-display font-extrabold text-sm text-zinc-900 mt-0.5">The Travertine Oasis (Malibu)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS GRID SECTION */}
        <section id="projects" className="py-24 px-6 border-t border-zinc-200 bg-zinc-50">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900">Featured Creations</h2>
              <p className="text-zinc-550 max-w-xl mx-auto text-sm sm:text-base">
                An edit of curated residential, commercial, and structural installations built with rigorous minimalist guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Travertine Pavilion",
                  loc: "Arizona Desert",
                  img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
                  desc: "A sanctuary of marble and light, carved into the desert cliffs with a seamless indoor-outdoor boundary."
                },
                {
                  title: "Monolith Art Gallery",
                  loc: "Munich, Germany",
                  img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
                  desc: "A colossal concrete installation emphasizing raw brutalist slabs, natural light angles, and negative space."
                },
                {
                  title: "Glass Pavilion",
                  loc: "Malibu, California",
                  img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
                  desc: "A structural marvel suspended over the Pacific, featuring full-height floor-to-ceiling glass grids."
                }
              ].map((proj, idx) => (
                <div key={idx} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-zinc-250 shadow-sm bg-white hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <div className="h-48 overflow-hidden relative">
                      <img src={proj.img} alt={proj.title} className="w-full h-full object-cover hover:scale-105 transition-all duration-500" />
                      <div className="absolute top-4 left-4 bg-zinc-900/90 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C2A478]" /> {proj.loc}
                      </div>
                    </div>
                    <div className="p-6 space-y-2">
                      <h3 className="text-lg font-bold text-zinc-900">{proj.title}</h3>
                      <p className="text-zinc-650 text-xs leading-relaxed">{proj.desc}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <span className="text-xs font-bold text-amber-800 hover:text-zinc-900 cursor-pointer flex items-center gap-1">
                      View Project Spec &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLUEPRINT STUDIO CONFIGURATOR */}
        <section id="configurator" className="py-24 px-6 border-t border-zinc-200">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900">Blueprint Studio</h2>
              <p className="text-zinc-550 max-w-xl mx-auto text-sm sm:text-base">
                Use our interactive simulator to experiment with spatial footprints, dimensions, and architectural design styles.
              </p>
            </div>
            
            <BlueprintStudio />
          </div>
        </section>

        {/* BRAND VALUES / PHILOSOPHY */}
        <section id="philosophy" className="py-24 px-6 border-t border-zinc-200 bg-zinc-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800">Design Ethos</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900">The Principles of Scale</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900/10 border border-zinc-300 flex items-center justify-center text-zinc-900 shrink-0">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-zinc-900">1. Minimalism</h4>
                      <p className="text-zinc-600 text-xs mt-1 leading-relaxed">Stripping away the superfluous to amplify structure, natural material authenticity, and light paths.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900/10 border border-zinc-300 flex items-center justify-center text-zinc-900 shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-zinc-900">2. Innovation</h4>
                      <p className="text-zinc-600 text-xs mt-1 leading-relaxed">Using advanced structural calculations and ecological designs to build homes that are thermally sound and carbon efficient.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900/10 border border-zinc-300 flex items-center justify-center text-zinc-900 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-zinc-900">3. Reliability</h4>
                      <p className="text-zinc-600 text-xs mt-1 leading-relaxed">Providing absolute architectural project oversight, material engineering safety, and structural longevity that spans centuries.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editorial block quote */}
              <div className="p-8 md:p-12 bg-zinc-900 text-white rounded-3xl relative flex flex-col justify-between h-[360px] shadow-lg">
                <Quote className="w-12 h-12 text-[#C2A478] opacity-60 absolute top-8 left-8" />
                <div className="mt-12 relative z-10">
                  <p className="text-xl sm:text-2xl font-display font-light italic leading-relaxed text-zinc-200">
                    "Scale does not merely construct physical spaces; they choreograph light, wind, material, and gravity into architectural poetry."
                  </p>
                </div>
                <div className="border-t border-zinc-700/60 pt-6 mt-6 flex justify-between items-center">
                  <div>
                    <p className="font-extrabold text-sm text-[#C2A478]">Elena Rostova</p>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Editor in Chief, Architectural Digest</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INQUIRE / CONTACT */}
        <section id="contact" className="py-24 px-6 border-t border-zinc-200">
          <div className="max-w-3xl mx-auto glass-card p-8 md:p-10 rounded-3xl border border-zinc-250 shadow-sm bg-white">
            <div className="text-center space-y-3 mb-10">
              <h2 className="text-3xl font-extrabold text-zinc-900">Initiate a Project</h2>
              <p className="text-zinc-650 text-sm">
                Arrange a confidential design consultation at our studio or on-site layout evaluations.
              </p>
            </div>

            {submitted ? (
              <div className="text-center p-8 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 text-emerald-800">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h3 className="text-lg font-bold">Consultation Scheduled Successfully</h3>
                <p className="text-xs">A Scale partner will contact you at the provided email within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-750">Full Name</label>
                    <input 
                      type="text" required 
                      placeholder="e.g. Sarah Jenkins"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full p-3 rounded-lg border border-zinc-300 focus:border-zinc-900 bg-white/50 focus:ring-1 focus:ring-zinc-900 outline-none text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-750">Email Address</label>
                    <input 
                      type="email" required 
                      placeholder="sarah@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full p-3 rounded-lg border border-zinc-300 focus:border-zinc-900 bg-white/50 focus:ring-1 focus:ring-zinc-900 outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-750">Inquiry Scope</label>
                  <select
                    value={contactForm.type}
                    onChange={(e) => setContactForm({ ...contactForm, type: e.target.value })}
                    className="w-full p-3 rounded-lg border border-zinc-300 focus:border-zinc-900 bg-white/50 focus:ring-1 focus:ring-zinc-900 outline-none text-sm transition-all"
                  >
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Cultural / Museum</option>
                    <option>Custom Concept Studio</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-750">Project Vision Description</label>
                  <textarea 
                    rows="4" required 
                    placeholder="Describe your design parameters, lot layout, and architectural style desires..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-3 rounded-lg border border-zinc-300 focus:border-zinc-900 bg-white/50 focus:ring-1 focus:ring-zinc-900 outline-none text-sm transition-all"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-zinc-900 text-white hover:bg-[#C2A478] hover:text-zinc-900 font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  Send Consultation Inquiry <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    );
  }

  /* ==========================================
     RENDER A: Scale AI (Startup Planner Theme)
     ========================================== */
  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans transition-colors duration-500">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32 px-6 flex items-center justify-center min-h-[85vh]">
        {/* Animated mesh grid background */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-95"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Scale AI advisory platform
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
          {startupFeatures.map((item, index) => (
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
