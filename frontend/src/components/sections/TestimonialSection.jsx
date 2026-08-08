import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Quote } from 'lucide-react';
import { getTestimonials } from '../../api/mock.api';

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await getTestimonials();
        setTestimonials(data || []);
      } catch (err) {
        console.error('Failed to fetch testimonials', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Gracefully hide if no real data exists
  if (loading || testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-[#F8F9FA] relative overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-100 text-[#1056A5] text-xs font-bold tracking-widest mb-4 shadow-sm">
            <MessageSquare size={14} />
            MEMBER STORIES
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            Voices of the <span className="text-[#FFC107]">Network</span>
          </h2>
        </div>

        {/* Horizontal Carousel (Simplified as grid for now, but UI structure exists) */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory no-scrollbar">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="min-w-[320px] md:min-w-[400px] w-full max-w-[450px] bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100 snap-center shrink-0 relative"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 rotate-180" />
              
              <p className="text-lg leading-relaxed italic mb-8 relative z-10">
                "{item.quote}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden shrink-0 border-2 border-[#1056A5]">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-xs font-bold uppercase tracking-widest">{item.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;
