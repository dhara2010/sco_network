import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown } from 'lucide-react';

const IdeologySection = () => {
  const [showFullText, setShowFullText] = useState(false);

  return (
    <section className="w-full bg-[#f8f9fa] py-24 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#1056A5]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#FFC107]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[#1056A5] text-xs font-bold tracking-widest mb-6 shadow-sm border border-gray-100">
            <BookOpen size={14} />
            OUR GUIDING PRINCIPLES
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
            An <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC107] to-[#F57C00]">Ideology</span>
          </h2>
          <p className="text-lg">
            Our ideology defines the principles that guide our actions and inspire our vision for a stronger community.
          </p>
        </div>

        {/* Editorial Layout Wrapper */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-12 items-stretch">
            
            {/* Left: Image / Visual anchor */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#071B4D] to-[#1056A5] relative flex flex-col items-center justify-center p-12 overflow-hidden">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-xs mx-auto drop-shadow-2xl"
              >
                {/* The Mahadev image */}
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#FFC107] opacity-20 blur-2xl rounded-full"></div>
                  <img
                    src="./mahadev.png"
                    alt="Mahadev"
                    className="w-full h-auto object-contain relative z-10 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]"
                  />
                </div>
              </motion.div>
              
              <div className="relative z-10 mt-12 text-center">
                <p className="text-white/80 font-medium tracking-widest uppercase text-xs mb-2">Guided By</p>
                <p className="text-[#FFC107] font-bold text-lg">Jai Shiddhnath</p>
                <p className="text-white font-bold text-lg">Har Har Mahadev</p>
              </div>
            </div>

            {/* Right: Editorial Content */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 relative bg-white">
              <h3 className="font-black text-2xl md:text-3xl mb-8 leading-snug">
                Our Respected Brothers and Sisters,
              </h3>

              <div className="prose prose-lg max-w-none">
                <p className="leading-relaxed mb-6 font-medium">
                  We take immense pride in our rich heritage and the values passed
                  down by our forefathers. Their dedication, hard work, integrity,
                  unity, and commitment to social welfare have laid a strong
                  foundation for our community. Today, it is our responsibility to
                  carry forward this legacy and build a brighter future for
                  generations to come.
                </p>

                <p className="leading-relaxed mb-6">
                  SCO – Sathwara Community Organization is committed to creating a
                  platform that promotes education, skill development, youth
                  empowerment, cultural values, and community unity. Our vision is to
                  establish a landmark institution that serves as a center for
                  learning, growth, and social progress for the entire Sathwara
                  community.
                </p>

                <p className="leading-relaxed mb-8">
                  In the 21st century, knowledge, science, technology, and innovation
                  are the driving forces behind success. Our young men and women must
                  be equipped to meet global challenges, seize emerging opportunities,
                  and become self-reliant leaders of tomorrow.
                </p>

                {/* Collapsible Content */}
                <AnimatePresence>
                  {showFullText && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-6 border-t border-gray-100 mt-6">
                        <p className="leading-relaxed mb-6 font-bold">
                          We envision creating a comprehensive community development center
                          that will include:
                        </p>

                        <ul className="space-y-4 mb-8">
                          {[
                            "Modern hostel facilities for students pursuing higher education.",
                            "Skill development and career guidance centers for youth.",
                            "Facilities to support competitive examination preparation.",
                            "Spaces for community gatherings, cultural activities, and educational programs.",
                            "Resources that encourage entrepreneurship, leadership, and professional excellence.",
                            "A platform that strengthens unity, cooperation, and mutual support within the community."
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="w-6 h-6 rounded-full bg-[#f4f7f9] text-[#1056A5] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">{i+1}</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <p className="leading-relaxed mb-6">
                          Our goal is to bring together more than 51,000 members of the
                          Sathwara community under one shared vision of progress and
                          development. Through collective effort and strong community
                          participation, we can create a lasting institution that will serve
                          present and future generations.
                        </p>

                        <blockquote className="my-8 pl-6 border-l-4 border-[#FFC107] py-2 bg-gradient-to-r from-[#FFC107]/5 to-transparent rounded-r-lg">
                          <p className="text-xl italic font-semibold leading-relaxed m-0">
                            "Building a Strong Community is the Foundation of Building a Strong Nation."
                          </p>
                        </blockquote>

                        <div className="bg-[#0A1435] rounded-2xl p-6 text-center shadow-lg text-white mt-8">
                          <p className="font-bold tracking-widest text-sm text-[#FFC107] uppercase mb-2">
                            Unity • Education • Empowerment • Progress
                          </p>
                          <p className="font-black text-lg">
                            SCO – Sathwara Community Organization
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Fade Effect Overlay when closed */}
                {!showFullText && (
                  <div className="absolute bottom-24 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10"></div>
                )}
              </div>

              {/* Action Button */}
              <div className="relative z-20 mt-4 border-t border-gray-100 pt-6">
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  className="group flex items-center gap-2 text-[#1056A5] font-bold hover: transition-colors"
                >
                  <span className="border-b border-[#1056A5] group-hover:border-[#0A1435] pb-0.5 transition-colors">
                    {showFullText ? "Read Less" : "Continue Reading"}
                  </span>
                  <motion.div animate={{ rotate: showFullText ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={18} />
                  </motion.div>
                </button>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default IdeologySection;
