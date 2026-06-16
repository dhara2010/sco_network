import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building, Phone, GraduationCap, User, BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const designationsOrder = [
  'Board of Directors',
  'Working Committee',
  'Statutory Committee',
  'Project/Wing Committee',
  'Zone Chairman',
  'Chapter Chairman',
  'Chief Secretary'
];

const CommitteeMembersPage = () => {
  const [groupedMembers, setGroupedMembers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(designationsOrder[0]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch('https://sco-network.onrender.com/api/members/public');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load committee members');
        setGroupedMembers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-blue-900 text-xl font-bold pt-20">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-bold pt-20">Error: {error}</div>;

  const currentMembers = groupedMembers[activeTab] || [];
  const itemsPerPage = 8;
  const totalPages = Math.ceil(currentMembers.length / itemsPerPage) || 1;
  const displayedMembers = currentMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-white pb-16 mt-14">
      {/* Hero Section */}
      <div className="bg-[#1056A5] text-white py-24 px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-[44px] font-extrabold mb-5 tracking-tight"
        >
          Committee Members
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-[700px] mx-auto text-[17px] opacity-95 mb-10 leading-relaxed"
        >
          Our leadership and governance driving global trade and social empowerment through vision and dedication.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-5"
        >
          <button className="bg-[#fdb813] text-[#0B2B5B] font-bold text-sm px-7 py-3 rounded hover:bg-[#e2a411] transition-colors shadow-sm">
            View Charter
          </button>
          <button className="border border-white/60 text-white font-bold text-sm px-7 py-3 rounded hover:bg-white/10 transition-colors">
            Annual Report
          </button>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Navigation Tabs */}
        <div className="w-full border-b border-gray-100 flex justify-center mb-12 overflow-x-auto no-scrollbar">
          <div className="flex gap-8 sm:gap-12 pb-[1px] whitespace-nowrap px-4">
            {designationsOrder.map((desig) => (
              <button 
                key={desig} 
                onClick={() => { setActiveTab(desig); setCurrentPage(1); }}
                className={`pb-4 font-bold text-[13px] tracking-wide transition-colors relative ${activeTab === desig ? 'text-[#0B2B5B]' : 'text-gray-500 hover:text-gray-800'}`}
              >
                {desig}
                {activeTab === desig && (
                  <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 w-full h-[3px] bg-[#fdb813]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Member Grid */}
        <motion.div 
          key={activeTab + currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
        >
          {displayedMembers.map(member => (
            <div key={member._id} className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 border border-gray-100 p-7 flex flex-col items-center">
              
              {/* Profile Picture with Badge */}
              <div className="relative w-[110px] h-[110px] mb-3">
                <div className="w-full h-full rounded-full overflow-hidden shadow-sm bg-[#849b91]">
                  {member.profilePicture ? (
                    <img src={member.profilePicture} alt={member.fullName} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-white">
                      <User size={50} />
                    </div>
                  )}
                </div>
                {/* Badge Icon */}
                <div className="absolute bottom-0 right-0 bg-[#fdb813] p-1.5 rounded-full border-[3px] border-white shadow-sm flex items-center justify-center">
                  <BadgeCheck size={15} className="text-[#0B2B5B] fill-current" />
                </div>
              </div>

              {/* Name and Designation */}
              <h3 className="text-[20px] font-extrabold text-[#0B2B5B] text-center w-full truncate mt-3">{member.fullName}</h3>
              <div className="flex items-center justify-center gap-1.5 text-[13px] font-semibold text-[#6B7280] mt-1.5">
                <BadgeCheck size={14} className="text-[#fdb813]" />
                <span>{member.designation}</span>
              </div>

              {/* Divider */}
              <div className="w-full border-t border-gray-100/80 my-5"></div>

              {/* Details List */}
              <div className="w-full space-y-4 text-[13px] font-medium text-[#4B5563] mb-7 flex-grow px-1">
                {member.companyName && (
                  <div className="flex items-center gap-3.5">
                    <Building size={16} className="text-[#0B2B5B] shrink-0" />
                    <span className="truncate">{member.companyName}</span>
                  </div>
                )}
                {member.occupation && (
                  <div className="flex items-center gap-3.5">
                    <GraduationCap size={16} className="text-[#0B2B5B] shrink-0" />
                    <span className="truncate">{member.occupation}</span>
                  </div>
                )}
                {member.mobile && (
                  <div className="flex items-center gap-3.5">
                    <Phone size={16} className="text-[#0B2B5B] shrink-0" />
                    <span className="truncate">+91 {member.mobile.replace(/^\+91\s*/, '')}</span>
                  </div>
                )}
              </div>

              {/* View Profile Button */}
              <div className="mt-6">
                <Link to={`/member/${member._id}`} className="w-full block text-center py-2.5 rounded-xl bg-[#F8F9FA] text-[#0B2B5B] font-bold text-[14px] hover:bg-[#E5E7EB] transition-colors shadow-sm border border-gray-50">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
        
        {displayedMembers.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-500">No members found in this committee.</h3>
          </div>
        )}

        {/* Pagination UI */}
        {totalPages > 0 && (
          <div className="flex justify-center items-center mt-16 gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            
            {[...Array(totalPages)].map((_, idx) => {
              const pageNumber = idx + 1;
              const isCurrent = pageNumber === currentPage;
              // Show limited pages logic can be added here, showing all for simplicity
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold transition-colors ${
                    isCurrent ? 'bg-[#0B2B5B] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommitteeMembersPage;
