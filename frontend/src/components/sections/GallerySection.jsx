import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, ArrowRight, Maximize2 } from 'lucide-react';
import { getGallery } from '../../api/mock.api';

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const data = await getGallery();
        setImages(data || []);
      } catch (err) {
        console.error('Failed to fetch gallery', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Gracefully hide if no data exists, as per requirements
  if (loading || images.length === 0) return null; 

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f7f9] text-[#1056A5] text-xs font-bold tracking-widest mb-4">
              <ImageIcon size={14} />
              COMMUNITY MOMENTS
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1056A5] to-[#1a73e8]">Gallery</span>
            </h2>
          </div>
          <button className="inline-flex items-center gap-2 text-[#1056A5] font-bold hover:text-[#FFC107] transition-colors group">
            VIEW ALL MOMENTS <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Bento Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {images.slice(0, 5).map((img, index) => {
            // Create asymmetric bento composition
            const isLarge = index === 0;
            const gridClasses = isLarge ? 'md:col-span-2 md:row-span-2' : 'col-span-1 row-span-1';

            return (
              <motion.div
                key={img.id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-3xl overflow-hidden group cursor-pointer ${gridClasses}`}
              >
                <img 
                  src={img.url} 
                  alt={img.title || "Gallery image"} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#0A1435]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-full bg-[#FFC107] flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default GallerySection;
