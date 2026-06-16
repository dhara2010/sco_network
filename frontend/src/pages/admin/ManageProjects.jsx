import React, { useState, useEffect } from 'react';
import { Search, Eye, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // We could implement View Project details modal similar to ManageMembers, 
  // but for now we'll focus on the approval workflow.

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const statusQuery = activeTab !== 'All' ? `?status=${activeTab}` : '';
      
      const res = await fetch(`https://sco-network.onrender.com/api/projects/admin${statusQuery}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch projects');
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [activeTab]);

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`https://sco-network.onrender.com/api/projects/admin/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      
      // Refresh the list
      fetchProjects();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`https://sco-network.onrender.com/api/projects/admin/${projectId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error('Failed to delete project');
      fetchProjects();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.location && p.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects Management</h1>
          <p className="text-gray-500 mt-1">Review, approve, and manage projects</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Top Controls */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
            {['All', 'Pending', 'Approved', 'Rejected'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none ${
                  activeTab === tab ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Project Title</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Location</th>
                <th className="p-4 font-semibold">Date Added</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {loading ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">Loading projects...</td></tr>
              ) : error ? (
                <tr><td colSpan="6" className="p-8 text-center text-red-500">Error: {error}</td></tr>
              ) : filteredProjects.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">No projects found.</td></tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{project.title}</div>
                      <div className="text-gray-500 text-xs truncate max-w-[200px]">{project.description}</div>
                    </td>
                    <td className="p-4 text-gray-600">{project.category}</td>
                    <td className="p-4 text-gray-600">{project.location || '-'}</td>
                    <td className="p-4 text-gray-600">{new Date(project.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${project.status === 'Pending' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' : ''}
                        ${project.status === 'Approved' ? 'bg-green-50 text-green-800 border-green-200' : ''}
                        ${project.status === 'Rejected' ? 'bg-red-50 text-red-800 border-red-200' : ''}
                      `}>
                        {project.status === 'Pending' && <Clock size={12} className="mr-1" />}
                        {project.status === 'Approved' && <CheckCircle size={12} className="mr-1" />}
                        {project.status === 'Rejected' && <XCircle size={12} className="mr-1" />}
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      {project.status === 'Pending' && (
                        <>
                          <button onClick={() => handleStatusChange(project._id, 'Approved')} className="text-green-600 hover:bg-green-50 p-1.5 rounded-md transition-colors" title="Approve">
                            <CheckCircle size={18} />
                          </button>
                          <button onClick={() => handleStatusChange(project._id, 'Rejected')} className="text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-colors" title="Reject">
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      {project.status === 'Rejected' && (
                        <button onClick={() => handleStatusChange(project._id, 'Pending')} className="text-yellow-600 hover:bg-yellow-50 p-1.5 rounded-md transition-colors" title="Revert to Pending">
                          <Clock size={18} />
                        </button>
                      )}
                      <button onClick={() => handleDelete(project._id)} className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-colors ml-2" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProjects;
