import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import SocialSidebar from '../components/layout/SocialSidebar';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <SocialSidebar />
      <Footer />
    </div>
  );
};

export default MainLayout;
