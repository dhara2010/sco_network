import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUpModule from 'react-countup';
import { Shield, Target, Users, BookOpen, Handshake, ChevronRight, Sparkles, Globe, Briefcase, GraduationCap } from 'lucide-react';

const CountUp = CountUpModule.default || CountUpModule;

const AboutUsPage = () => {
  const coreValues = [
    { icon: Users, label: 'Unity', desc: 'Building unbreakable bonds across the globe' },
    { icon: Target, label: 'Growth', desc: 'Fostering collective economic prosperity' },
    { icon: Shield, label: 'Leadership', desc: 'Guiding the next generation of visionaries' },
    { icon: BookOpen, label: 'Education', desc: 'Empowering minds through knowledge' },
    { icon: Handshake, label: 'Collaboration', desc: 'Creating synergistic opportunities' },
  ];

  return (
    <div className="w-full bg-slate-50 font-sans min-h-screen">
      {/* 1. Immersive Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-[#0A1435]">
        {/* Background Image with Deep Overlay */}
        <div className="absolute inset-0 z-0">
          <img src="/about.png" alt="About SCO Network" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1435]/90 via-[#112255]/80 to-[#0A1435]/90"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-40 z-0 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#FFC107] rounded-full mix-blend-multiply filter blur-[100px] opacity-30"
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }} 
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFC107] text-xs font-bold tracking-widest uppercase mb-8 shadow-2xl"
          >
            <Sparkles className="w-4 h-4" />
            Discover SCO Network
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight drop-shadow-2xl leading-tight"
          >
            Shaping The Future <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC107] to-[#ffda6a]">Together.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-6 md:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl max-w-3xl"
          >
            <p className="text-gray-300 text-sm md:text-base lg:text-lg font-medium leading-relaxed">
              We are a global community of visionary entrepreneurs, professionals, and industrialists. By combining modern economic excellence with deep-rooted cultural values, we are building a legacy of shared prosperity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Heritage & Collage Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 text-[#0A1435] font-black tracking-widest uppercase text-sm mb-4">
              <div className="w-8 h-1 bg-[#FFC107] rounded-full"></div>
              Our Heritage
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A1435] leading-tight mb-8">
              A Legacy of <br className="hidden md:block" />
              <span className="text-gray-400">Prosperity & Service</span>
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Founded on the enduring pillars of <span className="font-bold text-[#0A1435]">Seva</span> (Service), <span className="font-bold text-[#0A1435]">Shiksha</span> (Education), and <span className="font-bold text-[#0A1435]">Arthik Sudradhata</span> (Economic Strengthening), we have grown into a premier global organization.
              </p>
              <p>
                For decades, we have focused on creating an unshakeable platform that fosters elite networking, sustainable business growth, and profound social responsibility.
              </p>
            </div>
            <Link to="/projects" className="mt-10 group flex items-center gap-3 text-[#0A1435] font-bold hover:text-[#FFC107] transition-colors">
              Explore our Timeline
              <div className="w-10 h-10 rounded-full bg-[#0A1435] group-hover:bg-[#FFC107] flex items-center justify-center text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          </motion.div>

          {/* Right Floating Image Collage */}
          <div className="relative h-[500px] w-full hidden md:block">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 right-0 w-2/3 h-[300px] rounded-[40px] overflow-hidden shadow-2xl z-10 hover:z-30 hover:scale-105 transition-transform duration-500 border-8 border-white"
            >
              <img src="/img1.png" alt="Community Event" className="w-full h-full object-cover" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-10 left-0 w-[55%] h-[250px] rounded-[40px] overflow-hidden shadow-2xl z-20 hover:z-30 hover:scale-105 transition-transform duration-500 border-8 border-white"
            >
              <img src="/img2.png" alt="Leadership" className="w-full h-full object-cover" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-0 right-10 w-[45%] h-[200px] rounded-[40px] overflow-hidden shadow-2xl z-30 hover:scale-105 transition-transform duration-500 border-8 border-white"
            >
              <img src="/img3.png" alt="Networking" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Animated Stats Strip */}
      <section className="w-full bg-[#FFC107] py-16 relative z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-[#0A1435]">
            <div className="flex flex-col items-center justify-center text-center group">
              <Users className="w-8 h-8 mb-4 opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-300" />
              <div className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                <CountUp end={15000} suffix="+" enableScrollSpy scrollSpyOnce />
              </div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase opacity-80">Global Members</div>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center group">
              <Globe className="w-8 h-8 mb-4 opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-300" />
              <div className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                <CountUp end={60} suffix="+" enableScrollSpy scrollSpyOnce />
              </div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase opacity-80">Chapters Worldwide</div>
            </div>

            <div className="flex flex-col items-center justify-center text-center group">
              <Briefcase className="w-8 h-8 mb-4 opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-300" />
              <div className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                $<CountUp end={2} suffix="B+" enableScrollSpy scrollSpyOnce />
              </div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase opacity-80">Invested Capital</div>
            </div>

            <div className="flex flex-col items-center justify-center text-center group">
              <GraduationCap className="w-8 h-8 mb-4 opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-300" />
              <div className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                <CountUp end={500} suffix="+" enableScrollSpy scrollSpyOnce />
              </div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase opacity-80">Annual Events</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bento Box: Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
          
          {/* Mission Card - Spans 8 cols */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 bg-gradient-to-br from-[#132349] to-[#0A1435] rounded-[40px] p-10 md:p-14 text-white relative overflow-hidden group shadow-xl"
          >
            {/* Oversized Background Icon */}
            <Target className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 group-hover:scale-110 transition-transform duration-700" strokeWidth={1} />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#FFC107] rounded-2xl">
                  <Target className="w-6 h-6 text-[#0A1435]" />
                </div>
                <h3 className="text-3xl font-black tracking-tight">Our Mission</h3>
              </div>
              <p className="text-[#a4b5d5] text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                Empowering the community through elite education, leadership development, and economic opportunities that pave the way for sustainable individual and collective growth.
              </p>
            </div>
          </motion.div>

          {/* Vision Card - Spans 4 cols */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4 bg-white border border-gray-100 rounded-[40px] p-10 md:p-14 text-[#0A1435] relative overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow"
          >
            <Shield className="absolute -top-10 -right-10 w-48 h-48 text-slate-50 group-hover:scale-110 transition-transform duration-700" strokeWidth={1} />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#0A1435] rounded-2xl">
                  <Shield className="w-6 h-6 text-[#FFC107]" />
                </div>
                <h3 className="text-3xl font-black tracking-tight">Our Vision</h3>
              </div>
              <p className="text-gray-500 text-lg font-medium leading-relaxed">
                To build a strong, united, and globally prosperous community that leads by example.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 5. Floating Core Values */}
      <section className="w-full bg-[#050912] py-24 md:py-32 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[#112255] rounded-full filter blur-[150px] opacity-30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Pillars of Our Community</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">The foundational values that drive our global network.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group"
                >
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3 + index, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#132349] to-[#0A1435] border border-[#FFC107]/30 flex items-center justify-center mb-6 shadow-lg shadow-[#FFC107]/10 group-hover:scale-110 transition-transform duration-300"
                  >
                    <Icon className="w-8 h-8 text-[#FFC107]" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-white text-xl font-bold mb-3">{value.label}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;
