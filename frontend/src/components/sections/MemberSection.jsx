import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building, GraduationCap, ArrowRight, User, Star } from 'lucide-react';
import { getMembers } from '../../api/members.api';

const MemberSection = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const data = await getMembers();
        // Display top 5 members for the exact asymmetric grid
        setMembers(data.filter(m => m.status === 'Approved').slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch members', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f7f9] border border-gray-100 text-[#1056A5] text-xs font-bold tracking-widest mb-4">
              <Star size={14} className="text-[#FFC107] fill-[#FFC107]" />
              MEMBER SPOTLIGHT
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Member <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1056A5] to-[#1a73e8]">Spotlight</span>
            </h2>
          </div>
          <Link to="/committee" className="inline-flex items-center gap-2 text-[#1056A5] font-bold hover:text-[#FFC107] transition-colors group">
            View Committee <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1056A5]"></div>
          </div>
        ) : members.length > 0 ? (
          /* Asymmetric Bento Grid */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
            {members.map((member, index) => {
              const isFeatured = index === 0;
              const gridClasses = isFeatured 
                ? "md:col-span-2 md:row-span-2" 
                : "md:col-span-1 md:row-span-1";
                
              const mobileHeight = isFeatured ? "min-h-[500px] md:min-h-0" : "min-h-[300px] md:min-h-0";

              return (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group relative ${gridClasses} ${mobileHeight} bg-[#E8E6E2] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer`}
                >
                  {/* Image Container */}
                  {member.profilePicture ? (
                    <img 
                      src={member.profilePicture} 
                      alt={member.fullName} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter group-hover:brightness-110" 
                    />
                  ) : (
                    <div className="absolute inset-0 z-0">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
                        <Users size={48} className="opacity-20" />
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay for Text Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061638]/95 via-[#071B4D]/65 to-transparent group-hover:from-[#061638] group-hover:via-[#071B4D]/80 transition-colors duration-500"></div>

                  {/* Top Badge */}
                  {member.designation && (
                    <div className="absolute top-4 right-4 z-10 inline-flex">
                      <span className="bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                        {member.role || 'Member'}
                      </span>
                    </div>
                  )}

                  {/* Content Area */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      
                      <h3 className={`${isFeatured ? 'text-3xl md:text-4xl' : 'text-xl'} font-extrabold text-white mb-2 [text-shadow:0_2px_8px_rgba(0,0,0,0.45)]`}>
                        {member.fullName}
                      </h3>
                      
                      {isFeatured && <div className="w-12 h-1 bg-[#FFC107] mb-4 rounded-full transition-all duration-500 group-hover:w-24"></div>}
                      
                      {/* Secondary Info Reveals on Hover */}
                      <div className="opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto overflow-hidden transition-all duration-500">
                        <div className="flex flex-col gap-2 pt-2 pb-2">
                          {member.companyName && (
                            <div className="flex items-start gap-2 text-sm text-white/95 [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">
                              <Building size={16} className="text-[#FFC107] shrink-0 mt-0.5 drop-shadow-md" />
                              <span className="line-clamp-2">{member.companyName}</span>
                            </div>
                          )}
                          {member.occupation && (
                            <div className="flex items-center gap-2 text-sm text-white/95 [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">
                              <GraduationCap size={16} className="text-[#FFC107] shrink-0 drop-shadow-md" />
                              <span className="truncate">{member.occupation}</span>
                            </div>
                          )}
                          {member.city && (
                            <div className="text-[#FFC107] text-xs font-black tracking-widest uppercase mt-2 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                              {member.city} Chapter
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                  
                  {/* Action Link */}
                  <Link to={`/member/${member._id}`} className="absolute inset-0 z-20">
                    <span className="sr-only">View Profile for {member.fullName}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#F8F9FA] rounded-[2rem] border border-gray-100">
            <p>No members available for spotlight.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MemberSection;
