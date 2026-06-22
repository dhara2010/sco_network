import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Folder, FileText, Activity, MapPin, Mail,
  TrendingUp, TrendingDown, AlertCircle, Bell, User as UserIcon,
  CheckCircle, Clock, Search, ChevronRight, XCircle, Award
} from 'lucide-react';
import { API_BASE_URL } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`${API_BASE_URL}/dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const stats = await res.json();
          setData(stats);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { hero, pending, system, timeline, chartData, leaderboards } = data;

  const getTrendColor = (val) => val >= 0 ? 'text-emerald-500' : 'text-red-500';
  const getTrendBg = (val) => val >= 0 ? 'bg-emerald-50' : 'bg-red-50';

  return (
    <div className="space-y-8 pb-12 bg-[#f8fafc] min-h-screen -m-6 p-6 font-sans">
      {/* 2. Hero Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Members", count: hero.totalMembers, growth: hero.memberGrowth, icon: Users, color: "from-blue-500 to-blue-600", shadow: "shadow-blue-200" },
          { title: "Total Projects", count: hero.totalProjects, growth: hero.projectGrowth, icon: Folder, color: "from-indigo-500 to-indigo-600", shadow: "shadow-indigo-200" },
          { title: "Total Reports", count: hero.totalReports, growth: hero.reportGrowth, icon: FileText, color: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-200" },
          { title: "Total Activities", count: hero.totalActivities, growth: hero.activityGrowth, icon: Activity, color: "from-orange-500 to-orange-600", shadow: "shadow-orange-200" }
        ].map((item, idx) => (
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group cursor-pointer"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} shadow-lg ${item.shadow} flex items-center justify-center text-white`}>
                <item.icon size={24} />
              </div>
              <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getTrendBg(item.growth)} ${getTrendColor(item.growth)}`}>
                {item.growth >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(item.growth)}%
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{item.title}</p>
              <h3 className="text-3xl font-extrabold text-gray-900">{item.count}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-8">

          {/* 3. Pending Approval Center */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertCircle className="text-amber-500" /> Pending Approvals
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Members", count: pending.members, link: "/admin/members", icon: Users },
                { title: "Projects", count: pending.projects, link: "/admin/projects", icon: Folder },
                { title: "Reports", count: pending.reports, link: "/admin/reports", icon: FileText },
                { title: "Activities", count: pending.activities, link: "/admin/activities", icon: Activity }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group">
                  <div className="flex justify-between items-center mb-3">
                    <item.icon size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                    {item.count > 0 ? (
                      <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold animate-pulse">{item.count}</span>
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><CheckCircle size={14} /></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{item.title}</p>
                  <button
                    onClick={() => navigate(item.link)}
                    className="mt-3 w-full py-1.5 text-xs font-semibold text-blue-600 bg-white border border-blue-100 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    Review Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Analytics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Submission Trends</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="projects" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorProjects)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Content Volume</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={12}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="reports" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="activities" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 6 & 7. Leaderboards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Chapter Performance */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="text-indigo-500" /> Top Chapters
              </h2>
              <div className="space-y-5">
                {leaderboards.topChapters.length > 0 ? leaderboards.topChapters.map((ch, idx) => {
                  const maxCount = Math.max(...leaderboards.topChapters.map(c => c.count));
                  const percentage = maxCount > 0 ? (ch.count / maxCount) * 100 : 0;
                  return (
                    <div key={idx} className="relative">
                      <div className="flex justify-between items-end mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</span>
                          <span className="font-semibold text-gray-800 text-sm">{ch.chapter}</span>
                        </div>
                        <span className="text-xs font-bold text-gray-500">{ch.count} Submissions</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full rounded-full ${idx === 0 ? 'bg-indigo-500' : idx === 1 ? 'bg-indigo-400' : 'bg-indigo-300'}`}
                        />
                      </div>
                    </div>
                  );
                }) : <p className="text-sm text-gray-500">No chapter data available yet.</p>}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Award className="text-yellow-500" /> Top Contributors
              </h2>
              <div className="space-y-4">
                {leaderboards.topContributors.length > 0 ? leaderboards.topContributors.map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {user.member?.profilePicture ? (
                          <img src={user.member.profilePicture} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold border-2 border-white shadow-sm">
                            {user.member?.fullName?.charAt(0) || 'U'}
                          </div>
                        )}
                        <span className="absolute -bottom-1 -right-1 text-xs">{idx === 0 ? '🏆' : idx === 1 ? '🥈' : '🥉'}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{user.member?.fullName || 'Unknown'}</p>
                        <p className="text-xs text-gray-500">{user.member?.city || 'No City'}</p>
                      </div>
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-700">
                      {user.count} pts
                    </div>
                  </div>
                )) : <p className="text-sm text-gray-500">No contributors yet.</p>}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-8">

          {/* 8. Smart Insights Panel */}
          <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-xl"></div>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Activity className="text-blue-300" /> Smart Insights
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div></div>
                <p className="text-sm text-blue-100">
                  Projects increased by <strong className="text-white">{Math.max(hero.projectGrowth, 0)}%</strong> this month.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div></div>
                <p className="text-sm text-blue-100">
                  Report approval rate is at an excellent <strong className="text-white">{system.reportApprovalRate}%</strong>.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div></div>
                <p className="text-sm text-blue-100">
                  <strong className="text-white">{pending.members + pending.projects + pending.reports + pending.activities}</strong> submissions are waiting for your approval.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div></div>
                <p className="text-sm text-blue-100">
                  <strong className="text-white">{leaderboards.topChapters[0]?.chapter || 'Surat'}</strong> chapter has the highest engagement currently.
                </p>
              </li>
            </ul>
          </div>



          {/* 10. Footer Widgets */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-xl p-4 text-white">
              <p className="text-gray-400 text-xs font-medium mb-1">Active Chapters</p>
              <h4 className="text-2xl font-bold">{system.totalChapters}</h4>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 text-white">
              <p className="text-gray-400 text-xs font-medium mb-1">Total Inquiries</p>
              <h4 className="text-2xl font-bold">{system.totalContactInquiries}</h4>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
