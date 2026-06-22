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
function MainLayoutWrapper({ children, isAuthenticated, admin, handleLogout }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-dark-900 text-slate-100 font-sans bg-gradient-mesh">
      
      {/* Navigation Bar */}
      <nav className="glass fixed top-0 w-full z-50 border-b border-dark-700/55">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
            <div className="w-9 h-9 rounded-lg bg-gradient-brand flex items-center justify-center text-white shadow-md rotate-45">
              <Rocket className="w-5 h-5" />
            </div>
            <span className="font-display">Scale <span className="text-brand-400">AI</span></span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Link to="/opportunities" className="hover:text-brand-400 transition-colors">Opportunities</Link>
            <Link to="/analyzer" className="hover:text-brand-400 transition-colors">Idea Analyzer</Link>
            <Link to="/planner" className="hover:text-brand-400 transition-colors">Financial Planner</Link>
            <Link to="/optimizer" className="hover:text-brand-400 transition-colors">Resource Optimizer</Link>
            <Link to="/insights" className="hover:text-brand-400 transition-colors">Market Insights</Link>
            
            {isAuthenticated && (
              <span className="h-4 w-[1px] bg-dark-700"></span>
            )}

            {isAuthenticated && (
              <>
                <Link to="/admin/dashboard" className="hover:text-brand-400 transition-colors flex items-center gap-1">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Link>
              </>
            )}
          </div>

          {/* Right side controls */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-400 font-bold bg-dark-800 border border-dark-700 px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Pilot: <span className="text-white font-extrabold">{admin?.name}</span>
                </span>
                <button 
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 rounded-lg border border-dark-700 hover:border-rose-500/35 hover:bg-rose-500/10 text-slate-400 hover:text-rose-450 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                to="/admin/login" 
                className="px-4 py-2 rounded-lg border border-dark-700 hover:border-slate-600 text-slate-400 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                Co-Founder Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => window.toggleMobileMenu()}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
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
        <footer className="bg-dark-950 border-t border-dark-700/60 py-12 px-6 shrink-0 z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-display text-sm font-bold tracking-tight">
              <div className="w-6 h-6 rounded bg-brand-500 flex items-center justify-center text-white text-[10px] rotate-45"><Rocket className="w-3.5 h-3.5" /></div>
              <span>Scale AI</span>
            </div>
            <div className="flex items-center gap-6 text-slate-400 text-xs font-medium">
              <span>&copy; {new Date().getFullYear()} Scale AI. All rights reserved.</span>
              <Link to="/admin/login" className="hover:text-slate-200 transition-colors">Admin Portal</Link>
            </div>
          </div>
        </footer>
      )}

      {/* Floating chatbot on public pages */}
      {!isAdminRoute && <CoFounderChat />}
    </div>
  );
}

export default function App() {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

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
      <MainLayoutWrapper isAuthenticated={isAuthenticated} admin={admin} handleLogout={handleLogout}>
        
        {/* Mobile menu modal */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] bg-dark-950/95 flex flex-col p-6 animate-fade-in lg:hidden">
            <div className="flex items-center justify-between mb-8">
              <span className="font-display font-bold text-lg">Scale<span className="text-brand-400"> AI</span></span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-5 text-base font-semibold uppercase tracking-wider text-slate-300">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Home</Link>
              <Link to="/opportunities" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Opportunities</Link>
              <Link to="/analyzer" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Idea Analyzer</Link>
              <Link to="/planner" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Financial Planner</Link>
              <Link to="/optimizer" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Resource Optimizer</Link>
              <Link to="/insights" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Market Insights</Link>
              
              <hr className="border-dark-700/60 my-2" />

              {isAuthenticated ? (
                <>
                  <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Admin Dashboard</Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="py-2.5 px-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-center font-bold transition-all text-xs flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link 
                  to="/admin/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-4 rounded-lg border border-dark-700 hover:border-slate-600 text-slate-300 text-center font-bold transition-all text-xs flex items-center justify-center gap-1.5"
                >
                  <Shield className="w-4 h-4" />
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        )}

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
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
