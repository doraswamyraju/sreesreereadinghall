import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data/mockData';
import { GalleryImage } from '../types';
import { Maximize2, X, Camera } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalImage, setActiveModalImage] = useState<GalleryImage | null>(null);

  const categories = ['All', 'Reading Area', 'Amenities', 'Cabins', 'Dining & Lounge'];

  const filteredImages = GALLERY_IMAGES.filter((img) => {
    if (selectedCategory === 'All') return true;
    return img.category === selectedCategory;
  });

  return (
    <section id="gallery" className="py-20 relative bg-white border-t border-[#fbcfe8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#db2777] bg-[#fdf2f8] px-3.5 py-1 rounded-full border border-[#fbcfe8] flex items-center justify-center w-fit mx-auto">
            <Camera className="w-3.5 h-3.5 mr-1.5" /> Real Photo Tour
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
            TAKE A LOOK INSIDE <span className="text-[#db2777]">SREE SREE READING HALL</span>
          </h2>
          <p className="text-slate-700 text-sm sm:text-base font-medium">
            Browse authentic photographs of our reading bays, climate control systems, mineral water stations, dining lounge, and washroom facilities in Tirupati.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
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

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveModalImage(img)}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer border border-[#fbcfe8] hover:border-[#db2777] transition-all duration-300 relative bg-white"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-8 h-8 text-white mx-auto mb-2" />
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Click to Expand</p>
                  </div>
                </div>

                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-[#db2777] px-2.5 py-1 rounded-full shadow-xs">
                  {img.category}
                </span>
              </div>

              <div className="p-4 bg-white">
                <h3 className="text-base font-bold text-slate-900 font-['Outfit'] group-hover:text-[#db2777] transition-colors">
                  {img.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-medium">
                  {img.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Zoom Modal */}
      {activeModalImage && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative max-w-4xl w-full glass-card border-2 border-[#db2777] rounded-3xl overflow-hidden bg-white">
            
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900 text-white hover:bg-[#db2777]"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[75vh] overflow-hidden">
              <img
                src={activeModalImage.url}
                alt={activeModalImage.title}
                className="w-full h-full object-contain max-h-[75vh]"
              />
            </div>

            <div className="p-6 bg-white border-t border-[#fbcfe8]">
              <span className="text-xs font-extrabold text-[#db2777] uppercase tracking-wider">
                {activeModalImage.category}
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-['Outfit'] mt-0.5">
                {activeModalImage.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium">
                {activeModalImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
