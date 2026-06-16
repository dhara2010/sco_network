import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SocialSidebar from '../components/SocialSidebar';
import Footer from '../components/Footer';

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
