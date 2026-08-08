import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import MemberLayout from '../layouts/MemberLayout';

// Global Pages
import NotFound from '../pages/NotFound/NotFound';

// Public Pages
import HomePage from '../pages/Home/HomePage';
import AboutUsPage from '../pages/About/AboutUsPage';
import CommitteeMembersPage from '../pages/About/CommitteeMembersPage';
import VoiceOfScoPage from '../pages/About/VoiceOfScoPage';
import ProjectsPage from '../pages/Projects/ProjectsPage';
import ProjectDetailsPage from '../pages/Projects/ProjectDetailsPage';
import ChaptersPage from '../pages/Chapters/ChaptersPage';
import AnnualReportsPage from '../pages/Reports/AnnualReportsPage';
import ContactUsPage from '../pages/Contact/ContactUsPage';

import MemberProfilePage from '../pages/Members/MemberProfilePage';
import BecomeMemberPage from '../pages/Members/BecomeMemberPage';

import LoginPage from '../pages/auth/LoginPage';

// Member Portal Pages
import MemberDashboard from '../pages/member/MemberDashboard';
import MemberViewProfile from '../pages/member/MemberViewProfile';
import MemberProjects from '../pages/member/MemberProjects';
import MemberReports from '../pages/member/MemberReports';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="committee" element={<CommitteeMembersPage />} />
        <Route path="voice-of-sco" element={<VoiceOfScoPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id" element={<ProjectDetailsPage />} />
        <Route path="chapters" element={<ChaptersPage />} />
        <Route path="annual-reports" element={<AnnualReportsPage />} />
        <Route path="member/:id" element={<MemberProfilePage />} />
        <Route path="contact" element={<ContactUsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="become-member" element={<BecomeMemberPage />} />

        {/* Global 404 Catch-All inside MainLayout */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Member Panel Routes */}
      <Route path="/member-panel" element={<MemberLayout />}>
        <Route path="dashboard" element={<MemberDashboard />} />
        <Route path="profile" element={<MemberViewProfile />} />
        <Route path="projects" element={<MemberProjects />} />
        <Route path="reports" element={<MemberReports />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
