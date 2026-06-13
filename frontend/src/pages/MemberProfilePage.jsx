import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Building, MapPin, Phone, Mail, Briefcase, GraduationCap, ArrowLeft, BadgeCheck } from 'lucide-react';

const MemberProfilePage = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/members/public/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load member profile');
        setMember(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-blue-900 text-xl font-bold">Loading Profile...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-bold">Error: {error}</div>;
  if (!member) return <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl font-bold">Member not found</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <Link to="/committee" className="inline-flex items-center text-[#0B2B5B] hover:text-[#fdb813] transition-colors mb-8 font-semibold">
          <ArrowLeft size={20} className="mr-2" /> Back to Committee
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Header Section */}
          <div className="relative h-48 bg-gradient-to-r from-[#0B2B5B] to-[#1e4a8f]">
            <div className="absolute -bottom-20 left-12 flex items-end">
              <div className="relative w-40 h-40 rounded-full border-4 border-white shadow-md bg-[#849b91] overflow-hidden">
                {member.profilePicture ? (
                  <img src={member.profilePicture} alt={member.fullName} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-white">
                    <User size={80} />
                  </div>
                )}
              </div>
              <div className="absolute bottom-2 right-2 bg-[#fdb813] p-2 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                <BadgeCheck size={24} className="text-[#0B2B5B] fill-current" />
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="pt-24 pb-12 px-12">
            <h1 className="text-4xl font-extrabold text-[#0B2B5B]">{member.fullName}</h1>
            <p className="text-xl font-semibold text-[#fdb813] mt-2 flex items-center gap-2">
              <BadgeCheck size={20} /> {member.designation}
            </p>

            {member.bio && (
              <div className="mt-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{member.bio}</p>
              </div>
            )}

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Professional Information */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2">Professional Details</h3>
                
                {member.companyName && (
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-xl text-[#0B2B5B]">
                      <Building size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Company</p>
                      <p className="text-lg font-semibold text-gray-900">{member.companyName}</p>
                    </div>
                  </div>
                )}

                {member.occupation && (
                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 p-3 rounded-xl text-green-700">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Occupation / Education</p>
                      <p className="text-lg font-semibold text-gray-900">{member.occupation}</p>
                    </div>
                  </div>
                )}

                {member.experience && (
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-50 p-3 rounded-xl text-purple-700">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Experience</p>
                      <p className="text-lg font-semibold text-gray-900">{member.experience}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact & Location Information */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2">Contact & Location</h3>

                {member.email && (
                  <div className="flex items-start gap-4">
                    <div className="bg-red-50 p-3 rounded-xl text-red-600">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Email Address</p>
                      <a href={`mailto:${member.email}`} className="text-lg font-semibold text-[#0B2B5B] hover:underline break-all">{member.email}</a>
                    </div>
                  </div>
                )}

                {member.mobile && (
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-50 p-3 rounded-xl text-orange-600">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                      <a href={`tel:${member.mobile}`} className="text-lg font-semibold text-[#0B2B5B] hover:underline">+91 {member.mobile.replace(/^\+91\s*/, '')}</a>
                    </div>
                  </div>
                )}

                {(member.address || member.city || member.state) && (
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-50 p-3 rounded-xl text-teal-600">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Location</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {[member.address, member.city, member.state, member.country].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MemberProfilePage;
