import React from 'react';
import CountUpModule from 'react-countup';
const CountUp = CountUpModule.default || CountUpModule;
import { Users, Globe, Building2, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { id: 1, title: 'Global Members', value: 5000, suffix: '+', icon: Users, color: 'text-blue-500' },
  { id: 2, title: 'Chapters', value: 15, suffix: '+', icon: Globe, color: 'text-green-500' },
  { id: 3, title: 'Active Projects', value: 50, suffix: '+', icon: Building2, color: 'text-[var(--color-sco-gold)]' },
  { id: 4, title: 'Committees', value: 100, suffix: '+', icon: HeartHandshake, color: 'text-red-500' },
];

const StatsGrid = () => {
  return (
    <section className="py-16 bg-[var(--color-sco-navy)] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center p-6"
              >
                <div className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 ${stat.color}`}>
                  <Icon size={32} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <CountUp end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                  <span className="text-[var(--color-sco-gold)]">{stat.suffix}</span>
                </div>
                <p className="text-gray-300 font-medium uppercase tracking-wider text-sm">
                  {stat.title}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsGrid;
