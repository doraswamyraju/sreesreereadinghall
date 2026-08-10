import React, { useState } from 'react';
import { BlogPost, Seat, PricingPlan, SeatStatus } from '../types';
import { LayoutDashboard, Users, BookOpen, PenTool, Trash2, Tag, Save, Plus, DollarSign } from 'lucide-react';

interface DashboardPreviewProps {
  seats: Seat[];
  onUpdateSeats: (seats: Seat[]) => void;
  plans: PricingPlan[];
  onUpdatePlans: (plans: PricingPlan[]) => void;
  blogs: BlogPost[];
  onUpdateBlogs: (blogs: BlogPost[]) => void;
  onClose: () => void;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  seats,
  onUpdateSeats,
  plans,
  onUpdatePlans,
  blogs,
  onUpdateBlogs,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pricing' | 'seats' | 'blogs' | 'inquiries'>('pricing');
  const [editablePlans, setEditablePlans] = useState<PricingPlan[]>(plans);

  // New Blog form state
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState<'Study Tips' | 'Exam Prep' | 'Productivity'>('Study Tips');
  const [newBlogExcerpt, setNewBlogExcerpt] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');

  const handlePriceChange = (planId: string, field: 'priceMonthly' | 'priceDaily', value: number) => {
    setEditablePlans(prev => prev.map(p => p.id === planId ? { ...p, [field]: value } : p));
  };

  const handleSavePricing = () => {
    onUpdatePlans(editablePlans);
    alert('Pricing Plans successfully updated! Changes are now reflected live on the website.');
  };

