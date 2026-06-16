import React, { useState, useEffect } from 'react';
import { Users, UserCheck, Clock, XCircle, PieChart } from 'lucide-react';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    pendingMembers: 0,
    approvedMembers: 0,
    rejectedMembers: 0,
    membersByDesignation: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        // Fetch from the dashboard stats AND members stats to get membersByDesignation
        // Actually members stats has everything we need
        const res = await fetch('https://sco-network.onrender.com/api/members/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Members', count: stats.totalMembers, icon: <Users size={24} className="text-blue-600" />, color: 'bg-blue-100' },
    { title: 'Approved', count: stats.approvedMembers, icon: <UserCheck size={24} className="text-green-600" />, color: 'bg-green-100' },
    { title: 'Pending', count: stats.pendingMembers, icon: <Clock size={24} className="text-yellow-600" />, color: 'bg-yellow-100' },
    { title: 'Rejected', count: stats.rejectedMembers, icon: <XCircle size={24} className="text-red-600" />, color: 'bg-red-100' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
      
      {loading ? (
        <div className="text-gray-500">Loading statistics...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.color}`}>
                  {card.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{card.count}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><PieChart className="mr-2 text-indigo-600" size={20}/> Members by Designation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.membersByDesignation && stats.membersByDesignation.length > 0 ? (
                stats.membersByDesignation.map((designation) => (
                  <div key={designation._id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center border border-gray-100">
                    <span className="font-medium text-gray-700">{designation._id}</span>
                    <span className="bg-indigo-100 text-indigo-800 font-bold px-3 py-1 rounded-full text-sm">{designation.count}</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 col-span-full">No designation data available.</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHome;
