import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunitySection = () => {
  return (
    <section className="w-full font-sans py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Hero-like Area */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mb-24 relative">

          {/* Subtle background glow effect (optional, based on image) */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-yellow-100/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

          {/* Left Content */}
          <div className="flex-1 max-w-2xl w-full">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFF5D1] text-[#0A1435] text-xs font-bold uppercase tracking-widest mb-6">
              <Shield className="w-3 h-3" />
              <span>Founded On Unity</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A1435] leading-[1.1] mb-6 tracking-tight">
              Empowering the <br className="hidden sm:block" />
              Sathwara <br className="hidden sm:block" />
              Community
            </h1>

            {/* Paragraph */}
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-xl">
              Uniting our global network for sustainable growth, education, and collective prosperity. Building a bridge between our rich heritage and a brighter future.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/register" className="w-full text-center sm:w-auto px-8 py-3.5 bg-[#0A1435] text-white font-semibold rounded-lg shadow-lg shadow-blue-900/20 hover:bg-[#112255] transition-all duration-300">
                Get Involved Today
              </Link>
              <Link to="/about" className="w-full text-center sm:w-auto px-8 py-3.5 bg-white text-[#0A1435] font-semibold rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Content - Logo Card */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative z-10">
            <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] w-full max-w-[500px] flex items-center justify-center">
              <img
                src="/logo.png"
                alt="SCO Network - Sathwara Community Organization"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
