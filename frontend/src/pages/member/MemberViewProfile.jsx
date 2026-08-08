import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, MapPin, Edit2, Eye, Share2, Briefcase, Phone, Mail, Droplet, Calendar, Users, Building
} from 'lucide-react';
import { 
  FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGlobe 
} from 'react-icons/fa';
import { membersData } from '../../data/staticData';

const MemberViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const loggedInEmail = localStorage.getItem('loggedInUserEmail');
      const mockUser = membersData.find(m => m.email === loggedInEmail) || membersData.find(m => m.status === 'Approved') || membersData[0];
      setProfile(mockUser);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-10 h-10 border-4 border-[#044766] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) return <div className="text-red-500 text-center font-bold mt-10">Failed to load profile.</div>;

  return (
    <div className="max-w-2xl mx-auto bg-[#F4F7F9] min-h-screen pb-10 font-sans shadow-xl rounded-3xl overflow-hidden border border-gray-200">
      
      {/* Top Header Section */}
      <div className="bg-[#044766] text-white pt-6 pb-6 px-4 md:px-8 rounded-b-3xl relative">
        {/* Profile Info Area */}
        <div className="flex flex-col md:flex-row gap-6 items-start mt-4">
          {/* Avatar */}
          <div className="relative shrink-0 mx-auto md:mx-0">
            {profile.profilePicture ? (
              <img src={profile.profilePicture} alt="Profile" className="w-32 h-32 rounded-full object-cover border-2 border-[#044766]" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold border-2 border-[#044766]">
                {profile.fullName?.charAt(0)}
              </div>
            )}
            {/* Verified Badge */}
            <div className="absolute top-2 right-0 bg-[#0095f6] rounded-full p-1 border-2 border-[#044766]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-1.5 w-full">
            <h1 className="text-2xl font-bold mb-3">{profile.fullName}</h1>
            
            <div className="text-sm flex items-center gap-2">
              <Briefcase size={14} className="shrink-0" />
              <span className="truncate">{profile.companyName || 'N/A'}</span>
            </div>
            <div className="text-sm flex items-center gap-2">
              <Phone size={14} className="shrink-0" />
              <span>{profile.mobile || 'N/A'}</span>
            </div>
            <div className="text-sm flex items-center gap-2">
              <Mail size={14} className="shrink-0" />
              <span className="truncate">{profile.email || 'N/A'}</span>
            </div>
            <div className="text-sm flex items-center gap-2">
              <Droplet size={14} className="shrink-0" />
              <span>{profile.bloodGroup || 'N/A'}</span>
            </div>
            <div className="text-sm flex items-center gap-2">
              <Calendar size={14} className="shrink-0" />
              <span>DOB : {profile.dob ? new Date(profile.dob).toLocaleDateString('en-GB') : 'N/A'}</span>
            </div>
            <div className="text-sm flex items-center gap-2">
              <Users size={14} className="shrink-0" />
              <span>Member of : {profile.memberOf || 'N/A'}</span>
            </div>
            <div className="text-sm flex items-center gap-2">
              <Calendar size={14} className="shrink-0" />
              <span>Renewal Date: {profile.renewalDate ? new Date(profile.renewalDate).toLocaleDateString('en-GB') : 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex gap-3 mt-6">
          <button className="flex-1 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl py-2.5 font-semibold flex items-center justify-center gap-2 transition">
            <Users size={18} />
            <span>{profile.connectionsCount || '0'} Connections</span>
          </button>
          <button className="flex-1 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl py-2.5 font-semibold flex items-center justify-center gap-2 transition">
            <span className="text-lg">⇄</span> My LVB
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="px-4 md:px-8 pt-6 space-y-6">
        
        {/* Business Location */}
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-bold">My Business Location :</h2>
          <button className="bg-[#044766] text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm hover:bg-[#03364f] transition">
            Set My Location <span className="text-lg">📍</span>
          </button>
        </div>

        {/* V2V Sheet */}
        <div>
          <h2 className="text-[17px] font-bold mb-3">V2V Sheet :</h2>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[15px]">Visible to Everyone</span>
            {/* Toggle Switch (Mock) */}
            <div className="w-12 h-6 bg-[#34C759] rounded-full relative cursor-pointer mr-2">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-[#044766] rounded-xl flex items-center justify-center text-white hover:bg-[#03364f] transition">
                <Edit2 size={18} />
              </button>
              <button className="w-10 h-10 bg-[#044766] rounded-xl flex items-center justify-center text-white hover:bg-[#03364f] transition">
                <Eye size={18} />
              </button>
              <button className="w-10 h-10 bg-[#044766] rounded-xl flex items-center justify-center text-white hover:bg-[#03364f] transition">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Business Profile Title */}
        <div className="flex items-center gap-3 pt-2">
          <h2 className="text-xl font-extrabold">Business Profile :</h2>
          <button className="w-10 h-10 bg-[#044766] rounded-xl flex items-center justify-center text-white hover:bg-[#03364f] transition">
            <Edit2 size={18} />
          </button>
        </div>

        {/* Business Details Grid */}
        <div className="space-y-3">
          <div className="flex flex-col md:flex-row md:gap-4 border-b border-gray-200 pb-3">
            <span className="font-bold md:w-32 shrink-0 text-[15px]">Name :</span>
            <span className="text-[15px]">{profile.companyName || 'N/A'}</span>
          </div>
          <div className="flex flex-col md:flex-row md:gap-4 border-b border-gray-200 pb-3">
            <span className="font-bold md:w-32 shrink-0 text-[15px]">Category :</span>
            <span className="text-[15px]">{profile.businessType || 'N/A'}</span>
          </div>
          <div className="flex flex-col md:flex-row md:gap-4 border-b border-gray-200 pb-3">
            <span className="font-bold md:w-32 shrink-0 text-[15px]">Mobile No :</span>
            <span className="text-[15px]">{profile.businessMobile || 'N/A'}</span>
          </div>
          <div className="flex flex-col md:flex-row md:gap-4 border-b border-gray-200 pb-3">
            <span className="font-bold md:w-32 shrink-0 text-[15px]">Email :</span>
            <span className="text-[15px] break-all">{profile.businessEmail || 'N/A'}</span>
          </div>
          <div className="flex flex-col md:flex-row md:gap-4 border-b border-gray-200 pb-3">
            <span className="font-bold md:w-32 shrink-0 text-[15px]">Website :</span>
            <a href={profile.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-[15px] break-all">{profile.website || 'N/A'}</a>
          </div>
          <div className="flex flex-col md:flex-row md:gap-4 border-b border-gray-200 pb-3">
            <span className="font-bold md:w-32 shrink-0 text-[15px]">Since :</span>
            <span className="text-[15px]">{profile.businessSince ? new Date(profile.businessSince).toLocaleDateString('en-GB') : 'N/A'}</span>
          </div>
          <div className="flex flex-col md:flex-row md:gap-4 border-b border-gray-200 pb-3">
            <span className="font-bold md:w-32 shrink-0 text-[15px]">Address :</span>
            <span className="text-[15px]">{profile.businessAddress || 'N/A'}</span>
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            <span className="font-bold md:w-32 shrink-0 text-[15px]">Description :</span>
            <span className="text-[15px] leading-relaxed whitespace-pre-wrap">{profile.businessDescription || profile.bio || 'N/A'}</span>
          </div>
        </div>

        {/* Social Links Row */}
        <div className="flex flex-wrap justify-center gap-3 pt-6 pb-4">
          <a href={profile.website} target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#F5B041] rounded-xl flex items-center justify-center shadow-md hover:scale-105 transition">
            <FaGlobe size={24} />
          </a>
          <a href={`tel:${profile.mobile}`} className="w-12 h-12 bg-[#2E86C1] rounded-xl flex items-center justify-center text-white shadow-md hover:scale-105 transition">
            <Phone size={22} fill="currentColor" />
          </a>
          {profile.socialLinks?.whatsapp && (
            <a href={profile.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center text-white shadow-md hover:scale-105 transition">
              <FaWhatsapp size={26} />
            </a>
          )}
          {profile.socialLinks?.facebook && (
            <a href={profile.socialLinks.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#1877F2] rounded-xl flex items-center justify-center text-white shadow-md hover:scale-105 transition">
              <FaFacebook size={26} />
            </a>
          )}
          {profile.socialLinks?.instagram && (
            <a href={profile.socialLinks.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-xl flex items-center justify-center text-white shadow-md hover:scale-105 transition">
              <FaInstagram size={26} />
            </a>
          )}
          {profile.socialLinks?.twitter && (
            <a href={profile.socialLinks.twitter} target="_blank" rel="noreferrer" className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white shadow-md hover:scale-105 transition">
              <FaTwitter size={24} />
            </a>
          )}
          {profile.socialLinks?.linkedin && (
            <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#0077b5] rounded-xl flex items-center justify-center text-white shadow-md hover:scale-105 transition">
              <FaLinkedin size={26} />
            </a>
          )}
        </div>

        {/* Testimonials Accordion Mock */}
        {/* <div className="bg-white border border-gray-200 rounded-xl mt-4 shadow-sm">
          <div className="px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 rounded-xl transition">
            <h3 className="text-[#044766] font-bold text-lg">My Testimonials (0)</h3>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#044766]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default MemberViewProfile;
