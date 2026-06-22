import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Rocket, LogOut, LayoutDashboard, ListFilter, Cpu, BarChart3, TrendingUp, Settings2, Users } from 'lucide-react';
import { authMe, authLogout } from './utils/api';

// Public Pages
import Home from './pages/Home';
import OpportunityExplorer from './pages/OpportunityExplorer';
import StartupAnalyzer from './pages/StartupAnalyzer';
import FinancialPlanner from './pages/FinancialPlanner';
import ResourceOptimizer from './pages/ResourceOptimizer';
import MarketInsights from './pages/MarketInsights';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminOpportunityManage from './pages/AdminOpportunityManage';
import AdminTrendManage from './pages/AdminTrendManage';
import AdminFundingManage from './pages/AdminFundingManage';

// Components
import CoFounderChat from './components/CoFounderChat';

// Protected Route Wrapper
function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

// Wrapper to conditionally render the chatbot on non-admin routes
function MainLayoutWrapper({ children, isAuthenticated, admin, handleLogout, siteMode, handleModeChange }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={`flex flex-col min-h-screen bg-dark-900 text-slate-100 font-sans bg-gradient-mesh transition-colors duration-500 ${siteMode === 'architecture' ? 'theme-architecture text-zinc-900' : siteMode === 'restaurant' ? 'theme-restaurant text-[#F5F5F4]' : ''}`}>
      
      {/* Navigation Bar */}
      <nav className="glass fixed top-0 w-full z-50 border-b border-dark-700/55">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-md transition-all duration-500 ${siteMode === 'architecture' ? 'bg-zinc-900 rotate-0' : siteMode === 'restaurant' ? 'bg-[#8C1D2A] rotate-90' : 'bg-gradient-brand rotate-45'}`}>
              {siteMode === 'architecture' ? (
                <span className="font-metrics font-extrabold text-sm text-[#C2A478]">S</span>
              ) : siteMode === 'restaurant' ? (
                <span className="font-serif font-bold text-sm text-[#D9A752]">B</span>
              ) : (
                <Rocket className="w-5 h-5" />
              )}
            </div>
            <span className={`font-display tracking-tight transition-colors duration-305 ${siteMode === 'architecture' ? 'text-zinc-900' : siteMode === 'restaurant' ? 'text-[#F5F5F4]' : 'text-white'}`}>
              SCALE <span className={siteMode === 'architecture' ? 'text-amber-800 font-light' : siteMode === 'restaurant' ? 'text-[#D9A752] font-serif font-light italic' : 'text-brand-400 font-extrabold'}>{siteMode === 'architecture' ? 'STUDIO' : siteMode === 'restaurant' ? 'BISTRO' : 'AI'}</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
            {siteMode === 'architecture' ? (
              <>
                <a href="#projects" className="text-zinc-700 hover:text-amber-805 transition-colors font-medium">Projects</a>
                <a href="#configurator" className="text-zinc-700 hover:text-amber-805 transition-colors font-medium">Blueprint Studio</a>
                <a href="#philosophy" className="text-zinc-700 hover:text-amber-805 transition-colors font-medium">Philosophy</a>
                <a href="#contact" className="text-zinc-700 hover:text-amber-805 transition-colors font-medium">Inquire</a>
              </>
            ) : siteMode === 'restaurant' ? (
              <>
                <a href="#menu" className="text-stone-300 hover:text-[#D9A752] transition-colors font-medium">Menu</a>
                <a href="#tasting" className="text-stone-300 hover:text-[#D9A752] transition-colors font-medium">Tasting Sandbox</a>
                <a href="#reserve" className="text-stone-300 hover:text-[#D9A752] transition-colors font-medium">Reservations</a>
                <a href="#philosophy" className="text-stone-300 hover:text-[#D9A752] transition-colors font-medium">Philosophy</a>
              </>
            ) : (
              <>
                <Link to="/opportunities" className="text-slate-300 hover:text-brand-400 transition-colors">Opportunities</Link>
                <Link to="/analyzer" className="text-slate-300 hover:text-brand-400 transition-colors">Idea Analyzer</Link>
                <Link to="/planner" className="text-slate-300 hover:text-brand-400 transition-colors">Financial Planner</Link>
                <Link to="/optimizer" className="text-slate-300 hover:text-brand-400 transition-colors">Resource Optimizer</Link>
                <Link to="/insights" className="text-slate-300 hover:text-brand-400 transition-colors">Market Insights</Link>
              </>
            )}
            
            {isAuthenticated && (
              <span className="h-4 w-[1px] bg-dark-700"></span>
            )}

            {isAuthenticated && (
              <>
                <Link to="/admin/dashboard" className={`transition-colors flex items-center gap-1 ${siteMode === 'architecture' ? 'text-zinc-700 hover:text-zinc-955' : siteMode === 'restaurant' ? 'text-stone-300 hover:text-[#D9A752]' : 'text-slate-300 hover:text-brand-400'}`}>
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Link>
              </>
            )}
          </div>

          {/* Right side controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Mode Switcher */}
            <div className={`flex p-0.5 rounded-full border transition-all duration-300 ${siteMode === 'architecture' ? 'bg-zinc-200 border-zinc-350' : siteMode === 'restaurant' ? 'bg-stone-900 border-stone-800' : 'bg-dark-955/60 border-dark-700/50'}`}>
              <button
                onClick={() => handleModeChange('startup')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  siteMode === 'startup' 
                    ? 'bg-gradient-brand text-white shadow-sm' 
                    : siteMode === 'restaurant' ? 'text-stone-500 hover:text-stone-300' : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Scale AI
              </button>
              <button
                onClick={() => handleModeChange('architecture')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  siteMode === 'architecture' 
                    ? 'bg-zinc-900 text-white shadow-sm' 
                    : siteMode === 'restaurant' ? 'text-stone-500 hover:text-stone-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Scale Studio
              </button>
              <button
                onClick={() => handleModeChange('restaurant')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  siteMode === 'restaurant' 
                    ? 'bg-[#D9A752] text-zinc-950 shadow-sm' 
                    : siteMode === 'architecture' ? 'text-zinc-500 hover:text-zinc-800' : 'text-slate-400 hover:text-white'
                }`}
              >
                Scale Bistro
              </button>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border ${siteMode === 'architecture' ? 'text-zinc-800 bg-zinc-200/80 border-zinc-300' : siteMode === 'restaurant' ? 'text-stone-350 bg-stone-900 border-stone-800' : 'text-slate-400 bg-dark-800 border-dark-700'}`}>
                  Pilot: <span className="font-extrabold">{admin?.name}</span>
                </span>
                <button 
                  onClick={handleLogout}
                  className={`px-3.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${siteMode === 'architecture' ? 'border-zinc-300 hover:border-rose-600/40 hover:bg-rose-50/50 text-zinc-600 hover:text-rose-700' : siteMode === 'restaurant' ? 'border-stone-800 hover:border-rose-600/40 hover:bg-rose-950/20 text-stone-350' : 'border-dark-700 hover:border-rose-500/35 hover:bg-rose-500/10 text-slate-400 hover:text-rose-455'}`}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                to="/admin/login" 
                className={`px-4 py-2 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 ${siteMode === 'architecture' ? 'border-zinc-300 hover:border-zinc-900 text-zinc-700 hover:text-zinc-900' : siteMode === 'restaurant' ? 'border-stone-800 hover:border-[#D9A752] text-stone-300 hover:text-[#D9A752]' : 'border-dark-700 hover:border-slate-600 text-slate-400 hover:text-white'}`}
              >
                <Shield className="w-3.5 h-3.5" />
                Co-Founder Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => window.toggleMobileMenu()}
            className={`lg:hidden p-2 transition-colors ${siteMode === 'architecture' ? 'text-zinc-805 hover:text-zinc-950' : siteMode === 'restaurant' ? 'text-stone-300 hover:text-[#D9A752]' : 'text-slate-400 hover:text-white'}`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Content Area */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Footer */}
      {!isAdminRoute && (
        <footer className={`border-t py-12 px-6 shrink-0 z-10 transition-colors duration-500 ${siteMode === 'architecture' ? 'bg-zinc-100 border-zinc-200 text-zinc-800' : siteMode === 'restaurant' ? 'bg-[#12100E] border-stone-800 text-stone-300' : 'bg-dark-955 border-dark-700/60 text-slate-400'}`}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-display text-sm font-bold tracking-tight">
              <div className={`w-6 h-6 rounded flex items-center justify-center text-white text-[10px] ${siteMode === 'architecture' ? 'bg-zinc-900' : siteMode === 'restaurant' ? 'bg-[#8C1D2A]' : 'bg-brand-500 rotate-45'}`}>
                {siteMode === 'architecture' ? 'S' : siteMode === 'restaurant' ? 'B' : <Rocket className="w-3.5 h-3.5" />}
              </div>
              <span>SCALE {siteMode === 'architecture' ? 'STUDIO' : siteMode === 'restaurant' ? 'BISTRO' : 'AI'}</span>
            </div>
            <div className={`flex items-center gap-6 text-xs font-medium ${siteMode === 'architecture' ? 'text-zinc-500' : siteMode === 'restaurant' ? 'text-stone-500' : 'text-slate-450'}`}>
              <span>&copy; {new Date().getFullYear()} Scale {siteMode === 'architecture' ? 'Studio' : siteMode === 'restaurant' ? 'Bistro' : 'AI'}. All rights reserved.</span>
              <Link to="/admin/login" className="hover:text-slate-200 transition-colors">Admin Portal</Link>
            </div>
          </div>
        </footer>
      )}

      {/* Floating chatbot on public pages */}
      {!isAdminRoute && siteMode !== 'architecture' && siteMode !== 'restaurant' && <CoFounderChat />}
    </div>
  );
}

export default function App() {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [siteMode, setSiteMode] = useState('startup');

  const handleModeChange = (mode) => {
    setSiteMode(mode);
  };

  useEffect(() => {
    // Check if token exists and verify with backend
    async function checkSession() {
      const storedToken = localStorage.getItem('adminToken');
      if (storedToken) {
        try {
          const adminUser = await authMe();
          setAdmin(adminUser);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Session expired or invalid:', err);
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          setAdmin(null);
          setIsAuthenticated(false);
        }
      }
      setCheckingAuth(false);
    }
    checkSession();

    // Register mobile menu helper
    window.toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  }, []);

  const handleLoginSuccess = (adminUser) => {
    setAdmin(adminUser);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await authLogout();
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdmin(null);
    setIsAuthenticated(false);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand-500/20 border-t-brand-500 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <Router basename="/scale">
      <MainLayoutWrapper 
        isAuthenticated={isAuthenticated} 
        admin={admin} 
        handleLogout={handleLogout}
        siteMode={siteMode}
        handleModeChange={handleModeChange}
      >
        
          <div className={`fixed inset-0 z-[100] flex flex-col p-6 animate-fade-in lg:hidden ${siteMode === 'architecture' ? 'bg-zinc-50/98 text-zinc-900' : siteMode === 'restaurant' ? 'bg-stone-950/98 text-[#F5F5F4]' : 'bg-dark-955/95 text-slate-100'}`}>
            <div className="flex items-center justify-between mb-8">
              <span className="font-display font-bold text-lg">
                SCALE <span className={siteMode === 'architecture' ? 'text-amber-800 font-light' : siteMode === 'restaurant' ? 'text-[#D9A752] font-serif font-light italic' : 'text-brand-400 font-extrabold'}>{siteMode === 'architecture' ? 'STUDIO' : siteMode === 'restaurant' ? 'BISTRO' : 'AI'}</span>
              </span>
              <button onClick={() => setMobileMenuOpen(false)} className={`p-2 transition-colors ${siteMode === 'architecture' ? 'text-zinc-655 hover:text-zinc-900' : siteMode === 'restaurant' ? 'text-stone-400 hover:text-white' : 'text-slate-400 hover:text-white'}`}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Mode Switcher */}
            <div className={`flex p-0.5 rounded-full border mb-6 transition-all duration-350 ${siteMode === 'architecture' ? 'bg-zinc-200 border-zinc-300' : siteMode === 'restaurant' ? 'bg-stone-900 border-stone-800' : 'bg-dark-950/60 border-dark-700/50'}`}>
              <button
                onClick={() => {
                  handleModeChange('startup');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-center transition-all duration-300 ${
                  siteMode === 'startup' 
                    ? 'bg-gradient-brand text-white shadow-sm' 
                    : siteMode === 'restaurant' ? 'text-stone-500 hover:text-stone-300' : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Scale AI
              </button>
              <button
                onClick={() => {
                  handleModeChange('architecture');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-center transition-all duration-300 ${
                  siteMode === 'architecture' 
                    ? 'bg-zinc-900 text-white shadow-sm' 
                    : siteMode === 'restaurant' ? 'text-stone-500 hover:text-stone-300' : 'text-slate-450 hover:text-white'
                }`}
              >
                Scale Studio
              </button>
              <button
                onClick={() => {
                  handleModeChange('restaurant');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-center transition-all duration-300 ${
                  siteMode === 'restaurant' 
                    ? 'bg-[#D9A752] text-zinc-950 shadow-sm' 
                    : siteMode === 'architecture' ? 'text-zinc-500 hover:text-zinc-800' : 'text-slate-450 hover:text-white'
                }`}
              >
                Scale Bistro
              </button>
            </div>

            <div className="flex flex-col gap-5 text-base font-semibold uppercase tracking-wider text-slate-350">
              {siteMode === 'architecture' ? (
                <>
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-zinc-805 hover:text-amber-805 transition-colors">Home</Link>
                  <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-zinc-805 hover:text-amber-805 transition-colors">Projects</a>
                  <a href="#configurator" onClick={() => setMobileMenuOpen(false)} className="text-zinc-805 hover:text-amber-805 transition-colors">Blueprint Studio</a>
                  <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="text-zinc-805 hover:text-amber-805 transition-colors">Philosophy</a>
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-zinc-805 hover:text-amber-805 transition-colors">Inquire</a>
                </>
              ) : siteMode === 'restaurant' ? (
                <>
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-stone-300 hover:text-[#D9A752] transition-colors">Home</Link>
                  <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="text-stone-300 hover:text-[#D9A752] transition-colors">Menu</a>
                  <a href="#tasting" onClick={() => setMobileMenuOpen(false)} className="text-stone-300 hover:text-[#D9A752] transition-colors">Tasting Sandbox</a>
                  <a href="#reserve" onClick={() => setMobileMenuOpen(false)} className="text-stone-300 hover:text-[#D9A752] transition-colors">Reservations</a>
                </>
              ) : (
                <>
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Home</Link>
                  <Link to="/opportunities" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Opportunities</Link>
                  <Link to="/analyzer" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Idea Analyzer</Link>
                  <Link to="/planner" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Financial Planner</Link>
                  <Link to="/optimizer" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Resource Optimizer</Link>
                  <Link to="/insights" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Market Insights</Link>
                </>
              )}
              
              <hr className={`my-2 ${siteMode === 'architecture' ? 'border-zinc-300' : siteMode === 'restaurant' ? 'border-stone-800' : 'border-dark-700/60'}`} />

              {isAuthenticated ? (
                <>
                  <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className={`hover:text-white transition-colors ${siteMode === 'architecture' ? 'text-zinc-800' : ''}`}>Admin Dashboard</Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2.5 px-4 rounded-lg text-center font-bold transition-all text-xs flex items-center justify-center gap-1.5 ${siteMode === 'architecture' ? 'bg-rose-50 border border-rose-300 text-rose-700 hover:bg-rose-100' : siteMode === 'restaurant' ? 'bg-rose-950/20 border border-rose-900/50 text-rose-400' : 'bg-rose-500/10 border border-rose-500/30 text-rose-450'}`}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link 
                  to="/admin/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2.5 px-4 rounded-lg border text-center font-bold transition-all text-xs flex items-center justify-center gap-1.5 ${siteMode === 'architecture' ? 'border-zinc-350 text-zinc-700' : siteMode === 'restaurant' ? 'border-stone-800 text-stone-300' : 'border-dark-700 hover:border-slate-600 text-slate-355'}`}
                >
                  <Shield className="w-4 h-4" />
                  Admin Login
                </Link>
              )}
            </div>
          </div>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home siteMode={siteMode} />} />
          <Route path="/opportunities" element={<OpportunityExplorer />} />
          <Route path="/analyzer" element={<StartupAnalyzer />} />
          <Route path="/planner" element={<FinancialPlanner />} />
          <Route path="/optimizer" element={<ResourceOptimizer />} />
          <Route path="/insights" element={<MarketInsights />} />

          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin isAuthenticated={isAuthenticated} onLoginSuccess={handleLoginSuccess} />} />
          
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminDashboard admin={admin} />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin/opportunities" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminOpportunityManage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin/trends" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminTrendManage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin/funding" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminFundingManage />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayoutWrapper>
    </Router>
  );
}
