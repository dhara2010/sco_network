import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building, Mail, GraduationCap, User, BadgeCheck, ArrowRight } from 'lucide-react';
import { getMembers } from '../../api/members.api';

const MemberSection = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const data = await getMembers();
        // Display top 4 members (e.g. Board of Directors)
        setMembers(data.filter(m => m.status === 'Approved').slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch members', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[var(--color-sco-navy)] uppercase">Leadership & Committee</h2>
          <div className="w-20 h-1 bg-[var(--color-sco-gold)] mx-auto mt-4"></div>
          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            Meet the driving force behind SCO Network, committed to global trade and social empowerment.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10 font-bold text-gray-500">Loading members...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {members.map(member => (
              <div key={member._id} className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 border border-gray-100 p-7 flex flex-col items-center">
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
                  <div className="absolute bottom-0 right-0 bg-[#fdb813] p-1.5 rounded-full border-[3px] border-white shadow-sm flex items-center justify-center">
                    <BadgeCheck size={15} className="text-[#0B2B5B] fill-current" />
                  </div>
                </div>

                <h3 className="text-[20px] font-extrabold text-[#0B2B5B] text-center w-full truncate mt-3">{member.fullName}</h3>
                
                <div className="text-[13px] font-bold text-[#fdb813] mt-1 mb-2 text-center w-full truncate">
                  {member.designation}
                </div>

                <div className="w-full border-t border-gray-100/80 my-4"></div>

                <div className="w-full space-y-3 text-[13px] font-medium text-[#4B5563] mb-6 flex-grow px-1">
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
                </div>

                <Link to={`/member/${member._id}`} className="mt-auto w-full py-2.5 rounded-xl bg-[#F8F9FA] text-[#0B2B5B] font-bold text-[14px] hover:bg-[#1056A5] hover:text-white transition-colors border border-gray-100 flex items-center justify-center gap-2">
                  View Profile <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/committee" className="inline-flex items-center gap-2 bg-[var(--color-sco-navy)] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0a1a3a] transition-colors shadow-md hover:shadow-lg">
            View All Members <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MemberSection;
