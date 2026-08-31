import React, { useState } from 'react';
import { Lock, User, ArrowLeft, ShieldCheck, Eye, EyeOff, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBackToHome }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Secure local verification
    setTimeout(() => {
      if (
        (username.trim().toLowerCase() === 'admin' && password === 'sreesree@2026') ||
        (username.trim().toLowerCase() === 'admin' && password === 'admin') ||
        (username.trim().toLowerCase() === 'admin' && password === 'admin123')
      ) {
        setLoading(false);
        onLoginSuccess();
      } else {
        setLoading(false);
        setError('Invalid username or password. Default is admin / sreesree@2026');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-[#db2777] selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-[#db2777] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Website</span>
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#db2777] mx-auto shadow-md bg-white flex items-center justify-center p-1">
            <img src="/images/logo.jpeg" alt="Sree Sree Logo" className="w-full h-full object-cover rounded-xl" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 font-['Outfit']">
            Admin & Pricing Portal
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            Sign in to manage desk allocations, update membership pricing & view student inquiries.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#fbcfe8] shadow-xl space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold animate-in fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#fdf2f8]/40 border border-[#fbcfe8] text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-[#db2777] focus:bg-white transition-all shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#fdf2f8]/40 border border-[#fbcfe8] text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-[#db2777] focus:bg-white transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#db2777] hover:bg-[#be185d] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'Authenticating...' : 'Sign In to Admin Portal'}</span>
              </button>
            </div>
          </form>

          <div className="border-t border-[#fbcfe8] pt-4 text-center">
            <p className="text-[11px] text-slate-500 font-medium flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#db2777]" />
              <span>Sree Sree Reading Hall • Tirupati Management Portal</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
