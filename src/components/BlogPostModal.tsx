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
      <div className="relative max-w-3xl w-full glass-card border border-rose-300 rounded-3xl overflow-hidden bg-white my-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/80 text-white hover:text-rose-300"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>

        <div className="p-6 sm:p-8 space-y-4 -mt-12 relative z-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-rose-800 font-semibold">
            <span className="bg-rose-100 text-rose-800 border border-rose-300 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center space-x-1 text-slate-600">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-600">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] leading-tight">
            {post.title}
          </h2>

          <div className="flex items-center space-x-2 text-xs text-slate-600 border-b border-rose-100 pb-4">
            <User className="w-4 h-4 text-rose-600" />
            <span>Written by <strong className="text-slate-900">{post.author}</strong></span>
          </div>

          <div className="prose max-w-none text-slate-700 text-sm leading-relaxed whitespace-pre-line py-2">
            {post.content}
          </div>

          <div className="pt-4 border-t border-rose-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-rose-600" />
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[11px] bg-rose-50 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200">
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
              className="flex items-center space-x-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold"
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
