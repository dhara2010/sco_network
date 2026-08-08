import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Handshake, ArrowRight } from 'lucide-react';
import { getSponsors } from '../../api/mock.api';

const SponsorSection = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setLoading(true);
        const data = await getSponsors();
        setSponsors(data || []);
      } catch (err) {
        console.error('Failed to fetch sponsors', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSponsors();
  }, []);

  // Gracefully hide if no data exists
  if (loading || sponsors.length === 0) return null;

  return (
    <section className="py-24 bg-white relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f7f9] text-[#1056A5] text-xs font-bold tracking-widest mb-4">
            <Handshake size={14} />
            OUR PARTNERS
          </div>
          <h2 className="text-3xl md:text-4xl font-black leading-tight">
            Supported by Visionaries
          </h2>
        </motion.div>

        {/* Clean Logo Wall */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center opacity-70 hover:opacity-100 transition-opacity duration-500">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="w-full max-w-[160px] aspect-[3/2] flex items-center justify-center grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img src={sponsor.logo} alt={sponsor.name} className="max-w-full max-h-full object-contain" />
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <button className="inline-flex items-center gap-2 font-bold hover:text-[#1056A5] transition-colors text-sm tracking-widest uppercase group">
            VIEW ALL PARTNERS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default SponsorSection;
