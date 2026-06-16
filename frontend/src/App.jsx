import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import CommitteeMembersPage from './pages/CommitteeMembersPage';
import VoiceOfScoPage from './pages/VoiceOfScoPage';
import AnnualReportsPage from './pages/AnnualReportsPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import ChaptersPage from './pages/ChaptersPage';
import MemberProfilePage from './pages/MemberProfilePage';
import LoginPage from './pages/auth/LoginPage';
import BecomeMemberPage from './pages/BecomeMemberPage';

import DashboardHome from './pages/admin/DashboardHome';
import ManageMembers from './pages/admin/ManageMembers';
import ManageProjects from './pages/admin/ManageProjects';
import ManageReports from './pages/admin/ManageReports';
import ManageChapters from './pages/admin/ManageChapters';
import AdminSettings from './pages/admin/AdminSettings';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectDetailsPage />} />
          <Route path="chapters" element={<ChaptersPage />} />
          <Route path="committee" element={<CommitteeMembersPage />} />
          <Route path="voice-of-sco" element={<VoiceOfScoPage />} />
          <Route path="annual-reports" element={<AnnualReportsPage />} />
          <Route path="member/:id" element={<MemberProfilePage />} />
          <Route path="contact" element={<ContactUsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="become-member" element={<BecomeMemberPage />} />
        </Route>

        {/* Admin Routes with AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="members" element={<ManageMembers />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="reports" element={<ManageReports />} />
          <Route path="chapters" element={<ManageChapters />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
