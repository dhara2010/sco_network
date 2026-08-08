import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, ArrowRight } from 'lucide-react';
import { getMembers } from '../../api/members.api';

const NetworkDirectorySection = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const data = await getMembers();
        // Get up to 15 members for the marquee
        setMembers(data.filter(m => m.status === 'Approved').slice(0, 15));
      } catch (err) {
        console.error('Failed to fetch members for directory preview', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading || members.length < 5) return null; // Gracefully hide if not enough data for a marquee

  // Duplicate the array to create a seamless infinite scroll effect
  const marqueeMembers = [...members, ...members];

  return (
    <section className="py-20 bg-[#F8F9FA] overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-12">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4">
          The Network at a Glance
        </h2>
        <p className="text-2xl md:text-3xl font-bold max-w-2xl mx-auto leading-tight">
          Connect with industry leaders, visionaries, and professionals across the globe.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center py-6">
        {/* Gradient Fades for edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#F8F9FA] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#F8F9FA] to-transparent z-10 pointer-events-none"></div>

        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex gap-6 md:gap-8 whitespace-nowrap px-4"
        >
          {marqueeMembers.map((member, index) => (
            <div 
              key={`${member._id}-${index}`} 
              className="flex items-center gap-4 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all cursor-default shrink-0 group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0 border border-gray-200 group-hover:border-[#FFC107] transition-colors">
                {member.profilePicture ? (
                  <img src={member.profilePicture} alt={member.fullName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                )}
              </div>
              <div className="flex flex-col pr-2">
                <span className="font-bold text-sm">{member.fullName}</span>
                {member.companyName && (
                  <span className="text-xs truncate max-w-[120px]">
                    {member.companyName}
                  </span>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-12 flex justify-center relative z-20">
        <Link to="/committee" className="inline-flex items-center gap-2 px-8 py-3 bg-[#0A1435] text-white rounded-full font-bold text-sm hover:bg-[#1056A5] transition-colors shadow-lg hover:shadow-xl group">
          VIEW ALL MEMBERS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default NetworkDirectorySection;
