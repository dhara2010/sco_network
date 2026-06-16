import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GujaratMap from '../components/GujaratMap';
import { Users, Globe, Building2, MapPin } from 'lucide-react';

const ChaptersPage = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch('https://sco-network.onrender.com/api/chapters/public');
        if (res.ok) {
          const data = await res.json();
          setChapters(data);
        }
      } catch (err) {
        console.error('Failed to fetch chapters', err);
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 mt-14">
      {/* Hero Section */}
      <div className="bg-[#1056A5] text-white py-24 px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-[44px] font-extrabold mb-5 tracking-tight uppercase"
        >
          Our Chapters
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-[700px] mx-auto text-[17px] opacity-95 leading-relaxed"
        >
          Connecting the community across regions. Explore our presence and connect with your local chapter.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Map Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[var(--color-sco-navy)] uppercase">Network Presence</h2>
            <div className="w-20 h-1 bg-[var(--color-sco-gold)] mx-auto mt-4"></div>
          </div>
          <GujaratMap />
        </div>

        {/* Chapters Grid */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[var(--color-sco-navy)] uppercase">All Chapters</h2>
          <div className="w-20 h-1 bg-[var(--color-sco-gold)] mx-auto mt-4"></div>
        </div>

        {loading ? (
          <div className="text-center py-10 font-bold text-gray-500">Loading chapters...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {chapters.map((chapter) => (
              <motion.div 
                key={chapter._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[var(--color-sco-navy)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-[var(--color-sco-navy)]">{chapter.cityName}</h3>
                  <div className="p-2 bg-[var(--color-sco-gold)]/20 rounded-full text-[var(--color-sco-navy)]">
                    <MapPin size={20} />
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {chapter.presidentName && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={16} className="mr-2 text-[var(--color-sco-navy)]" />
                      <span className="font-semibold mr-1">President:</span> {chapter.presidentName}
                    </div>
                  )}
                  {chapter.membersCount > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Building2 size={16} className="mr-2 text-[var(--color-sco-navy)]" />
                      <span className="font-semibold mr-1">Members:</span> {chapter.membersCount}
                    </div>
                  )}
                </div>

                <a 
                  href={chapter.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2 bg-gray-50 text-[var(--color-sco-navy)] font-bold rounded-xl border border-gray-200 hover:bg-[var(--color-sco-gold)] hover:border-[var(--color-sco-gold)] transition-colors"
                >
                  Visit Website
                </a>
              </motion.div>
            ))}
            {chapters.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-10">
                No chapters found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChaptersPage;
