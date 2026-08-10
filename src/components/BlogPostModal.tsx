import React from 'react';
import { BlogPost } from '../types';
import { X, Calendar, Clock, User, Tag, Share2 } from 'lucide-react';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="relative max-w-3xl w-full glass-card border-2 border-[#db2777] rounded-3xl overflow-hidden bg-white my-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900 text-white hover:bg-[#db2777]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
        </div>

        <div className="p-6 sm:p-8 space-y-4 -mt-12 relative z-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
            <span className="bg-[#db2777] text-white px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center space-x-1 text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-[#db2777]" />
              <span>{post.date}</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-[#db2777]" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] leading-tight">
            {post.title}
          </h2>

          <div className="flex items-center space-x-2 text-xs text-slate-600 border-b border-[#fbcfe8] pb-4">
            <User className="w-4 h-4 text-[#db2777]" />
            <span>Written by <strong className="text-slate-900">{post.author}</strong></span>
          </div>

          <div className="prose max-w-none text-slate-700 text-sm leading-relaxed whitespace-pre-line py-2 font-medium">
            {post.content}
          </div>

          <div className="pt-4 border-t border-[#fbcfe8] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-[#db2777]" />
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[11px] bg-[#fdf2f8] text-[#db2777] font-bold px-2.5 py-0.5 rounded-full border border-[#fbcfe8]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: post.title, url: window.location.href });
                } else {
                  alert('Link copied to clipboard!');
                }
              }}
              className="flex items-center space-x-1.5 text-xs text-[#db2777] hover:text-[#be185d] font-bold"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Article</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
