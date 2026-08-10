import React, { useState } from 'react';
import { BlogPost, Seat, PricingPlan, SeatStatus } from '../types';
import { LayoutDashboard, Users, BookOpen, PenTool, Trash2, Tag, Save } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'pricing' | 'overview' | 'seats' | 'blogs' | 'inquiries'>('pricing');
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
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex flex-col overflow-hidden animate-in fade-in">
      
      {/* Top Admin Navigation Header */}
      <div className="bg-white border-b border-[#fbcfe8] px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#fdf2f8] border border-[#fbcfe8] flex items-center justify-center text-[#db2777] font-bold">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 font-['Outfit'] flex items-center">
              Sree Sree Admin Portal
              <span className="ml-2.5 text-[10px] bg-[#db2777] text-white px-2.5 py-0.5 rounded-full font-extrabold shadow-xs">
                LIVE DASHBOARD & PRICING
              </span>
            </h2>
            <p className="text-xs text-slate-600 font-medium">Define Pricing Plans, Manage Seats, Publish Blogs & Sync Database</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-[#db2777] text-white text-xs font-bold hover:bg-[#be185d] transition-all shadow-xs"
        >
          Exit Dashboard Preview
        </button>
      </div>

      {/* Main Admin Body */}
      <div className="flex-1 flex overflow-hidden bg-white">
        
        {/* Sidebar Nav */}
        <aside className="w-64 bg-white border-r border-[#fbcfe8] p-4 space-y-2 shrink-0 hidden md:block shadow-xs">
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
                  ? 'bg-[#db2777] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-[#fdf2f8] hover:text-[#db2777]'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <div className="mt-8 p-4 bg-[#fdf2f8] border border-[#fbcfe8] rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-[#db2777]">PHP & MySQL REST API Configured</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              Persist your pricing edits directly to MySQL via <code className="text-[#db2777] font-mono font-bold">backend/api/pricing.php</code>.
            </p>
          </div>
        </aside>

        {/* Tab Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-white">
          
          {/* Tab 1: Pricing Manager */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#fbcfe8] pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 font-['Outfit'] flex items-center">
                    <Tag className="w-5 h-5 text-[#db2777] mr-2" />
                    DEFINE MEMBERSHIP & SEAT PRICING RATES
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">Set custom monthly and daily fees for AC Prime, AC Standard, and Non-AC Economy bays.</p>
                </div>

                <button
                  onClick={handleSavePricing}
                  className="px-5 py-2.5 rounded-xl bg-[#db2777] hover:bg-[#be185d] text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Pricing Changes</span>
                </button>
              </div>

              {/* Pricing Edit Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {editablePlans.map((plan) => (
                  <div key={plan.id} className="bg-white p-6 rounded-3xl border border-[#fbcfe8] shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-black text-slate-900 font-['Outfit']">{plan.name}</h4>
                      <span className="text-[10px] bg-[#fdf2f8] text-[#db2777] font-mono font-bold px-2.5 py-0.5 rounded-full border border-[#fbcfe8]">
                        {plan.zoneType.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">Monthly Rate (₹ / Month)</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">₹</span>
                          <input
                            type="number"
                            value={plan.priceMonthly}
                            onChange={(e) => handlePriceChange(plan.id, 'priceMonthly', Number(e.target.value))}
                            className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-[#fdf2f8] border border-[#fbcfe8] text-[#db2777] font-black text-sm focus:outline-none focus:border-[#db2777] shadow-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">Daily Pass Rate (₹ / Day)</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">₹</span>
                          <input
                            type="number"
                            value={plan.priceDaily}
                            onChange={(e) => handlePriceChange(plan.id, 'priceDaily', Number(e.target.value))}
                            className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-[#fdf2f8] border border-[#fbcfe8] text-[#db2777] font-black text-sm focus:outline-none focus:border-[#db2777] shadow-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-500 font-medium leading-relaxed">
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
                <div className="bg-white p-5 rounded-2xl border-l-4 border-[#db2777] border border-slate-200 shadow-xs">
                  <p className="text-xs text-slate-500 font-bold">Total Seats</p>
                  <p className="text-3xl font-black text-slate-900 font-['Outfit']">48</p>
                  <p className="text-[10px] text-[#db2777] mt-1 font-extrabold">32 AC, 16 Non-AC</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border-l-4 border-blue-600 border border-slate-200 shadow-xs">
                  <p className="text-xs text-slate-500 font-bold">Occupied Desks</p>
                  <p className="text-3xl font-black text-slate-900 font-['Outfit']">
                    {seats.filter(s => s.status === 'occupied').length}
                  </p>
                  <p className="text-[10px] text-blue-700 mt-1 font-extrabold">Active Aspirants</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border-l-4 border-amber-500 border border-slate-200 shadow-xs">
                  <p className="text-xs text-slate-500 font-bold">Reserved Desks</p>
                  <p className="text-3xl font-black text-slate-900 font-['Outfit']">
                    {seats.filter(s => s.status === 'reserved').length}
                  </p>
                  <p className="text-[10px] text-amber-800 mt-1 font-extrabold">Pending Onboarding</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border-l-4 border-purple-600 border border-slate-200 shadow-xs">
                  <p className="text-xs text-slate-500 font-bold">Published Blogs</p>
                  <p className="text-3xl font-black text-slate-900 font-['Outfit']">{blogs.length}</p>
                  <p className="text-[10px] text-purple-800 mt-1 font-extrabold">Knowledge Articles</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl space-y-4 border border-[#fbcfe8] shadow-xs">
                <h3 className="text-base font-bold text-slate-900 font-['Outfit']">Quick Seat Control Grid</h3>
                <p className="text-xs text-slate-600 font-medium">Click any seat to toggle status (Available → Occupied → Reserved).</p>

                <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
                  {seats.map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => toggleSeatStatus(seat.id)}
                      className={`p-2 rounded-xl text-center text-xs font-mono font-bold transition-all border ${
                        seat.status === 'available'
                          ? 'bg-[#fdf2f8] border-[#fbcfe8] text-[#db2777] hover:bg-pink-100'
                          : seat.status === 'occupied'
                          ? 'bg-slate-200 border-slate-300 text-slate-500'
                          : 'bg-amber-100 border-amber-300 text-amber-900'
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
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Seat Management Table</h3>
              <div className="bg-white rounded-2xl overflow-hidden border border-[#fbcfe8] shadow-xs">
                <table className="w-full text-left text-xs text-slate-800">
                  <thead className="bg-[#fdf2f8] text-slate-800 uppercase text-[10px] font-extrabold border-b border-[#fbcfe8]">
                    <tr>
                      <th className="p-3">Desk #</th>
                      <th className="p-3">Zone</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Monthly Price</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {seats.map((s) => (
                      <tr key={s.id} className="hover:bg-[#fdf2f8]/50">
                        <td className="p-3 font-mono font-bold text-slate-900">{s.seatNumber}</td>
                        <td className="p-3 uppercase text-[10px] text-[#db2777] font-bold">{s.zone}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            s.status === 'available' ? 'bg-[#fdf2f8] text-[#db2777] border border-[#fbcfe8]' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {s.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 font-extrabold text-[#db2777]">₹{s.pricePerMonth}</td>
                        <td className="p-3">
                          <button
                            onClick={() => toggleSeatStatus(s.id)}
                            className="px-2.5 py-1 rounded-lg bg-[#fdf2f8] text-[#db2777] border border-[#fbcfe8] font-bold hover:bg-[#db2777] hover:text-white transition-colors"
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
              <div className="lg:col-span-6 bg-white p-6 rounded-3xl space-y-4 border border-[#fbcfe8] shadow-xs">
                <h3 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center">
                  <PenTool className="w-4 h-4 text-[#db2777] mr-2" />
                  Publish New Blog Post
                </h3>

                <form onSubmit={handleAddBlog} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">Post Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Top 5 Hacks for APPSC Group 1 Preparation"
                      value={newBlogTitle}
                      onChange={(e) => setNewBlogTitle(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 text-xs focus:outline-none focus:border-[#db2777] shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">Category</label>
                    <select
                      value={newBlogCategory}
                      onChange={(e) => setNewBlogCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 text-xs focus:outline-none focus:border-[#db2777] shadow-xs"
                    >
                      <option value="Study Tips">Study Tips</option>
                      <option value="Exam Prep">Exam Prep</option>
                      <option value="Productivity">Productivity</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">Short Excerpt</label>
                    <input
                      type="text"
                      placeholder="Brief summary..."
                      value={newBlogExcerpt}
                      onChange={(e) => setNewBlogExcerpt(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 text-xs focus:outline-none focus:border-[#db2777] shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">Full Article Content *</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write your article content here..."
                      value={newBlogContent}
                      onChange={(e) => setNewBlogContent(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 text-xs focus:outline-none focus:border-[#db2777] shadow-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#db2777] hover:bg-[#be185d] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-xs"
                  >
                    Publish Post to Live Website
                  </button>
                </form>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900 font-['Outfit']">Active Published Articles ({blogs.length})</h3>
                <div className="space-y-3">
                  {blogs.map((b) => (
                    <div key={b.id} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-[#fbcfe8] shadow-xs">
                      <div>
                        <span className="text-[10px] text-[#db2777] font-bold uppercase">{b.category}</span>
                        <h4 className="text-sm font-bold text-slate-900 font-['Outfit']">{b.title}</h4>
                        <p className="text-[11px] text-slate-500">{b.date} • {b.author}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteBlog(b.id)}
                        className="p-2 text-[#db2777] hover:bg-[#fdf2f8] rounded-lg"
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
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Recent Website Inquiries</h3>
              <div className="bg-white p-6 rounded-2xl text-xs text-slate-800 space-y-3 border border-[#fbcfe8] shadow-xs">
                <div className="p-3 bg-[#fdf2f8] rounded-xl flex items-center justify-between border border-[#fbcfe8]">
                  <div>
                    <p className="font-bold text-slate-900">V. Teja (+91 9666152456)</p>
                    <p className="text-[11px] text-slate-600">Exam: APPSC Group 2 • Shift: Full Day 24/7</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-[#db2777] text-white text-[10px] font-bold">New Lead</span>
                </div>
                <div className="p-3 bg-[#fdf2f8] rounded-xl flex items-center justify-between border border-[#fbcfe8]">
                  <div>
                    <p className="font-bold text-slate-900">S. Priyanka (+91 9848022334)</p>
                    <p className="text-[11px] text-slate-600">Exam: DSC Teacher • Shift: Morning Shift</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold">Followed Up</span>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
