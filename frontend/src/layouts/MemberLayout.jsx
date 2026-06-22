import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, FileText, Activity, LogOut, User } from 'lucide-react';
import { API_BASE_URL } from '../utils/api';

const MemberLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('memberToken');
        if (!token) return;
        const res = await fetch(`${API_BASE_URL}/members/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('memberToken');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/member-panel/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'My Projects', path: '/member-panel/projects', icon: <FolderKanban size={20} /> },
    { name: 'My Reports', path: '/member-panel/reports', icon: <FileText size={20} /> },
    { name: 'My Activities', path: '/member-panel/activities', icon: <Activity size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-center">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Member<span className="text-blue-600">Panel</span></h2>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600 font-bold shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className={location.pathname === item.path ? 'text-blue-600' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center z-10 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900 capitalize">
            {location.pathname.split('/').pop() === 'dashboard' ? 'Dashboard' : location.pathname.split('/').pop().replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-3">
            {profile && profile.profilePicture ? (
              <img src={profile.profilePicture} alt="Profile" className="w-10 h-10 rounded-full object-cover shadow-md border-2 border-white" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                <User size={20} />
              </div>
            )}
          </div>
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MemberLayout;
