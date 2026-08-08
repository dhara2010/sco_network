import React from 'react';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="w-full relative py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-sm">
            Be Part of the Network
          </div>

          <h2 className="text-5xl md:text-7xl font-black  leading-none mb-8 tracking-tighter">
            Connect. <br className="md:hidden" />
            <span className="text-[#FFC107]">Collaborate.</span> <br className="md:hidden" />
            Grow.
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto mb-4">
            Join thousands of professionals driving innovation, sharing knowledge, and building the future together.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
