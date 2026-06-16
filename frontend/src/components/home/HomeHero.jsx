import React from 'react';
import { motion } from 'framer-motion';

const HomeHero = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <img 
          src="/images/hero-banner.jpg" 
          alt="SCO Network Banner" 
          className="w-full h-full object-cover opacity-60"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-sco-navy)]/80 to-transparent"></div>
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase tracking-wider">
            Empowering the <span className="text-[var(--color-sco-gold)]">Kathiyawadi</span> Community
          </h1>
          <p className="text-lg md:text-2xl mb-8 font-light text-gray-200">
            A Global Network for Business, Culture, and Social Development
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-[var(--color-sco-gold)] text-[var(--color-sco-navy)] font-bold rounded-full hover:bg-yellow-400 transition-colors shadow-lg">
              Join Our Network
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[var(--color-sco-navy)] transition-colors">
              Explore Projects
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeHero;
