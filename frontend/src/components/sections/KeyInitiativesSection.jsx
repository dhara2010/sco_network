import React from 'react';
import { TrendingUp, Landmark, Globe, GraduationCap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const initiatives = [
  {
    title: 'Business Development',
    description: 'Empowering entrepreneurs and local businesses through targeted mentorship, strategic networking, and capital access.',
    icon: TrendingUp,
    accent: 'bg-blue-50 text-blue-600',
    hoverAccent: 'group-hover:bg-blue-600 group-hover:text-white'
  },
  {
    title: 'Civil Service',
    description: 'Supporting aspirants in administrative careers and public leadership roles with dedicated resources and guidance.',
    icon: Landmark,
    accent: 'bg-emerald-50 text-emerald-600',
    hoverAccent: 'group-hover:bg-emerald-600 group-hover:text-white'
  },
  {
    title: 'Global Network',
    description: 'Connecting Sathwara members worldwide to share cultural values, preserve heritage, and unlock global opportunities.',
    icon: Globe,
    accent: 'bg-amber-50 text-amber-600',
    hoverAccent: 'group-hover:bg-amber-500 group-hover:text-white'
  },
  {
    title: 'Youth Org',
    description: 'Developing future leaders through specialized skill workshops, education grants, and youth-focused programs.',
    icon: GraduationCap,
    accent: 'bg-purple-50 text-purple-600',
    hoverAccent: 'group-hover:bg-purple-600 group-hover:text-white'
  }
];

const KeyInitiativesSection = () => {
  return (
    <section className="w-full bg-[#F8F9FA] py-24 relative overflow-hidden border-t border-gray-100">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#1056A5 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-[#1056A5] text-xs font-bold tracking-widest mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FFC107]"></span>
              CORE PILLARS
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1056A5] to-[#1a73e8]">SCO Network?</span>
            </h2>
            <p className="text-lg">
              We focus on the core pillars that drive real progress, providing tangible value to our community members worldwide.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/become-member" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A1435] text-white rounded-full font-bold hover:bg-[#1056A5] transition-colors shadow-lg hover:shadow-xl group">
              Join the Network <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Initiatives Grid (2x2 layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {initiatives.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col sm:flex-row gap-6 p-8 md:p-10 bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300 ${item.accent} ${item.hoverAccent}`}>
                  <Icon strokeWidth={2} size={28} className="transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-[#1056A5] transition-colors">
                    {item.title}
                  </h3>

                  <p className="leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default KeyInitiativesSection;
