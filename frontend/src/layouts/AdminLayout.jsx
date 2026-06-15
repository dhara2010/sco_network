import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, FolderKanban, FileText, Settings, LogOut, MapPin } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Members Management', path: '/admin/members', icon: <Users size={20} /> },
    { name: 'Projects Management', path: '/admin/projects', icon: <FolderKanban size={20} /> },
    { name: 'Reports Management', path: '/admin/reports', icon: <FileText size={20} /> },
    { name: 'Chapters Management', path: '/admin/chapters', icon: <MapPin size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-center">
          <h2 className="text-xl font-black text-[#0A1435] tracking-tight">Admin<span className="text-[#115fc6]">Panel</span></h2>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-[#115fc6] font-bold shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#0A1435]'
                  }`}
                >
                  <span className={location.pathname === item.path ? 'text-[#115fc6]' : 'text-gray-400'}>
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
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center z-10 shadow-sm">
          <h1 className="text-xl font-bold text-[#0A1435] capitalize">
            {location.pathname.split('/').pop() === 'admin' ? 'Dashboard' : location.pathname.split('/').pop().replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#115fc6] text-white flex items-center justify-center font-bold shadow-md">
              A
            </div>
          </div>
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
