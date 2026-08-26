 import { useState } from "react";
 function Gallery() {
      const [filter, setFilter] = useState('ALL');
      const [lightboxImg, setLightboxImg] = useState(null);

      const items = [
        { cat: 'PRACTICE', img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80', title: 'Flow State' },
        { cat: 'COMPETITIONS', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', title: 'Artistic Yoga Podium' },
        { cat: 'TRAINING', img: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80', title: 'Cult Fitness Studio' },
        { cat: 'AWARDS', img: 'https://images.unsplash.com/photo-1510894347250-93c407d5815d?auto=format&fit=crop&w=800&q=80', title: 'Silver Medal Ceremony' },
        { cat: 'STUDENTS', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80', title: 'Group Energy Session' },
        { cat: 'PRACTICE', img: 'https://images.unsplash.com/photo-1508215885820-4585e56135c8?auto=format&fit=crop&w=800&q=80', title: 'Mindful Breathing' }
      ];

      const filtered = filter === 'ALL' ? items : items.filter(i => i.cat === filter);

      return (
        <section id="gallery" className="py-28 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent-primary)] font-semibold">
              VISUAL JOURNAL
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight mt-2">
              MOMENTS IN MOTION
            </h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {['ALL', 'PRACTICE', 'COMPETITIONS', 'TRAINING', 'AWARDS', 'STUDENTS'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    filter === tab 
                      ? 'bg-[var(--accent-primary)] text-white shadow-lg' 
                      : 'bg-[var(--card-bg)] border border-[var(--border-color)] opacity-70 hover:opacity-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setLightboxImg(item.img)}
                className="relative h-80 rounded-3xl overflow-hidden cursor-pointer group shadow-xl border border-[var(--border-color)]"
              >
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-widest">{item.cat}</span>
                  <h4 className="font-display font-bold text-lg">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {lightboxImg && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6" onClick={() => setLightboxImg(null)}>
              <img src={lightboxImg} className="max-w-4xl max-h-[85vh] rounded-2xl object-contain shadow-2xl" />
            </div>
          )}
        </section>
      );
    }
export default Gallery;