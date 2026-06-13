import React, { useState } from 'react';
import { FaArrowRight, FaThLarge, FaList, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const magazines = [
  {
    id: 1,
    title: 'January 2024 Issue',
    description: 'Focus: Youth Empowerment & Sustainable Ventures',
    image: '/report1.jpg'
  },
  {
    id: 2,
    title: 'December 2023 Edition',
    description: 'Year in Review: Milestones and Member Success Stories',
    image: '/report2.jpg'
  },
  {
    id: 3,
    title: 'Special Convention 2023',
    description: 'Innovation & Tech: Shaping the Future of Business',
    image: '/report3.jpg'
  },
  {
    id: 4,
    title: 'Global Summit Special',
    description: 'Global Networking: Connecting Jain Business Minds Globally',
    image: '/report4.jpg'
  }
];

const VoiceOfScoPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  return (
    <div className="w-full bg-white font-sans min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. Dark Rounded Hero Banner */}
        <div className="w-full rounded-3xl overflow-hidden relative shadow-2xl mb-24" style={{ background: 'linear-gradient(135deg, #051630 0%, #08244f 100%)' }}>

          <div className="flex flex-col lg:flex-row items-center relative z-10 px-8 py-16 lg:p-20">

            {/* Left Content */}
            <div className="lg:w-1/2 text-left mb-16 lg:mb-0">
              <span className="inline-block bg-[#1f375a] text-[#f2b528] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-6 border border-white/10">
                OFFICIAL PUBLICATION
              </span>

              <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight">
                Voice of <span className="text-[#f2b528]">SCO</span>
              </h1>

              <p className="text-blue-100/80 text-base md:text-lg max-w-lg mb-10 leading-relaxed font-light">
                Official magazine highlighting SCO initiatives, events, and achievements. Stay connected with our global community of Jain professionals and entrepreneurs.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button onClick={() => alert('Coming soon!')} className="w-full sm:w-auto bg-[#f2b528] hover:bg-[#e0a41d] text-[#0A1435] font-bold py-3.5 px-8 rounded flex items-center justify-center transition-colors shadow-lg">
                  Latest Issue <FaArrowRight className="ml-2 w-3.5 h-3.5" />
                </button>
                <button onClick={() => alert('Archive coming soon!')} className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold py-3.5 px-8 rounded transition-colors backdrop-blur-sm">
                  Browse Archive
                </button>
              </div>
            </div>

            {/* Right 3D Magazine Graphic */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end relative h-[400px] lg:h-[500px] w-full">
              <div className="relative w-[280px] h-[380px] lg:w-[340px] lg:h-[460px] perspective-1000 mt-10 lg:mt-0 mr-0 lg:mr-10">
                {/* Back Layer (Blurred/Darkened) */}
                <div
                  className="absolute inset-0 rounded shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-6 translate-x-4 translate-y-4 bg-cover bg-center brightness-50"
                  style={{ backgroundImage: `url(${magazines[1].image})` }}
                ></div>
                {/* Front Layer */}
                <div
                  className="absolute inset-0 rounded shadow-[0_30px_60px_rgba(0,0,0,0.6)] transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 bg-cover bg-center border border-white/10 overflow-hidden flex flex-col justify-end p-6"
                  style={{ backgroundImage: `url(${magazines[0].image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1435]/90 via-[#0A1435]/40 to-transparent"></div>
                  <div className="relative z-10">
                    <span className="text-[#f2b528] text-[10px] font-bold tracking-wider uppercase mb-1 block drop-shadow-md">
                      FEATURED NOW
                    </span>
                    <h3 className="text-white text-xl font-bold leading-tight drop-shadow-md">
                      Innovation Summit 2024
                    </h3>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Recent Issues Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-100 pb-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-3xl font-extrabold text-[#0A1435]">Recent Issues</h2>
              <div className="h-1.5 w-16 bg-[#f2b528] rounded-full mt-1"></div>
            </div>
            <p className="text-gray-500 text-sm">Explore our history of excellence and community growth</p>
          </div>

          <div className="flex gap-2 mt-6 md:mt-0">
            <button 
              onClick={() => setViewMode('grid')}
              className={`w-10 h-10 rounded border flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'border-[#0A1435] text-[#0A1435] bg-gray-50' : 'border-gray-200 text-gray-400 hover:bg-gray-50'}`}
            >
              <FaThLarge className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`w-10 h-10 rounded border flex items-center justify-center transition-colors ${viewMode === 'list' ? 'border-[#0A1435] text-[#0A1435] bg-gray-50' : 'border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
            >
              <FaList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. Magazine Grid / List View */}
        <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" : "flex flex-col gap-6"}>
          {magazines.map((mag) => (
            viewMode === 'grid' ? (
              <div key={mag.id} className="group flex flex-col h-full">
                {/* Cover */}
                <div className="w-full aspect-[2/3] rounded-lg overflow-hidden mb-6 shadow-sm border border-gray-100 relative bg-gray-100">
                  <img src={mag.image} alt={mag.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>

                {/* Info */}
                <h3 className="text-[#0A1435] font-extrabold text-lg leading-snug mb-2">
                  {mag.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-6 flex-grow">
                  {mag.description}
                </p>

                {/* View Button */}
                <button onClick={() => alert('Magazine viewer coming soon!')} className="w-full py-2.5 border border-gray-200 rounded text-[#0A1435] text-xs font-bold hover:bg-[#0A1435] hover:text-white transition-colors flex items-center justify-center gap-2">
                  View Magazine <FaExternalLinkAlt className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div key={mag.id} className="group flex flex-col sm:flex-row bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Cover (smaller for list) */}
                <div className="w-full sm:w-48 aspect-[2/3] shrink-0 bg-gray-100 relative overflow-hidden">
                  <img src={mag.image} alt={mag.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                
                {/* Info */}
                <div className="p-6 flex flex-col justify-center flex-grow">
                  <h3 className="text-[#0A1435] font-extrabold text-xl leading-snug mb-3">
                    {mag.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-2xl">
                    {mag.description}
                  </p>
                  <div>
                    <button onClick={() => alert('Magazine viewer coming soon!')} className="inline-flex py-2.5 px-6 border border-gray-200 rounded text-[#0A1435] text-xs font-bold hover:bg-[#0A1435] hover:text-white transition-colors items-center justify-center gap-2">
                      View Magazine <FaExternalLinkAlt className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* 4. Pagination */}
        <div className="flex items-center justify-center gap-2 mt-20">
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#0A1435] hover:border-gray-300 transition-colors">
            <FaChevronLeft className="w-3 h-3" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#0A1435] text-white flex items-center justify-center text-sm font-bold shadow-md">
            1
          </button>
          <button className="w-10 h-10 rounded-full bg-transparent text-gray-500 flex items-center justify-center text-sm font-bold hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="w-10 h-10 rounded-full bg-transparent text-gray-500 flex items-center justify-center text-sm font-bold hover:bg-gray-50 transition-colors">
            3
          </button>
          <span className="text-gray-400 mx-1">...</span>
          <button className="w-10 h-10 rounded-full bg-transparent text-gray-500 flex items-center justify-center text-sm font-bold hover:bg-gray-50 transition-colors">
            12
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#0A1435] hover:border-gray-300 transition-colors">
            <FaChevronRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default VoiceOfScoPage;
