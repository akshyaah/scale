import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, BarChart3, ShieldCheck, Zap, Cpu, Sparkles, 
  TrendingUp, DollarSign, Compass, Maximize, Layers, Hammer, 
  Building, Sliders, MapPin, CheckCircle, Quote, Utensils,
  Wine, Users, Clock, Calendar, Check
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
          <p className="text-zinc-650 text-xs mt-1">Configure dimensions and core architectural parameters to compute material ratios and structure ratings.</p>
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-xs font-semibold uppercase tracking-wider text-zinc-800">
          <div className="space-y-2">
            <div className="flex justify-between text-zinc-705">
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
            <div className="flex justify-between text-zinc-705">
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
            <div className="flex justify-between text-zinc-705">
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
            <span className="text-zinc-705">Design Aesthetic</span>
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
            <p className="text-[10px] uppercase font-bold text-zinc-500">Total Footprint</p>
            <p className="font-metrics font-extrabold text-lg text-zinc-900">{floorArea} m²</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-500">Simulated Build</p>
            <p className="font-metrics font-extrabold text-lg text-zinc-900">~{estimatedDays} Days</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-500">Structural Safety</p>
            <p className="font-metrics font-extrabold text-lg text-emerald-800">{structuralIndex}%</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-500">Thermal Efficiency</p>
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

/* ==========================================
   Scale Bistro Culinary Experience Sandbox
   ========================================== */
