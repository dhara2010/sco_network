import React from 'react';
import { CheckCircle2, ArrowRight, Eye, Target, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const leaders = [
  { name: 'Nisarg Bhatt', role: 'CHAIRMAN', image: '/nisarg.png' },
  { name: 'Parth Kanjariya', role: 'VICE CHAIRMAN', image: '/parth.png' },
  { name: 'Punit Kanjariya', role: 'PRESIDENT', image: '/punit.png' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const AboutSection = () => {
  return (
    <section className="w-full bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f7f9] text-[#1056A5] text-xs font-bold tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FFC107]"></span>
              DISCOVER SCO
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1056A5] to-[#1a73e8]">Us</span>
            </h2>
          </div>
          <Link to="/about" className="inline-flex items-center gap-2 text-[#1056A5] font-bold hover:text-[#FFC107] transition-colors group">
            Explore Full Story <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Main About Box (Spans 8 columns) */}
          <motion.div variants={itemVariants} className="md:col-span-8 bg-[#071B4D] rounded-[2rem] p-8 md:p-12 relative overflow-hidden group flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1056A5] rounded-full blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity duration-700 -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="relative z-10">
              <Compass className="w-12 h-12 text-[#FFC107] mb-8 opacity-80" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-snug">
                Sathwara Community Organisation (SCO) is a unique, multi-stakeholder community of visionary community Industrialists, Businessmen & Professionals.
              </h3>
              <p className="text-lg leading-relaxed max-w-2xl font-light text-white">
                We share a commitment to shape the future of the community and society at large.
              </p>
            </div>
            
            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
              <h4 className="text-[#FFC107] font-bold text-sm tracking-widest uppercase mb-4">Our Purpose</h4>
              <ul className="grid sm:grid-cols-2 gap-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FFC107] shrink-0 mt-0.5" />
                  <span className="text-sm text-white">To support each other — not just in profit, but in purpose.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FFC107] shrink-0 mt-0.5" />
                  <span className="text-sm text-white">To open doors for the next generation through guidance.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column Stack (Spans 4 columns) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Vision Box */}
            <motion.div variants={itemVariants} className="flex-1 bg-[#F8F9FA] rounded-[2rem] p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Eye className="w-8 h-8 text-[#1056A5] mb-5" />
              <h3 className="font-black text-xl mb-3">OUR VISION</h3>
              <p className="text-sm leading-relaxed">
                To create a world where success is shared, knowledge is passed forward, and no one is left behind.
              </p>
            </motion.div>

            {/* Mission Box */}
            <motion.div variants={itemVariants} className="flex-1 bg-[#FFC107] rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(255,193,7,0.2)] hover:shadow-[0_15px_40px_rgba(255,193,7,0.3)] hover:-translate-y-1 transition-all duration-300">
              <Target className="w-8 h-8 text-[#071B4D] mb-5" />
              <h3 className="text-[#071B4D] font-black text-xl mb-3">OUR MISSION</h3>
              <p className="text-[#071B4D]/80 text-sm leading-relaxed font-medium">
                To bring together Jain entrepreneurs, professionals, and visionaries — not just for business, but for a greater good.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Leaders Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-2xl font-black">Our Leaders</h3>
            <div className="h-[1px] flex-1 bg-gray-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="group relative flex items-center p-4 bg-white rounded-[1.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Subtle hover background sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#f4f7f9] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="relative z-10 w-20 h-20 rounded-xl overflow-hidden border-2 border-transparent group-hover:border-[#FFC107] transition-colors duration-300 shrink-0 bg-gray-100">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative z-10 ml-5">
                  <h4 className="text-lg font-bold mb-1 group-hover:text-[#1056A5] transition-colors">{leader.name}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest">{leader.role}</p>
                </div>
                
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
