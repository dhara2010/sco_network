import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const leaders = [
  {
    name: 'Nisarg Bhatt',
    role: 'CHAIRMAN',
    image: '/nisarg.png'
  },
  {
    name: 'Parth Kanjariya',
    role: 'VICE CHAIRMAN',
    image: '/parth.png'
  },
  {
    name: 'Punit Kanjariya',
    role: 'PRESIDENT',
    image: '/punit.png'
  }
];

const AboutSection = () => {
  return (
    <section className="w-full font-sans py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left Column - Our Leaders */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1435] uppercase tracking-tight">
              OUR <span className="text-[#FFC107]">LEADERS</span>
            </h2>
            <div className="w-16 h-1 bg-[#FFC107] mt-3 mb-10"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {leaders.map((leader, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-50 hover:-translate-y-1 transition-transform duration-300 max-w-md"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-[#FFC107] flex-shrink-0 shadow-sm bg-gray-100">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-[#0A1435] mb-1">{leader.name}</h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{leader.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - About Us */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1435] uppercase tracking-tight">
              ABOUT <span className="text-[#FFC107]">US</span>
            </h2>
            <div className="w-16 h-1 bg-[#FFC107] mt-3 mb-8"></div>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              Sathwara Community Organisation (SCO) is a unique, multi-stakeholder community of visionary community Industrialists, Businessmen & Professionals who share a commitment to shape the future of the community and society at large.
            </p>

            <div className="mb-6">
              <h3 className="text-[#0A1435] font-bold text-base uppercase mb-2">OUR VISION</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                To create a world where success is shared, knowledge is passed forward, and no one is left behind.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-[#0A1435] font-bold text-base uppercase mb-2">OUR MISSION</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                To bring together Jain entrepreneurs, professionals, and visionaries — not just for business, but for a greater good.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-[#0A1435] font-bold text-base uppercase mb-3">OUR PURPOSE</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FFC107] flex-shrink-0 mt-0.5 fill-[#FFC107]/20" />
                  <span className="text-gray-500 text-sm leading-relaxed">
                    To support each other — not just in profit, but in purpose.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FFC107] flex-shrink-0 mt-0.5 fill-[#FFC107]/20" />
                  <span className="text-gray-500 text-sm leading-relaxed">
                    To open doors for the next generation through guidance and mentorship.
                  </span>
                </li>
              </ul>
            </div>

            <Link to="/about" className="inline-block bg-[#FFC107] text-[#0A1435] font-bold px-8 py-3 rounded-full shadow-lg shadow-yellow-500/30 hover:bg-[#f5b700] hover:-translate-y-0.5 transition-all duration-300">
              Know More
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
