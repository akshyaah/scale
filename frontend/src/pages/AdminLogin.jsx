import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogin } from '../utils/api';
import { Shield, Lock, Mail, AlertCircle, Rocket } from 'lucide-react';

export default function AdminLogin({ isAuthenticated, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const data = await authLogin(email, password);
      // Save token
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.admin));
      onLoginSuccess(data.admin);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Invalid administrator credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-transparent">
      {/* Left split screen illustration */}
      <div className="hidden lg:flex lg:col-span-6 bg-[#080d19] border-r border-dark-700/40 relative flex-col justify-center items-center p-12 text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="w-80 h-80 rounded-full bg-brand-500/10 absolute top-12 left-12 filter blur-3xl animate-pulse-subtle"></div>
        <div className="w-80 h-80 rounded-full bg-emerald-500/5 absolute bottom-12 right-12 filter blur-3xl"></div>

        <div className="max-w-md space-y-6 relative z-10 animate-float">
          <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center text-white mx-auto shadow-xl">
            <Rocket className="w-7 h-7 rotate-45" />
          </div>
          <h2 className="text-3xl font-extrabold text-white leading-tight">VenturePilot AI</h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
            Access the secure operational advisor console to add startup opportunities, edit global market indices, and supervise generated query logs.
          </p>
        </div>
      </div>

      {/* Right split screen login form */}
      <div className="lg:col-span-6 flex flex-col justify-center items-center p-6 relative z-10">
        <div className="w-full max-w-sm glass border border-slate-700/60 p-8 rounded-2xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 mx-auto">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Admin Sign In</h3>
            <p className="text-xs text-slate-400">Provide credentials to enter the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-550" />
                <input
                  type="email"
                  placeholder="admin@venturepilot.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input pl-10 pr-4 py-2.5 text-xs"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-550" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass-input pl-10 pr-4 py-2.5 text-xs"
                  required
                />
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-transparent"
                />
                <span>Remember Me</span>
              </label>
            </div>

            {/* Error box */}
            {error && (
              <div className="p-3 bg-error/10 border border-error/20 text-error rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 font-bold text-sm bg-gradient-brand text-white rounded-xl shadow-lg shadow-indigo-500/15 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
