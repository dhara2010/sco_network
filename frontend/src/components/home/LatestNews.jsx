import React from 'react';
import { motion } from 'framer-motion';

const events = [
  { id: 1, title: 'Annual Global Summit 2026', date: 'Oct 15, 2026', location: 'Ahmedabad, Gujarat', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Business Networking Meet', date: 'Nov 10, 2026', location: 'Surat, Gujarat', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Youth Excellence Awards', date: 'Dec 05, 2026', location: 'Mumbai, Maharashtra', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600' },
];

const LatestNews = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-sco-navy)] uppercase mb-4">Latest <span className="text-[var(--color-sco-gold)]">Events</span></h2>
            <div className="w-24 h-1 bg-[var(--color-sco-navy)]"></div>
          </div>
          <button className="hidden md:block px-6 py-2 bg-[var(--color-sco-navy)] text-white font-semibold rounded-full hover:bg-[var(--color-sco-gold)] hover:text-[var(--color-sco-navy)] transition-colors">
            View All Events
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[var(--color-sco-gold)] text-[var(--color-sco-navy)] px-3 py-1 font-bold rounded-md text-sm">
                  {event.date}
                </div>
              </div>
              <div className="p-6 border-t-4 border-[var(--color-sco-navy)]">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--color-sco-navy)] transition-colors">{event.title}</h3>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <button className="px-6 py-2 bg-[var(--color-sco-navy)] text-white font-semibold rounded-full hover:bg-[var(--color-sco-gold)] hover:text-[var(--color-sco-navy)] transition-colors">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
