import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BlogPostModal } from './BlogPostModal';
import { Search, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

interface BlogProps {
  posts: BlogPost[];
}

export const Blog: React.FC<BlogProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Study Tips', 'Exam Prep', 'Productivity'];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="blog" className="py-20 relative bg-white border-t border-[#fbcfe8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#db2777] bg-[#fdf2f8] px-3.5 py-1 rounded-full border border-[#fbcfe8] flex items-center justify-center w-fit mx-auto">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Aspirant Knowledge Hub
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
            EXAM INSIGHTS & <span className="text-[#db2777]">STUDY PRODUCTIVITY BLOGS</span>
          </h2>
          <p className="text-slate-700 text-sm sm:text-base font-medium">
            Expert strategies on time management, APPSC/UPSC exam preparation, and maintaining focus in reading halls.
          </p>

          {/* Search Bar & Category Filters */}
          <div className="pt-4 max-w-xl mx-auto space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles (e.g. APPSC, focus, revision)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-[#fbcfe8] text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-[#db2777] transition-colors shadow-xs"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#db2777] text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-[#fbcfe8] hover:border-[#db2777]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Blog Post Cards Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setActivePost(post)}
                className="glass-card rounded-3xl overflow-hidden group cursor-pointer border border-[#fbcfe8] hover:border-[#db2777] transition-all duration-300 flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-[#db2777] px-2.5 py-1 rounded-full shadow-xs">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3 text-[11px] text-slate-500 font-bold">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-[#db2777]" />
                        <span>{post.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#db2777]" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] group-hover:text-[#db2777] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-[#db2777] group-hover:text-[#be185d]">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-card rounded-2xl bg-white border-[#fbcfe8]">
            <p className="text-slate-500 text-sm font-medium">No blog posts found matching your search query.</p>
          </div>
        )}

      </div>

      {/* Reader Modal */}
      <BlogPostModal post={activePost} onClose={() => setActivePost(null)} />
    </section>
  );
};