function CulinarySandbox() {
  const [courses, setCourses] = useState(5); // 3 | 5 | 7
  const [diet, setDiet] = useState('carnivore'); // 'carnivore' | 'pescatarian' | 'plant'
  const [wineTier, setWineTier] = useState('classic'); // 'none' | 'classic' | 'rare'

  // Pricing calculations
  const basePrice = courses === 3 ? 4500 : courses === 5 ? 7500 : 11000;
  const winePrice = wineTier === 'none' ? 0 : wineTier === 'classic' ? 3500 : 8500;
  const totalPrice = basePrice + winePrice;
  const duration = courses === 3 ? 90 : courses === 5 ? 140 : 200;

  // Dishes structures
  const dishes = {
    carnivore: {
      appetizer: "Hokkaido scallops seared with double-smoked pancetta, parsnip velvet, and shaved autumn truffle.",
      soup: "Saffron shellfish bouillon infused with Pernod, roasted baby fennel, and garlic-confit crostini.",
      midCourse: "Crispy-skinned duck breast with wild cherry reductions, roasted sunchokes, and hazelnut dust.",
      main: "Dry-aged A5 Miyazaki Wagyu ribeye with marrow reduction, caramelized shallot pureé, and salt-baked fingerlings.",
      dessert: "Madagascar vanilla bean soufflé with liquid salted-caramel core and 24k gold leaf."
    },
    pescatarian: {
      appetizer: "Citrus-cured wild hamachi with pickled sea fennel, avocado mousse, and white shoyu-yuzu reduction.",
      soup: "Velvety lobster bisque finished with cognac cream, tarragon oil, and butter-poached claw meat.",
      midCourse: "Pan-roasted Arctic char with charred asparagus tips, lemon-caper butter, and toasted almond crumble.",
      main: "Line-caught Chilean sea bass with butter-poached leeks, saffron-infused shellfish reduction, and coastal sea herbs.",
      dessert: "Grand Marnier citrus tartlet with dark chocolate curls and candied orange zests."
    },
    plant: {
      appetizer: "Heritage beetroot textures with goat cheese cloud, honey-poached figs, and toasted pumpkin seed emulsion.",
      soup: "Roasted chestnut and forest mushroom cream soup drizzled with cold-pressed truffle oil.",
      midCourse: "Braised baby artichokes with heritage tomato confit, olive tapenade, and herb-infused focaccia.",
      main: "Truffle-glazed wild forest mushroom tartlet with roasted sunchokes, watercress velvet, and hazelnut crunch.",
      dessert: "Single-origin dark chocolate avocado marquise with local raspberry sorbet and crystallized violet petals."
    }
  };

  const getWinePairing = () => {
    if (wineTier === 'none') return "Artisanal mocktail pairings infused with local botanicals.";
    if (wineTier === 'classic') {
      if (courses === 3) return "2021 Puligny-Montrachet (Burgundy) & 2019 Chateau Musar (Lebanon)";
      return "2021 Puligny-Montrachet, 2018 Chateau Palmer (Margaux), & 10-Year Tawny Port.";
    }
    // Rare Cellar
    if (courses === 3) return "2015 Dom Pérignon (Champagne) & 2009 Chateau Mouton Rothschild (Pauillac)";
    return "1996 Dom Pérignon Oenothèque, 2005 Romanée-Conti La Tâche, & 1977 Taylor Fladgate Vintage Port.";
  };

  const currentSelection = dishes[diet];

  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-[#D9A752]/20 shadow-xl text-[#F5F5F4] bg-[#1C1917]/95">
      {/* Parameters Panel */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9A752] flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5" /> Michelin Tasting Sandbox
          </span>
          <h3 className="text-2xl font-extrabold text-[#F5F5F4]">Curate Your Menu</h3>
          <p className="text-stone-400 text-xs">Select your course depth, dietary profile, and wine pairing preferences to design a customized culinary itinerary.</p>
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-xs font-semibold uppercase tracking-wider text-stone-300">
          <div className="space-y-2">
            <span className="text-stone-400">Course Count</span>
            <div className="flex gap-2 mt-1">
              {[3, 5, 7].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setCourses(num)}
                  className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${courses === num ? 'bg-[#D9A752] text-zinc-950 border-[#D9A752]' : 'border-stone-700 hover:border-stone-500 text-stone-300 bg-stone-900/50'}`}
                >
                  {num} Courses
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-stone-400">Gastronomic Path</span>
            <div className="flex gap-2 mt-1">
              {[
                { id: 'carnivore', label: 'Carnivore' },
                { id: 'pescatarian', label: 'Pescatarian' },
                { id: 'plant', label: 'Plant-Based' }
              ].map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDiet(d.id)}
                  className={`flex-1 py-2 rounded-lg border text-[10px] font-bold uppercase transition-all cursor-pointer ${diet === d.id ? 'bg-[#D9A752] text-zinc-950 border-[#D9A752]' : 'border-stone-700 hover:border-stone-500 text-stone-300 bg-stone-900/50'}`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-stone-400">Wine Pairings Tiers</span>
            <div className="flex gap-2 mt-1">
              {[
                { id: 'none', label: 'No Pairing' },
                { id: 'classic', label: 'Classic Sommelier' },
                { id: 'rare', label: 'Rare Cellar' }
              ].map(w => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setWineTier(w.id)}
                  className={`flex-1 py-2 rounded-lg border text-[10px] font-bold uppercase transition-all cursor-pointer ${wineTier === w.id ? 'bg-[#D9A752] text-zinc-950 border-[#D9A752]' : 'border-stone-700 hover:border-stone-500 text-stone-300 bg-stone-900/50'}`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live calculated feedback */}
        <div className="grid grid-cols-2 gap-4 border-t border-stone-800 pt-4">
          <div>
            <p className="text-[10px] uppercase font-bold text-stone-500">Price per Guest</p>
            <p className="font-metrics font-extrabold text-lg text-[#D9A752]">₹{totalPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-stone-500">Est. Duration</p>
            <p className="font-metrics font-extrabold text-lg text-[#F5F5F4] flex items-center gap-1.5"><Clock className="w-4 h-4 text-stone-400" /> {duration} Mins</p>
          </div>
        </div>
      </div>

      {/* Live Menu display */}
      <div className="lg:col-span-7 bg-[#12100E] border border-stone-850 p-6 md:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-inner">
        {/* Artistic overlay */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-[#D9A752]/5 to-transparent"></div>

        <div className="space-y-6 text-center max-w-lg mx-auto py-4">
          <span className="font-serif italic text-xs text-[#D9A752] tracking-widest">Le Menu Configuré</span>
          
          <div className="space-y-4 divide-y divide-stone-900 text-stone-300">
            {/* Appetizer */}
            <div className="pt-0">
              <span className="text-[9px] uppercase font-extrabold text-[#D9A752] tracking-widest block">I. L'Entrée</span>
              <p className="font-serif text-sm italic mt-1 leading-relaxed">{currentSelection.appetizer}</p>
            </div>

            {/* Soup (5 & 7 Courses) */}
            {courses >= 5 && (
              <div className="pt-4">
                <span className="text-[9px] uppercase font-extrabold text-[#D9A752] tracking-widest block">II. Le Potage</span>
                <p className="font-serif text-sm italic mt-1 leading-relaxed">{currentSelection.soup}</p>
              </div>
            )}

            {/* Mid Course (7 Courses) */}
            {courses === 7 && (
              <div className="pt-4">
                <span className="text-[9px] uppercase font-extrabold text-[#D9A752] tracking-widest block">III. L'Intermédiaire</span>
                <p className="font-serif text-sm italic mt-1 leading-relaxed">{currentSelection.midCourse}</p>
              </div>
            )}

            {/* Main Course */}
            <div className="pt-4">
              <span className="text-[9px] uppercase font-extrabold text-[#D9A752] tracking-widest block">{courses === 3 ? "II." : courses === 5 ? "III." : "IV."} Le Plat Principal</span>
              <p className="font-serif text-sm italic mt-1 leading-relaxed text-[#F5F5F4]">{currentSelection.main}</p>
            </div>

            {/* Dessert */}
            <div className="pt-4">
              <span className="text-[9px] uppercase font-extrabold text-[#D9A752] tracking-widest block">{courses === 3 ? "III." : courses === 5 ? "IV." : "V."} Le Dessert</span>
              <p className="font-serif text-sm italic mt-1 leading-relaxed">{currentSelection.dessert}</p>
            </div>

            {/* Wine Pairing Description */}
            <div className="pt-4 border-t border-dashed border-[#D9A752]/20">
              <span className="text-[9px] uppercase font-extrabold text-[#D9A752] tracking-widest block flex items-center justify-center gap-1"><Wine className="w-3 h-3" /> Accompagnement de Vins</span>
              <p className="text-xs mt-1 text-[#D9A752]">{getWinePairing()}</p>
            </div>
          </div>
        </div>

        <div className="text-center text-[8px] font-bold text-stone-500 tracking-widest font-metrics border-t border-stone-900 pt-3">
          SCALE BISTRO // CHEF DE CUISINE
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   Scale Bistro Interactive Dining Room
   ========================================== */
function InteractiveTablePlanner() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [guestCount, setGuestCount] = useState(2);
  const [date, setDate] = useState('2026-06-23');
  const [time, setTime] = useState('19:00');
  const [booked, setBooked] = useState(false);
  const [tableStatus, setTableStatus] = useState({
    1: 'available',
    2: 'reserved',
    3: 'available',
    4: 'available',
    5: 'available',
    6: 'available'
  });

  const tables = [
    { id: 1, cx: 100, cy: 90, r: 24, capacity: 2, label: "Table 1 (2 Guests)" },
    { id: 2, cx: 300, cy: 90, r: 24, capacity: 2, label: "Table 2 (2 Guests)" },
    { id: 3, cx: 100, cy: 210, r: 32, capacity: 4, label: "Table 3 (4 Guests - Garden View)" },
    { id: 4, cx: 300, cy: 210, r: 32, capacity: 4, label: "Table 4 (4 Guests - Hearthside)" },
    { id: 5, cx: 200, cy: 150, r: 40, capacity: 6, label: "Table 5 (6 Guests - Chef's Board)" },
    { id: 6, cx: 200, cy: 60, r: 20, capacity: 2, label: "Table 6 (Bar Alcove)" }
  ];

  const handleTableClick = (t) => {
    if (tableStatus[t.id] === 'reserved') return;
    setSelectedTable(t);
    setGuestCount(Math.min(t.capacity, guestCount));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedTable) return;
    
    // Simulate booking update
    setTableStatus(prev => ({
      ...prev,
      [selectedTable.id]: 'reserved'
    }));
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setSelectedTable(null);
    }, 4000);
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#D9A752]/20 shadow-xl text-[#F5F5F4] bg-[#1C1917]/95">
      {/* Table SVG Map Panel */}
      <div className="lg:col-span-7 bg-[#0C0A09] border border-stone-850 p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
        <div className="absolute top-3 left-4 text-[10px] font-bold text-stone-500 tracking-wider font-metrics">
          INTERACTIVE DINING ROOM MAP
        </div>
        
        {/* Drafting Grid Background */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(#D9A752 1px, transparent 1px)', 
          backgroundSize: '24px 24px',
          opacity: 0.05
        }}></div>

        <svg viewBox="0 0 400 300" className="w-full h-auto max-w-[380px] z-10 text-stone-300 mt-4">
          {/* Wall guides / Hearth overlay */}
          <path d="M 20 20 L 380 20 L 380 280 L 20 280 Z" fill="none" stroke="rgba(217, 167, 82, 0.15)" strokeWidth="1" />
          
          {/* Fireplace (Hearthside) */}
          <rect x="375" y="170" width="5" height="80" fill="#8C1D2A" opacity="0.8" />
          <text x="368" y="215" fill="#8C1D2A" fontSize="7" fontWeight="bold" textAnchor="middle" transform="rotate(-90 368 215)">HEARTH</text>

          {/* Bar Counter (Top) */}
          <rect x="120" y="15" width="160" height="15" fill="#1C1917" stroke="rgba(217, 167, 82, 0.25)" strokeWidth="1" />
          <text x="200" y="25" fill="#D9A752" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="1">BAR ALCOVE</text>

          {/* Render Tables */}
          {tables.map(t => {
            const status = tableStatus[t.id];
            const isSelected = selectedTable?.id === t.id;
            
            // Color configuration
            let fillColor = "rgba(41, 37, 36, 0.4)";
            let strokeColor = "rgba(217, 167, 82, 0.3)";
            
            if (status === 'reserved') {
              fillColor = "rgba(140, 29, 42, 0.25)";
              strokeColor = "#8C1D2A";
            } else if (isSelected) {
              fillColor = "rgba(217, 167, 82, 0.15)";
              strokeColor = "#D9A752";
            }

            return (
              <g 
                key={t.id} 
                onClick={() => handleTableClick(t)} 
                className={`cursor-pointer transition-all duration-300 group`}
              >
                {/* Visual seats representation */}
                {Array.from({ length: t.capacity }).map((_, sIdx) => {
                  const angle = (sIdx * 360) / t.capacity;
                  const seatRad = 5;
                  const dist = t.r + 6;
                  const sx = t.cx + dist * Math.cos((angle * Math.PI) / 180);
                  const sy = t.cy + dist * Math.sin((angle * Math.PI) / 180);

                  return (
                    <circle 
                      key={sIdx} 
                      cx={sx} 
                      cy={sy} 
                      r={seatRad} 
                      fill={status === 'reserved' ? '#8C1D2A' : isSelected ? '#D9A752' : '#292524'} 
                      stroke="rgba(217, 167, 82, 0.15)"
                      strokeWidth="0.5"
                    />
                  );
                })}

                {/* Main Table circle */}
                <circle 
                  cx={t.cx} 
                  cy={t.cy} 
                  r={t.r} 
                  fill={fillColor} 
                  stroke={strokeColor} 
                  strokeWidth={isSelected ? "2.5" : "1.5"}
                />
                
                {/* Table Label */}
                <text 
                  x={t.cx} 
                  y={t.cy + 3} 
                  fill={status === 'reserved' ? '#8C1D2A' : isSelected ? '#D9A752' : '#F5F5F4'} 
                  fontSize="7" 
                  fontWeight="extrabold" 
                  textAnchor="middle"
                >
                  T{t.id}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex gap-4 mt-2 text-[8px] uppercase font-bold text-stone-500 tracking-wider">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full border border-stone-700 bg-stone-900/50"></span> Available
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full border border-[#D9A752] bg-[#D9A752]/20"></span> Selected
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full border border-[#8C1D2A] bg-[#8C1D2A]/20"></span> Reserved
          </div>
        </div>
      </div>

      {/* Reservation Details & Form */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9A752]">Confidential Reservation</span>
          <h3 className="text-2xl font-extrabold text-[#F5F5F4] mt-1">Reserve a Table</h3>
          <p className="text-stone-400 text-xs mt-1">Select a table on the floor plan map to customize your seating placement.</p>
        </div>

        {booked ? (
          <div className="text-center p-8 bg-emerald-950/20 border border-emerald-800/40 rounded-2xl space-y-2 text-emerald-400">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-base font-bold">Booking Authenticated</h4>
            <p className="text-xs text-stone-400">Table {selectedTable.id} is locked for your tasting session on {date} at {time}.</p>
          </div>
        ) : selectedTable ? (
          <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs uppercase tracking-wider text-stone-300 font-semibold">
            {/* Table Details */}
            <div className="p-4 rounded-xl border border-stone-800 bg-[#0C0A09]/60 space-y-1">
              <span className="text-[8px] font-bold text-stone-500 block">Selected Placement</span>
              <p className="text-sm font-extrabold text-[#D9A752] font-serif italic normal-case">{selectedTable.label}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-stone-400">Date</label>
                <input 
                  type="date" required 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-stone-850 bg-stone-900 text-stone-200 outline-none focus:border-[#D9A752] text-xs transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-stone-400">Time</label>
                <input 
                  type="time" required 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-stone-850 bg-stone-900 text-stone-200 outline-none focus:border-[#D9A752] text-xs transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-stone-400">Guest Count</label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-stone-850 bg-stone-900 text-stone-200 outline-none focus:border-[#D9A752] text-xs transition-colors"
              >
                {Array.from({ length: selectedTable.capacity }).map((_, idx) => (
                  <option key={idx+1} value={idx+1}>{idx+1} {idx+1 > 1 ? 'Guests' : 'Guest'}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-brand text-zinc-950 hover:bg-[#D9A752] font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] border-none"
            >
              Lock Table {selectedTable.id} <Check className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="text-center p-8 border border-dashed border-stone-800 rounded-2xl text-stone-500">
            <Users className="w-8 h-8 mx-auto text-stone-700 animate-pulse-subtle" />
            <p className="text-xs mt-3">Select a table on the visual map to start the reservation workflow.</p>
          </div>
        )}
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
     RENDER C: Scale Bistro (Restaurant Theme)
     ========================================== */
  if (siteMode === 'restaurant') {
    return (
      <div className="min-h-screen bg-[#0C0A09] text-[#F5F5F4] font-sans transition-colors duration-500 overflow-x-hidden pt-6">
        {/* HERO SECTION */}
        <section id="home" className="relative pt-12 pb-24 md:py-32 px-6 flex items-center justify-center min-h-[85vh]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-stone-800 text-[#D9A752] text-xs font-bold uppercase tracking-widest">
                <Utensils className="w-3.5 h-3.5 text-[#D9A752]" /> Scale Bistro
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-display">
                Choreographing Flavor <br />
                <span className="text-[#D9A752] font-serif font-light italic">& Elegance.</span>
              </h1>
              
              <p className="text-stone-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                A Michelin-starred culinary journey combining modern gastronomy, rare historical vintages, and a refined architectural dining room.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="#reserve" 
                  className="px-6 py-3.5 rounded-xl bg-gradient-brand text-zinc-950 font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98]"
                >
                  Reserve Table <Calendar className="w-4 h-4" />
                </a>
                <a 
                  href="#tasting" 
                  className="px-6 py-3.5 rounded-xl border border-stone-800 hover:border-[#D9A752] font-bold text-sm text-stone-300 hover:text-[#D9A752] transition-all flex items-center justify-center gap-2 cursor-pointer bg-[#1C1917]/50"
                >
                  Configure Tasting Menu
                </a>
              </div>
            </div>

            {/* Right Showcase Image */}
            <div className="lg:col-span-5 relative flex justify-center items-center font-serif">
              <div className="w-72 h-72 rounded-full bg-[#8C1D2A]/10 absolute -top-8 filter blur-3xl"></div>
              
              <div className="w-full max-w-[420px] relative animate-float">
                <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-[#1C1917] p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1544025162-d76694265947" 
                    alt="Scale Bistro Gourmet Dish" 
                    className="w-full h-auto object-cover rounded-xl"
                  />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass border border-[#D9A752]/20 shadow-md">
                    <p className="text-[10px] uppercase font-bold text-[#D9A752] tracking-widest font-sans">Seasonal Selection</p>
                    <p className="font-display font-extrabold text-sm text-white mt-0.5 italic">Seared Scallops with Autumn Truffle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED MENU GRID */}
        <section id="menu" className="py-24 px-6 border-t border-stone-900 bg-[#12100E]">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Signature Offerings</h2>
              <p className="text-stone-400 max-w-xl mx-auto text-sm sm:text-base">
                A selection of modern gastronomic compositions reflecting seasonal botanicals and pristine organic farming.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "A5 Miyazaki Wagyu",
                  price: "₹8,500",
                  img: "https://images.unsplash.com/photo-1544025162-d76694265947",
                  desc: "Dry-aged Wagyu ribeye cooked over charcoal, bone marrow reduction, caramelized sunchokes, and truffle velvet."
                },
                {
                  title: "Wild Hamachi Crudo",
                  price: "₹3,400",
                  img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
                  desc: "Citrus-cured yellowtail crudo, sea fennel, pickled sea grape, cold-pressed avocado oil, and white shoyu yuzu nectar."
                },
                {
                  title: "Truffled Forest Tartlet",
                  price: "₹2,900",
                  img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
                  desc: "Caramelized wild mushrooms in puff pastry shell, roasted baby sunchokes, watercress foam, and hazelnut crumb."
                }
              ].map((menuItem, idx) => (
                <div key={idx} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-stone-850 shadow-md bg-[#1C1917]/30 hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <div className="h-48 overflow-hidden relative">
                      <img src={menuItem.img} alt={menuItem.title} className="w-full h-full object-cover hover:scale-105 transition-all duration-500" />
                      <div className="absolute top-4 right-4 bg-zinc-950/90 text-[#D9A752] text-xs font-bold px-3 py-1 rounded-md">
                        {menuItem.price}
                      </div>
                    </div>
                    <div className="p-6 space-y-2">
                      <h3 className="text-lg font-bold text-white">{menuItem.title}</h3>
                      <p className="text-stone-400 text-xs leading-relaxed">{menuItem.desc}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <span className="text-xs font-bold text-[#D9A752] hover:text-white cursor-pointer flex items-center gap-1">
                      Explore Wine Pairing &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TASTING SANDBOX SECTION */}
        <section id="tasting" className="py-24 px-6 border-t border-stone-900">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Culinary Builder</h2>
              <p className="text-stone-400 max-w-xl mx-auto text-sm sm:text-base">
                Use our interactive menu sandbox to plan your course progression and somatic pairings.
              </p>
            </div>
            
            <CulinarySandbox />
          </div>
        </section>

        {/* RESERVATIONS TABLE PLANNER */}
        <section id="reserve" className="py-24 px-6 border-t border-stone-900 bg-[#12100E]">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Dining Reservations</h2>
              <p className="text-stone-400 max-w-xl mx-auto text-sm sm:text-base">
                Interact with our physical floor plan layout to choose your preferred dining room location.
              </p>
            </div>
            
            <InteractiveTablePlanner />
          </div>
        </section>

        {/* BRAND VALUES / PHILOSOPHY */}
        <section id="philosophy" className="py-24 px-6 border-t border-stone-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9A752]">Culinary Philosophy</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Precision on the Palette</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#8C1D2A]/10 border border-[#8C1D2A]/30 flex items-center justify-center text-[#D9A752] shrink-0">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">1. Gastronomic Minimalism</h4>
                      <p className="text-stone-400 text-xs mt-1 leading-relaxed">Highlighting 2 to 3 main seasonal ingredients in each plate, amplifying raw tastes without unnecessary clutter.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#8C1D2A]/10 border border-[#8C1D2A]/30 flex items-center justify-center text-[#D9A752] shrink-0">
                      <Wine className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">2. Cellar Curation</h4>
                      <p className="text-stone-400 text-xs mt-1 leading-relaxed">Pairing classic and ultra-rare vintage wines directly matching the molecular density of the course compositions.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#8C1D2A]/10 border border-[#8C1D2A]/30 flex items-center justify-center text-[#D9A752] shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">3. Integrity of Origin</h4>
                      <p className="text-stone-400 text-xs mt-1 leading-relaxed">Sourcing exclusively from biodynamic local farms and clean oceans with zero additives and full supply transparency.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editorial block quote */}
              <div className="p-8 md:p-12 bg-[#1C1917] text-[#F5F5F4] border border-stone-850 rounded-3xl relative flex flex-col justify-between h-[360px] shadow-lg">
                <Quote className="w-12 h-12 text-[#D9A752] opacity-60 absolute top-8 left-8" />
                <div className="mt-12 relative z-10">
                  <p className="text-xl sm:text-2xl font-display font-light italic leading-relaxed text-stone-250">
                    "Scale Bistro elevates simple ingredients into culinary poetry. Every plate challenges and delights the senses with geometric precision."
                  </p>
                </div>
                <div className="border-t border-stone-800 pt-6 mt-6 flex justify-between items-center">
                  <div>
                    <p className="font-extrabold text-sm text-[#D9A752]">Marc Veyrat</p>
                    <p className="text-stone-500 text-[10px] uppercase font-bold tracking-wider">Michelin Guide Inspector</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

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
              
              <p className="text-zinc-650 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
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
                  className="px-6 py-3.5 rounded-xl border border-zinc-350 hover:border-zinc-800 font-bold text-sm text-zinc-705 hover:text-zinc-900 transition-all flex items-center justify-center gap-2 cursor-pointer bg-white/50"
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
                    <p className="text-[10px] uppercase font-bold text-[#C2A478] tracking-widest font-sans">Featured Concept</p>
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
                      <p className="text-zinc-605 text-xs mt-1 leading-relaxed">Stripping away the superfluous to amplify structure, natural material authenticity, and light paths.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900/10 border border-zinc-300 flex items-center justify-center text-zinc-900 shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-zinc-900">2. Innovation</h4>
                      <p className="text-zinc-655 text-xs mt-1 leading-relaxed">Using advanced structural calculations and ecological designs to build homes that are thermally sound and carbon efficient.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900/10 border border-zinc-300 flex items-center justify-center text-zinc-900 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-zinc-900">3. Reliability</h4>
                      <p className="text-zinc-655 text-xs mt-1 leading-relaxed">Providing absolute architectural project oversight, material engineering safety, and structural longevity that spans centuries.</p>
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
