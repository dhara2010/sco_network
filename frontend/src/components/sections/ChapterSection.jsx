import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, MapPin, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getChapters } from '../../api/chapters.api';

const ChapterSection = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        setLoading(true);
        const data = await getChapters();
        setChapters(data.filter(c => ['Approved', 'Active', 'approved', 'active'].includes(c.status)).slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch chapters', err);
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f7f9] text-[#1056A5] text-xs font-bold tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FFC107]"></span>
              GLOBAL PRESENCE
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1056A5] to-[#1a73e8]">Chapters</span>
            </h2>
          </div>
          <Link to="/chapters" className="inline-flex items-center gap-2 text-[#1056A5] font-bold hover:text-[#FFC107] transition-colors group">
            Explore All Regions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1056A5]"></div>
          </div>
        ) : (
          /* Asymmetric 4-column Bento Grid for exactly 4 chapters */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
            {chapters.map((chapter, index) => {
              // Determine grid classes based on index to create the asymmetric layout
              let gridClasses = "md:col-span-1 md:row-span-1";
              if (index === 0) gridClasses = "md:col-span-2 md:row-span-2"; // Large feature
              else if (index === 1) gridClasses = "md:col-span-2 md:row-span-1"; // Wide feature
              
              // For small cards on mobile, row-span-1 is fine. For the large card on mobile, make it taller.
              const mobileHeight = index === 0 ? "min-h-[400px] md:min-h-0" : "min-h-[250px] md:min-h-0";

              return (
                <motion.div
                  key={chapter._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`${gridClasses} ${mobileHeight} relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100`}
                >
                  {/* Background Image / Gradient Fallback */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${chapter.imageUrl || chapter.featuredImage || "/images/chapters/chapter-default.png"}")`
                    }}
                  >
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-[#071B4D]/60 to-transparent z-0"></div>
                  </div>

                  {/* Top Right CTA Arrow */}
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 -translate-y-4 translate-x-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 z-20">
                    <ArrowUpRight size={20} strokeWidth={2.5} />
                  </div>

                  {/* Content Area */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-[#FFC107] rounded-full text-[#071B4D] shadow-lg">
                        <MapPin size={16} strokeWidth={2.5} />
                      </div>
                      {chapter.pinCode && (
                        <span className="text-white/80 font-bold text-xs tracking-widest bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                          PIN: {chapter.pinCode}
                        </span>
                      )}
                    </div>
                    
                    <h3 className={`font-black text-white ${index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'} mb-4 drop-shadow-md`}>
                      {chapter.cityName}
                    </h3>

                    <div className="flex flex-col gap-3 overflow-hidden">
                      <div className="flex flex-col gap-3 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        {chapter.presidentName && (
                          <div className="flex items-center text-sm font-medium">
                            <Users size={16} className="mr-2 text-[#FFC107]" />
                            <span>President: <span className="text-white">{chapter.presidentName}</span></span>
                          </div>
                        )}
                        {chapter.membersCount > 0 && (
                          <div className="flex items-center text-sm font-medium">
                            <Building2 size={16} className="mr-2 text-[#FFC107]" />
                            <span>Members: <span className="text-white font-bold">{chapter.membersCount}</span></span>
                          </div>
                        )}
                        
                        <a
                          href={chapter.websiteUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            if (!chapter.websiteUrl) e.preventDefault();
                          }}
                          className="mt-2 w-max inline-flex items-center gap-2 text-[#FFC107] font-bold text-sm hover:text-white transition-colors"
                        >
                          Visit Local Website <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>
                    
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ChapterSection;
