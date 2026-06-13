import React from 'react';
import { FaUsers, FaChartLine, FaShieldAlt, FaBookOpen, FaHandshake } from 'react-icons/fa';

const AboutUsPage = () => {
  return (
    <div className="w-full bg-white font-sans">

      {/* 1. Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center bg-[#1c2e4a] overflow-hidden">
        {/* Placeholder image layer for building */}
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('/about.png')" }}></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            Shaping the Future Together
          </h1>
          <p className="text-[#FFC107] text-sm md:text-base font-bold max-w-2xl tracking-wide drop-shadow">
            Join International Trade Organisation: A global community of visionary entrepreneurs and professionals.
          </p>
        </div>
      </section>

      {/* 2. Heritage & Stats Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div>
            <div className="inline-block px-3 py-1 bg-[#fff6e5] text-[#dca010] text-[10px] font-bold uppercase tracking-widest rounded-sm mb-6">OUR HERITAGE</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1435] leading-tight mb-8">
              A Legacy of Economic Prosperity and Social Service
            </h2>
            <div className="space-y-6 text-gray-500 text-sm leading-relaxed">
              <p>
                Founded on the pillars of Seva (Service), Shiksha (Education), and Arthik Sudradhata (Economic Strengthening), JITO has grown into a premier organization of Jain industrialists, entrepreneurs, and professionals worldwide.
              </p>
              <p>
                For decades, we have focused on creating a platform that fosters networking, business growth, and social responsibility, ensuring that the values of Jainism translate into modern economic excellence.
              </p>
            </div>
          </div>

          {/* Right Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#185bc3] text-white p-8 rounded-xl shadow-lg flex flex-col items-center justify-center text-center transform hover:-translate-y-1 transition-transform">
              <div className="text-3xl md:text-4xl font-black mb-1 text-[#FFC107]">15k+</div>
              <div className="text-[9px] font-bold tracking-[0.15em] uppercase mt-1">Global Members</div>
            </div>
            <div className="bg-[#cdccca] text-[#0A1435] p-8 rounded-xl shadow-lg flex flex-col items-center justify-center text-center transform hover:-translate-y-1 transition-transform">
              <div className="text-3xl md:text-4xl font-black mb-1">60+</div>
              <div className="text-[9px] font-bold tracking-[0.15em] uppercase mt-1">Chapters Worldwide</div>
            </div>
            <div className="bg-white border border-gray-100 text-[#ea5d24] p-8 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] flex flex-col items-center justify-center text-center transform hover:-translate-y-1 transition-transform">
              <div className="text-3xl md:text-4xl font-black mb-1 text-[#ea5d24]">500+</div>
              <div className="text-[9px] text-gray-500 font-bold tracking-[0.15em] uppercase mt-1">Events Annually</div>
            </div>
            <div className="bg-[#e45a1c] text-white p-8 rounded-xl shadow-lg flex flex-col items-center justify-center text-center transform hover:-translate-y-1 transition-transform">
              <div className="text-3xl md:text-4xl font-black mb-1 text-white">$2B+</div>
              <div className="text-[9px] font-bold tracking-[0.15em] uppercase mt-1">Invested Capital</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission Card */}
          <div className="bg-[#132349] rounded-3xl p-10 md:p-12 text-white relative overflow-hidden group">
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-8 h-8 rounded-full border border-[#f2b528] flex items-center justify-center text-[#f2b528]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold">Our Mission</h3>
            </div>
            <p className="text-[#a4b5d5] text-sm leading-relaxed relative z-10">
              Empowering the community through quality education, leadership development, and economic opportunities that pave the way for sustainable individual and collective growth.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-[#eebc2b] rounded-3xl p-10 md:p-12 text-[#0A1435] relative overflow-hidden group">
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-black/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-8 h-8 rounded-full border border-[#0A1435] flex items-center justify-center text-[#0A1435]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h3 className="text-2xl font-bold">Our Vision</h3>
            </div>
            <p className="text-[#3b455b] text-sm leading-relaxed relative z-10 font-medium">
              To build a strong, united, and prosperous global Sathwara community that leads by example, preserves our rich heritage, and contributes significantly to global progress.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Purpose & Pillars */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#0A1435] mb-6">Our Purpose</h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-3xl mb-16">
            Sathwara Community Organisation (SCO) is committed to connecting people across borders, supporting aspiring entrepreneurs, and providing a platform for youth to excel. We believe in the power of collective progress and cultural heritage. Our journey is rooted in the values of togetherness and shared prosperity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-[#0A1435] font-extrabold text-lg mb-3">Connecting</h3>
              <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
                We build bridges between families and global networks.
              </p>
            </div>
            <div>
              <h3 className="text-[#0A1435] font-extrabold text-lg mb-3">Supporting</h3>
              <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
                Mentoring the next generation of business leaders.
              </p>
            </div>
            <div>
              <h3 className="text-[#0A1435] font-extrabold text-lg mb-3">Empowering</h3>
              <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
                Creating opportunities for academic excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Stats Ribbon */}
      <section className="w-full bg-[#061125] py-20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#1a2b4c]">
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-black text-[#f2b528] mb-3">5000+</div>
              <div className="text-[9px] text-white font-bold tracking-[0.2em] uppercase">Active Members</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-black text-[#f2b528] mb-3">10+</div>
              <div className="text-[9px] text-white font-bold tracking-[0.2em] uppercase">Global Chapters</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-black text-[#f2b528] mb-3">50+</div>
              <div className="text-[9px] text-white font-bold tracking-[0.2em] uppercase">Annual Initiatives</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-black text-[#f2b528] mb-3">100%</div>
              <div className="text-[9px] text-white font-bold tracking-[0.2em] uppercase">Community Focused</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Core Values */}
      <section className="w-full bg-[#050912] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-white mb-16 text-center">Our Core Values</h2>

          <div className="flex flex-wrap justify-center gap-10 md:gap-20">

            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full border border-[#f2b528] flex items-center justify-center mb-4 group-hover:bg-[#f2b528]/10 transition-colors">
                <FaUsers className="w-6 h-6 text-[#f2b528]" />
              </div>
              <span className="text-white text-xs font-semibold">Unity</span>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full border border-[#f2b528] flex items-center justify-center mb-4 group-hover:bg-[#f2b528]/10 transition-colors">
                <FaChartLine className="w-6 h-6 text-[#f2b528]" />
              </div>
              <span className="text-white text-xs font-semibold">Growth</span>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full border border-[#f2b528] flex items-center justify-center mb-4 group-hover:bg-[#f2b528]/10 transition-colors">
                <FaShieldAlt className="w-6 h-6 text-[#f2b528]" />
              </div>
              <span className="text-white text-xs font-semibold">Leadership</span>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full border border-[#f2b528] flex items-center justify-center mb-4 group-hover:bg-[#f2b528]/10 transition-colors">
                <FaBookOpen className="w-6 h-6 text-[#f2b528]" />
              </div>
              <span className="text-white text-xs font-semibold">Education</span>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full border border-[#f2b528] flex items-center justify-center mb-4 group-hover:bg-[#f2b528]/10 transition-colors">
                <FaHandshake className="w-6 h-6 text-[#f2b528]" />
              </div>
              <span className="text-white text-xs font-semibold">Collaboration</span>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
