import React, { useState, useEffect } from 'react';
import { FolderKanban, FileText, AlertCircle, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { membersData, projectsData, reportsData, groupsData, chaptersData } from '../../data/staticData';

const MemberDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    reports: 0,
  });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const loggedInEmail = localStorage.getItem('loggedInUserEmail');
      const mockUser = membersData.find(m => m.email === loggedInEmail) || membersData.find(m => m.status === 'Approved') || membersData[0];
      setProfile(mockUser);
      
      setStats({
        projects: projectsData.length,
        reports: reportsData.length,
      });
      setLoading(false);
    }, 400);
  }, []);

  const statCards = [
    { title: 'Total Projects', count: stats.projects, icon: FolderKanban, color: "from-blue-500 to-blue-600", shadow: "shadow-blue-200" },
    { title: 'Total Reports', count: stats.reports, icon: FileText, color: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-200" },
    // { title: 'Total Activities', count: stats.activities, icon: Activity, color: "from-orange-500 to-orange-600", shadow: "shadow-orange-200" },
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

          {profile && profile.status === 'Approved' && profile.groupId && profile.chapterId && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><UserIcon size={20} className="text-blue-600" /> My Group Information</h3>
              
              {(() => {
                const chapter = chaptersData.find(c => c._id === profile.chapterId);
                const group = groupsData.find(g => g._id === profile.groupId);
                const groupMembers = membersData.filter(m => m.groupId === profile.groupId && m.status === 'Approved');
                const isFull = groupMembers.length >= (group?.maxMembers || 6);

                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                      <div>
                        <p className="text-sm text-gray-500">Chapter</p>
                        <p className="font-medium text-gray-900">{chapter?.chapterName || 'Unknown Chapter'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Group Name</p>
                        <p className="font-medium text-gray-900 flex items-center gap-2">
                          {group?.groupName || 'Unknown Group'}
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isFull ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {groupMembers.length}/{group?.maxMembers || 6} Capacity
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">My Assigned Position</p>
                        <p className="font-medium text-gray-900">{profile.groupPosition || 'Member'}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-bold text-gray-800 mb-4 border-b pb-2">Group Members</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groupMembers.map(member => (
                          <div key={member._id} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex-shrink-0">
                              {member.profilePicture ? (
                                <img src={member.profilePicture} alt={member.fullName} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                  {member.fullName.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">{member.fullName} {member._id === profile._id ? '(You)' : ''}</p>
                              <p className="text-xs text-blue-600 font-medium mb-1">{member.groupPosition || 'Member'}</p>
                              <p className="text-xs text-gray-500 truncate">{member.email}</p>
                              <p className="text-xs text-gray-500">{member.mobile}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MemberDashboard;
