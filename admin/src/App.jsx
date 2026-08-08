import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AdminRoutes from './routes/AdminRoutes';
import AdminLogin from './pages/Login/AdminLogin';

import DashboardHome from './pages/DashboardHome';
import ManageMembers from './pages/ManageMembers';
import ManageProjects from './pages/ManageProjects';
import ManageReports from './pages/ManageReports';
import ManageChapters from './pages/ManageChapters';
import ManageGroups from './pages/ManageGroups';
import AdminSettings from './pages/AdminSettings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<AdminLogin />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/" element={<AdminRoutes />}>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="members" element={<ManageMembers />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="reports" element={<ManageReports />} />
            <Route path="chapters" element={<ManageChapters />} />
            <Route path="groups" element={<ManageGroups />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
