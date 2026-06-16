import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Download, TrendingUp, Folder, FileBarChart, PieChart, Star, Archive, ArrowRight } from 'lucide-react';

const categories = ['All Years', 'Main Board', 'Chapters', 'Projects'];

const AnnualReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('All Years');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const url = activeTab === 'All Years' 
          ? 'https://sco-network.onrender.com/api/reports/public' 
          : `https://sco-network.onrender.com/api/reports/public?category=${encodeURIComponent(activeTab)}`;
          
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load reports');
        setReports(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Hero Section */}
      <div className="bg-[#1056A5] text-white py-24 px-4 text-center relative overflow-hidden">
        {/* Subtle diagonal accent overlay similar to mockup */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0a3d7a] opacity-50 transform -skew-x-12 scale-150 origin-bottom-right pointer-events-none"></div>
        
        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-[46px] font-extrabold mb-5 tracking-tight"
          >
            Annual Reports
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-[16px] md:text-[18px] opacity-90 mb-10 leading-relaxed font-light"
          >
            Explore SCO's yearly achievements, financial reports, and organizational milestones across the globe.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/voice-of-sco" className="bg-[#fdb813] text-[#0B2B5B] font-bold text-[15px] px-8 py-3.5 rounded-lg hover:bg-[#e2a411] transition-colors shadow-md flex items-center gap-2">
              <Download size={18} />
              Latest Report 2024-25
            </Link>
            <Link to="/projects" className="bg-white/10 border border-white/30 text-white font-bold text-[15px] px-8 py-3.5 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm">
              Financial Highlights
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        
        {/* Header */}
        <div className="mb-10">
          <div>
            <h2 className="text-[26px] font-extrabold text-[#0B2B5B]">Report Archive</h2>
            <p className="text-gray-500 text-sm mt-1">Browse through historical documents</p>
          </div>
        </div>

        {/* Report Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {loading ? (
             <div className="col-span-full text-center py-20 text-[#0B2B5B] font-bold">Loading reports...</div>
          ) : error ? (
             <div className="col-span-full text-center py-20 text-red-600 font-bold">Error: {error}</div>
          ) : reports.length === 0 ? (
             <div className="col-span-full text-center py-20 text-gray-500 font-medium bg-gray-50 rounded-2xl border border-gray-100">No approved reports available for this category yet.</div>
          ) : (
            reports.map((report, index) => {
              const hasBg = !!report.coverImage;
              return (
                <div key={report._id} 
                  className={`rounded-[20px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05),0_10px_20px_-2px_rgba(0,0,0,0.02)] border ${hasBg ? 'border-transparent' : 'border-gray-100'} p-8 flex flex-col items-center relative hover:-translate-y-1 transition-transform duration-300 group ${hasBg ? '' : 'bg-white'}`}
                  style={hasBg ? { backgroundImage: `url(${report.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                >
                  {/* Overlay for readability - fades in on hover */}
                  {hasBg && <div className="absolute inset-0 bg-[#0B2B5B]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"></div>}

                  {/* Ribbon for newest report */}
                  {index === 0 && activeTab === 'All Years' && (
                    <div className="absolute top-0 right-0 bg-[#fef5d9] p-3 rounded-bl-3xl rounded-tr-[20px] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <Star size={20} className="text-[#fdb813] fill-current" />
                    </div>
                  )}

                  {/* Relative Content Container - all text hidden by default */}
                  <div className="relative z-10 flex flex-col items-center justify-center w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <h3 className={`text-[48px] font-extrabold leading-none mb-4 ${hasBg ? 'text-white' : 'text-[#0B2B5B]'}`}>{report.reportYear}</h3>
                    
                    <p className={`text-[14px] font-medium text-center mb-8 line-clamp-3 ${hasBg ? 'text-blue-50' : 'text-gray-500'}`}>{report.title}</p>
                    
                    <a 
                      href={report.reportFile} 
                      target="_blank" 
                      rel="noreferrer"
                      className={`w-full py-3 mt-auto rounded-xl font-bold text-[14px] transition-colors border flex items-center justify-center gap-2 ${
                        hasBg 
                          ? 'bg-white/20 hover:bg-white text-white hover:text-[#0B2B5B] border-white/30 backdrop-blur-sm' 
                          : 'bg-[#F8F9FA] text-[#0B2B5B] hover:bg-[#1056A5] hover:text-white border-gray-100'
                      }`}
                    >
                      View Report <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              );
            })
          )}

          {/* Special Historical Archive Card */}
          <div className="bg-[#1056A5] rounded-[20px] shadow-lg p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
             {/* Diagonal accent inside the card */}
             <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0a3d7a] opacity-60 transform -skew-x-12 scale-150 pointer-events-none"></div>
             
             <div className="relative z-10 flex flex-col items-center w-full h-full">
               <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-[#fdb813] mb-5">
                 <Archive size={28} strokeWidth={1.5} />
               </div>
               <h3 className="text-[28px] font-extrabold text-white leading-tight mb-2">Historical<br/>Archive</h3>
               <p className="text-[13px] font-medium text-blue-100 mb-8 opacity-80">Reports prior to 2019</p>
               
               <Link to="/voice-of-sco" className="mt-auto w-full py-3 rounded-xl bg-[#fdb813] text-[#0B2B5B] font-bold text-[14px] hover:bg-[#e2a411] transition-colors flex items-center justify-center gap-2 shadow-sm">
                 Access Archive <ArrowRight size={14} />
               </Link>
             </div>
          </div>

        </div>

        {/* Newsletter Subscription Box */}
        <div className="mt-20 bg-[#fffdf5] border border-[#fef0c7] rounded-[24px] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-[22px] font-extrabold text-[#0B2B5B] mb-2">Stay updated with SCO</h3>
            <p className="text-[15px] text-gray-600 font-medium">Subscribe to receive monthly newsletters and instant notifications when new reports are published.</p>
          </div>
          
          <div className="w-full lg:w-auto flex-1 max-w-md">
            <div className="flex bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-transparent px-4 py-2 text-[15px] outline-none text-[#0B2B5B] placeholder-gray-400"
              />
              <Link to="/contact" className="bg-[#0B2B5B] text-white px-8 py-3 rounded-lg font-bold text-[14px] hover:bg-[#0a1a3a] transition-colors flex items-center justify-center">
                Subscribe
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnnualReportsPage;
