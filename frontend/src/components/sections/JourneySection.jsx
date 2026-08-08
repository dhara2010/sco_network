import React from 'react';
import { motion } from 'framer-motion';
import { Network, FileCheck, Users, TrendingUp } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Apply & Join',
    description: 'Submit your membership application to become part of the global Sathwara community.',
    icon: FileCheck
  },
  {
    id: '02',
    title: 'Connect Locally',
    description: 'Engage with your regional chapter and meet visionary leaders in your area.',
    icon: Users
  },
  {
    id: '03',
    title: 'Collaborate',
    description: 'Participate in projects, business initiatives, and social impact activities.',
    icon: Network
  },
  {
    id: '04',
    title: 'Grow Together',
    description: 'Expand your professional network and contribute to the community\'s success.',
    icon: TrendingUp
  }
];

const JourneySection = () => {
  return (
    <section className="py-24 bg-[#0A1435] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1056A5]/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FFC107]/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#FFC107] text-xs font-bold tracking-widest mb-4 border border-white/10 backdrop-blur-sm">
            HOW WE CONNECT
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            The SCO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC107] to-[#FFA000]">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            A simple, structured pathway to joining our global professional network and making a real impact.
          </p>
        </motion.div>

        {/* Horizontal Timeline Container */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-white/10 z-0">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              className="h-full bg-gradient-to-r from-[#FFC107] via-[#FFC107] to-transparent"
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Icon Node */}
                  <div className="w-20 h-20 rounded-2xl bg-[#0A1435] border border-white/20 flex items-center justify-center mb-8 relative group-hover:-translate-y-2 transition-transform duration-500 shadow-xl shadow-black/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                    <Icon className="w-8 h-8 text-[#FFC107] group-hover:scale-110 transition-transform duration-500" />
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#1056A5] text-white flex items-center justify-center text-xs font-black shadow-lg border-2 border-[#0A1435]">
                      {step.id}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FFC107] transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed max-w-[250px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default JourneySection;