  const toggleSeatStatus = (seatId: string) => {
    const updated = seats.map(s => {
      if (s.id === seatId) {
        const nextStatus: SeatStatus = s.status === 'available' ? 'occupied' : s.status === 'occupied' ? 'reserved' : 'available';
        return { ...s, status: nextStatus };
      }
      return s;
    });
    onUpdateSeats(updated);
  };

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogContent) return;

    const created: BlogPost = {
      id: `b_${Date.now()}`,
      title: newBlogTitle,
      slug: newBlogTitle.toLowerCase().replace(/ /g, '-'),
      category: newBlogCategory,
      excerpt: newBlogExcerpt || newBlogContent.slice(0, 100) + '...',
      content: newBlogContent,
      author: 'Admin (Sree Sree Services)',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      readTime: '3 min read',
      image: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.45.jpeg',
      tags: ['Tirupati', newBlogCategory]
    };

    onUpdateBlogs([created, ...blogs]);
    setNewBlogTitle('');
    setNewBlogExcerpt('');
    setNewBlogContent('');
    alert('New Blog Post Created & Published!');
  };

  const handleDeleteBlog = (blogId: string) => {
    onUpdateBlogs(blogs.filter(b => b.id !== blogId));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col overflow-hidden animate-in fade-in">
      
      {/* Top Admin Navigation Header */}
      <div className="bg-slate-950 border-b border-rose-500/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white font-['Outfit'] flex items-center">
              Sree Sree Admin Portal
              <span className="ml-2 text-[10px] bg-gradient-to-r from-rose-600 to-amber-500 text-white px-2 py-0.5 rounded-full font-bold">
                LIVE DASHBOARD & PRICING
              </span>
            </h2>
            <p className="text-xs text-slate-400">Define Pricing Plans, Manage Seats, Publish Blogs & Sync Database</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-bold hover:brightness-110 transition-all"
        >
          Exit Dashboard Preview
        </button>
      </div>

      {/* Main Admin Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Nav */}
        <aside className="w-64 bg-slate-900 border-r border-rose-900/40 p-4 space-y-2 shrink-0 hidden md:block">
          {[
            { id: 'pricing', label: 'Pricing Manager (Backend)', icon: <Tag className="w-4 h-4" /> },
            { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'seats', label: 'Seat Allocations (48)', icon: <Users className="w-4 h-4" /> },
            { id: 'blogs', label: 'Blog Manager', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'inquiries', label: 'Lead Inquiries', icon: <PenTool className="w-4 h-4" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-md shadow-rose-600/20'
                  : 'text-slate-300 hover:bg-rose-950/40 hover:text-rose-300'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <div className="mt-8 p-4 bg-rose-950/40 border border-rose-500/20 rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-rose-300">PHP & MySQL REST API Configured</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Persist your pricing edits directly to MySQL via <code className="text-amber-300 font-mono">backend/api/pricing.php</code>.
            </p>
          </div>
        </aside>

        {/* Tab Content Area */}
        <main className="flex-1 bg-slate-950 p-6 overflow-y-auto">
          
          {/* Tab 1: Pricing Manager (Backend Price Definition) */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-rose-900/40 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-['Outfit'] flex items-center">
                    <Tag className="w-5 h-5 text-rose-400 mr-2" />
                    Define Membership & Seat Pricing Rates
                  </h3>
                  <p className="text-xs text-slate-400">Set custom monthly and daily fees for AC Prime, AC Standard, and Non-AC Economy bays.</p>
                </div>

                <button
                  onClick={handleSavePricing}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center space-x-2 hover:brightness-110"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Pricing Changes</span>
                </button>
              </div>

              {/* Pricing Edit Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {editablePlans.map((plan) => (
                  <div key={plan.id} className="glass-card p-6 rounded-3xl border border-rose-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-white font-['Outfit']">{plan.name}</h4>
                      <span className="text-[10px] bg-rose-500/20 text-rose-300 font-mono px-2 py-0.5 rounded-full border border-rose-500/30">
                        {plan.zoneType.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">Monthly Rate (₹ / Month)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">₹</span>
                          <input
                            type="number"
                            value={plan.priceMonthly}
                            onChange={(e) => handlePriceChange(plan.id, 'priceMonthly', Number(e.target.value))}
                            className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-rose-500/30 text-amber-400 font-bold text-sm focus:outline-none focus:border-rose-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">Daily Pass Rate (₹ / Day)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">₹</span>
                          <input
                            type="number"
                            value={plan.priceDaily}
                            onChange={(e) => handlePriceChange(plan.id, 'priceDaily', Number(e.target.value))}
                            className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-rose-500/30 text-white font-bold text-sm focus:outline-none focus:border-rose-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-400">
                      * Updating this plan will automatically update the interactive seat map and checkout calculator for all aspirants.
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Tab 2: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="glass-card p-5 rounded-2xl border-l-4 border-rose-500">
                  <p className="text-xs text-slate-400">Total Seats</p>
                  <p className="text-3xl font-black text-white font-['Outfit']">48</p>
                  <p className="text-[10px] text-rose-300 mt-1">32 AC, 16 Non-AC</p>
                </div>
                <div className="glass-card p-5 rounded-2xl border-l-4 border-blue-500">
                  <p className="text-xs text-slate-400">Occupied Desks</p>
                  <p className="text-3xl font-black text-white font-['Outfit']">
                    {seats.filter(s => s.status === 'occupied').length}
                  </p>
                  <p className="text-[10px] text-blue-400 mt-1">Active Aspirants</p>
                </div>
                <div className="glass-card p-5 rounded-2xl border-l-4 border-amber-500">
                  <p className="text-xs text-slate-400">Reserved Desks</p>
                  <p className="text-3xl font-black text-white font-['Outfit']">
                    {seats.filter(s => s.status === 'reserved').length}
                  </p>
                  <p className="text-[10px] text-amber-400 mt-1">Pending Onboarding</p>
                </div>
                <div className="glass-card p-5 rounded-2xl border-l-4 border-purple-500">
                  <p className="text-xs text-slate-400">Published Blogs</p>
                  <p className="text-3xl font-black text-white font-['Outfit']">{blogs.length}</p>
                  <p className="text-[10px] text-purple-400 mt-1">Knowledge Articles</p>
                </div>
              </div>

              <div className="glass-card p-6 rounded-3xl space-y-4">
                <h3 className="text-base font-bold text-white font-['Outfit']">Quick Seat Control Grid</h3>
                <p className="text-xs text-slate-400">Click any seat to toggle status (Available → Occupied → Reserved).</p>

                <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
                  {seats.map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => toggleSeatStatus(seat.id)}
                      className={`p-2 rounded-xl text-center text-xs font-mono font-bold transition-all border ${
                        seat.status === 'available'
                          ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                          : seat.status === 'occupied'
                          ? 'bg-slate-800 border-slate-700 text-slate-400'
                          : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                      }`}
                    >
                      {seat.seatNumber}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Seats Control */}
          {activeTab === 'seats' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-['Outfit']">Seat Management Table</h3>
              <div className="glass-card rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Desk #</th>
                      <th className="p-3">Zone</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Monthly Price</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-900/40">
                    {seats.map((s) => (
                      <tr key={s.id} className="hover:bg-rose-950/20">
                        <td className="p-3 font-mono font-bold text-white">{s.seatNumber}</td>
                        <td className="p-3 uppercase text-[10px] text-rose-300">{s.zone}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            s.status === 'available' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {s.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-amber-400">₹{s.pricePerMonth}</td>
                        <td className="p-3">
                          <button
                            onClick={() => toggleSeatStatus(s.id)}
                            className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 hover:bg-rose-600 hover:text-white transition-colors"
                          >
                            Toggle Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 4: Blog Creator */}
          {activeTab === 'blogs' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 glass-card p-6 rounded-3xl space-y-4">
                <h3 className="text-base font-bold text-white font-['Outfit'] flex items-center">
                  <PenTool className="w-4 h-4 text-rose-400 mr-2" />
                  Publish New Blog Post
                </h3>

                <form onSubmit={handleAddBlog} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Post Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Top 5 Hacks for APPSC Group 1 Preparation"
                      value={newBlogTitle}
                      onChange={(e) => setNewBlogTitle(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-rose-500/30 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                    <select
                      value={newBlogCategory}
                      onChange={(e) => setNewBlogCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-rose-500/30 text-white text-xs"
                    >
                      <option value="Study Tips">Study Tips</option>
                      <option value="Exam Prep">Exam Prep</option>
                      <option value="Productivity">Productivity</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Short Excerpt</label>
                    <input
                      type="text"
                      placeholder="Brief summary..."
                      value={newBlogExcerpt}
                      onChange={(e) => setNewBlogExcerpt(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-rose-500/30 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Full Article Content *</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write your article content here..."
                      value={newBlogContent}
                      onChange={(e) => setNewBlogContent(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-rose-500/30 text-white text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
                  >
                    Publish Post to Live Website
                  </button>
                </form>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-base font-bold text-white font-['Outfit']">Active Published Articles ({blogs.length})</h3>
                <div className="space-y-3">
                  {blogs.map((b) => (
                    <div key={b.id} className="glass-card p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-rose-300 font-bold uppercase">{b.category}</span>
                        <h4 className="text-sm font-bold text-white font-['Outfit']">{b.title}</h4>
                        <p className="text-[11px] text-slate-400">{b.date} • {b.author}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteBlog(b.id)}
                        className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Tab 5: Inquiries */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-['Outfit']">Recent Website Inquiries</h3>
              <div className="glass-card p-6 rounded-2xl text-xs text-slate-300 space-y-3">
                <div className="p-3 bg-slate-900 rounded-xl flex items-center justify-between border border-rose-500/20">
                  <div>
                    <p className="font-bold text-white">V. Teja (+91 9666152456)</p>
                    <p className="text-[11px] text-slate-400">Exam: APPSC Group 2 • Shift: Full Day 24/7</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">New Lead</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl flex items-center justify-between border border-rose-500/20">
                  <div>
                    <p className="font-bold text-white">S. Priyanka (+91 9848022334)</p>
                    <p className="text-[11px] text-slate-400">Exam: DSC Teacher • Shift: Morning Shift</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">Followed Up</span>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
