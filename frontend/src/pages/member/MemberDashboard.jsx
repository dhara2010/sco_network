import React, { useState, useEffect } from 'react';
import { FolderKanban, FileText, Activity, AlertCircle, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../../utils/api';

const MemberDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    reports: 0,
    activities: 0
  });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('memberToken');
        
        // Fetch Member Profile
        const profileRes = await fetch(`${API_BASE_URL}/members/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }

        // Fetch Stats
        const statsRes = await fetch(`${API_BASE_URL}/member-dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { title: 'Total Projects', count: stats.projects, icon: FolderKanban, color: "from-blue-500 to-blue-600", shadow: "shadow-blue-200" },
    { title: 'Total Reports', count: stats.reports, icon: FileText, color: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-200" },
    { title: 'Total Activities', count: stats.activities, icon: Activity, color: "from-orange-500 to-orange-600", shadow: "shadow-orange-200" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Welcome back{profile ? `, ${profile.fullName}` : ''}!</h2>
      
      {loading ? (
        <div className="text-gray-500">Loading dashboard...</div>
      ) : (
        <>
          {profile && profile.status !== 'Approved' && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md flex items-start gap-3">
              <AlertCircle className="text-yellow-500 mt-0.5" size={20} />
              <div>
                <h3 className="text-yellow-800 font-bold">Account Status: {profile.status}</h3>
                <p className="text-yellow-700 text-sm mt-1">
                  {profile.status === 'Pending' 
                    ? 'Your account is currently under review by the administrator. Some features might be limited.' 
                    : `Your account has been rejected. Remarks: ${profile.remarks}`}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statCards.map((card, idx) => (
              <motion.div 
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                key={idx} 
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} shadow-lg ${card.shadow} flex items-center justify-center text-white`}>
                    <card.icon size={24} />
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">{card.title}</p>
                  <h3 className="text-3xl font-extrabold text-gray-900">{card.count}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><UserIcon size={20} className="text-blue-600" /> Profile Information</h3>
            {profile && (
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {profile.profilePicture && (
                  <div className="flex-shrink-0">
                    <img src={profile.profilePicture} alt="Profile" className="w-32 h-32 rounded-2xl object-cover shadow-sm border border-gray-100" />
                  </div>
                )}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">{profile.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-900">{profile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mobile</p>
                  <p className="font-medium text-gray-900">{profile.mobile}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Designation</p>
                  <p className="font-medium text-gray-900">{profile.designation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium text-gray-900">{profile.companyName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="font-medium text-gray-900">{profile.city || 'N/A'}</p>
                </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MemberDashboard;
