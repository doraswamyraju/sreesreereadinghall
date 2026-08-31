import React, { useState } from 'react';
import { BlogPost, Seat, PricingPlan, SeatStatus } from '../types';
import { LayoutDashboard, Users, BookOpen, PenTool, Trash2, Tag, Save, LogOut } from 'lucide-react';

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

  const handleRateChange = (planId: string, rateKey: keyof PricingPlan['rates'], value: number) => {
    setEditablePlans(prev => prev.map(p => {
      if (p.id === planId) {
        const updatedRates = { ...p.rates, [rateKey]: value };
        return {
          ...p,
          rates: updatedRates,
          priceMonthly: rateKey === 'days30' ? value : p.priceMonthly
        };
      }
      return p;
    }));
  };

  const handleSavePricing = () => {
    onUpdatePlans(editablePlans);
    alert('Pricing rates successfully saved! Live rates on website are updated.');
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
      image: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.45 (1).jpeg',
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

  const pinkSeats = seats.filter(s => s.color === 'pink');
  const blueSeats = seats.filter(s => s.color === 'blue');

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
                73 DESKS (52 PINK + 21 BLUE)
              </span>
            </h2>
            <p className="text-xs text-slate-600 font-medium">Manage Desk Allocations, Edit Duration Pricing Rates & View Inquiries</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-[#db2777] text-white text-xs font-bold hover:bg-[#be185d] transition-all shadow-xs flex items-center space-x-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit / Logout</span>
        </button>
      </div>

      {/* Main Admin Body */}
      <div className="flex-1 flex overflow-hidden bg-white">
        
        {/* Sidebar Nav */}
        <aside className="w-64 bg-white border-r border-[#fbcfe8] p-4 space-y-2 shrink-0 hidden md:block shadow-xs">
          {[
            { id: 'pricing', label: 'Rate Card Manager', icon: <Tag className="w-4 h-4" /> },
            { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'seats', label: `Seat Allocations (${seats.length})`, icon: <Users className="w-4 h-4" /> },
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
            <h4 className="text-xs font-bold text-[#db2777]">Desk System Info</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              52 Pink Desks (Cushion & Locker)<br />
              21 Blue Desks (Normal Chair)<br />
              Timings: <strong>7 AM - 10 PM</strong>
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
                    DEFINE DURATION RATES FOR PINK & BLUE DESKS
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">Set fees for 7 Days, 10 Days, 15 Days, 20 Days, and 30 Days (All 100% AC).</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {editablePlans.map((plan) => {
                  const isPink = plan.deskColor === 'pink';
                  return (
                    <div key={plan.id} className={`p-6 rounded-3xl border shadow-xs space-y-4 ${
                      isPink ? 'bg-pink-50/40 border-pink-200' : 'bg-blue-50/40 border-blue-200'
                    }`}>
                      <div className="flex items-center justify-between border-b pb-3">
                        <div>
                          <h4 className="text-lg font-black text-slate-900 font-['Outfit']">{plan.name}</h4>
                          <p className="text-xs text-slate-600 font-medium">{plan.chairType} • {plan.hasLocker ? 'With Locker' : 'No Locker'}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          isPink ? 'bg-pink-100 text-pink-700 border-pink-300' : 'bg-blue-100 text-blue-700 border-blue-300'
                        }`}>
                          {plan.totalDesks} DESKS (100% AC)
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-bold text-slate-800 block mb-1">1 Week (7 Days Rate)</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">₹</span>
                              <input
                                type="number"
                                value={plan.rates.days7}
                                onChange={(e) => handleRateChange(plan.id, 'days7', Number(e.target.value))}
                                className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-[#fbcfe8] text-[#db2777] font-black text-xs focus:outline-none focus:border-[#db2777]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-bold text-slate-800 block mb-1">10 Days Rate</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">₹</span>
                              <input
                                type="number"
                                value={plan.rates.days10}
                                onChange={(e) => handleRateChange(plan.id, 'days10', Number(e.target.value))}
                                className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-[#fbcfe8] text-[#db2777] font-black text-xs focus:outline-none focus:border-[#db2777]"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs font-bold text-slate-800 block mb-1">15 Days Rate</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">₹</span>
                              <input
                                type="number"
                                value={plan.rates.days15}
                                onChange={(e) => handleRateChange(plan.id, 'days15', Number(e.target.value))}
                                className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-[#fbcfe8] text-[#db2777] font-black text-xs focus:outline-none focus:border-[#db2777]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-bold text-slate-800 block mb-1">20 Days Rate</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">₹</span>
                              <input
                                type="number"
                                value={plan.rates.days20}
                                onChange={(e) => handleRateChange(plan.id, 'days20', Number(e.target.value))}
                                className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-[#fbcfe8] text-[#db2777] font-black text-xs focus:outline-none focus:border-[#db2777]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-bold text-slate-800 block mb-1">30 Days (1 Mo)</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">₹</span>
                              <input
                                type="number"
                                value={plan.rates.days30}
                                onChange={(e) => handleRateChange(plan.id, 'days30', Number(e.target.value))}
                                className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-[#fbcfe8] text-[#db2777] font-black text-xs focus:outline-none focus:border-[#db2777]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 text-[11px] text-slate-500 font-medium leading-relaxed">
                        * All rates update live on the website pricing calculator & booking modal.
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* Tab 2: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border-l-4 border-[#db2777] border border-slate-200 shadow-xs">
                  <p className="text-xs text-slate-500 font-bold">Total Desks</p>
                  <p className="text-3xl font-black text-slate-900 font-['Outfit']">{seats.length}</p>
                  <p className="text-[10px] text-[#db2777] mt-1 font-extrabold">52 Pink, 21 Blue (100% AC)</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border-l-4 border-blue-600 border border-slate-200 shadow-xs">
                  <p className="text-xs text-slate-500 font-bold">Occupied Desks</p>
                  <p className="text-3xl font-black text-slate-900 font-['Outfit']">
                    {seats.filter(s => s.status === 'occupied').length}
                  </p>
                  <p className="text-[10px] text-blue-700 mt-1 font-extrabold">Active Offline Paid</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border-l-4 border-amber-500 border border-slate-200 shadow-xs">
                  <p className="text-xs text-slate-500 font-bold">Reserved Desks</p>
                  <p className="text-3xl font-black text-slate-900 font-['Outfit']">
                    {seats.filter(s => s.status === 'reserved').length}
                  </p>
                  <p className="text-[10px] text-amber-800 mt-1 font-extrabold">Pending Offline Payment</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border-l-4 border-purple-600 border border-slate-200 shadow-xs">
                  <p className="text-xs text-slate-500 font-bold">Published Blogs</p>
                  <p className="text-3xl font-black text-slate-900 font-['Outfit']">{blogs.length}</p>
                  <p className="text-[10px] text-purple-800 mt-1 font-extrabold">Study Articles</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl space-y-4 border border-[#fbcfe8] shadow-xs">
                <h3 className="text-base font-bold text-slate-900 font-['Outfit']">Quick Seat Status Toggler (73 Desks)</h3>
                <p className="text-xs text-slate-600 font-medium">Click any desk to cycle status: Available → Occupied → Reserved.</p>

                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 max-h-80 overflow-y-auto pr-1">
                  {seats.map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => toggleSeatStatus(seat.id)}
                      className={`p-1.5 rounded-lg text-center text-xs font-mono font-bold transition-all border ${
                        seat.status === 'available'
                          ? seat.color === 'pink' ? 'bg-pink-50 border-pink-300 text-pink-700 hover:bg-pink-100' : 'bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100'
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
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">All 73 Desks Management</h3>
              <div className="bg-white rounded-2xl overflow-hidden border border-[#fbcfe8] shadow-xs max-h-[500px] overflow-y-auto">
                <table className="w-full text-left text-xs text-slate-800">
                  <thead className="bg-[#fdf2f8] text-slate-800 uppercase text-[10px] font-extrabold border-b border-[#fbcfe8] sticky top-0 bg-white">
                    <tr>
                      <th className="p-3">Desk #</th>
                      <th className="p-3">Color / Type</th>
                      <th className="p-3">Chair & Locker</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Monthly Fee</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {seats.map((s) => (
                      <tr key={s.id} className="hover:bg-[#fdf2f8]/50">
                        <td className="p-3 font-mono font-bold text-slate-900">{s.seatNumber}</td>
                        <td className="p-3 font-bold">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                            s.color === 'pink' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {s.color === 'pink' ? 'Pink Desk' : 'Blue Desk'}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600">
                          {s.color === 'pink' ? 'Cushion Chair + Locker' : 'Normal Chair (No Locker)'}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            s.status === 'available' ? 'bg-green-100 text-green-800 border border-green-200' : s.status === 'reserved' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {s.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 font-extrabold text-[#db2777]">₹{s.rates.days30}</td>
                        <td className="p-3">
                          <button
                            onClick={() => toggleSeatStatus(s.id)}
                            className="px-2.5 py-1 rounded-lg bg-[#fdf2f8] text-[#db2777] border border-[#fbcfe8] font-bold hover:bg-[#db2777] hover:text-white transition-colors text-[10px]"
                          >
                            Toggle
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
                    <p className="text-[11px] text-slate-600">Exam: APPSC Group 2 • Shift: Full Day (7 AM - 10 PM)</p>
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
