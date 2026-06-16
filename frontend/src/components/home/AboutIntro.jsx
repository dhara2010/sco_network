import React from 'react';
import { motion } from 'framer-motion';

const AboutIntro = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-sco-navy)] mb-6 uppercase">
              Welcome to <span className="text-[var(--color-sco-gold)]">SCO Network</span>
            </h2>
            <div className="w-20 h-1 bg-[var(--color-sco-gold)] mb-6"></div>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              SCO (Saurashtra Corporate Organization) Network is a premier platform dedicated to uniting and empowering the Kathiyawadi community across the globe. We foster an ecosystem of business networking, social responsibility, and cultural preservation.
            </p>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              Our initiatives span across various sectors including education, healthcare, entrepreneurship, and community welfare, creating a lasting impact on society.
            </p>
            <button className="px-6 py-2 border-2 border-[var(--color-sco-navy)] text-[var(--color-sco-navy)] font-semibold rounded-full hover:bg-[var(--color-sco-navy)] hover:text-white transition-colors">
              Read More About Us
            </button>
          </motion.div>

          {/* Image/Logo Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gray-50 flex items-center justify-center p-8">
              <img 
                src="/logo.png" 
                alt="SCO Logo Large" 
                className="w-full h-auto object-contain"
                onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=SCO+Logo"; }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
