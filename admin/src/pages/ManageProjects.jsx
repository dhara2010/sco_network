import React, { useState, useEffect } from 'react';
import { Search, Eye, CheckCircle, XCircle, Clock, Trash2, Edit } from 'lucide-react';
import { projectsData } from '../data/staticData';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [viewRecord, setViewRecord] = useState(null);
  const [editRecord, setEditRecord] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchProjects = () => {
    setLoading(true);
    setTimeout(() => {
      let filtered = projectsData;
      if (activeTab !== 'All') {
        filtered = filtered.filter(p => p.status === activeTab);
      }
      setProjects(filtered);
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    fetchProjects();
  }, [activeTab]);

  const handleStatusChange = (projectId, newStatus) => {
    const remarks = window.prompt(`Enter remarks for ${newStatus === 'Approved' ? 'approving' : 'rejecting'} this project (Optional):`, '');
    if (remarks === null) return; // User cancelled

    setProjects(projects.map(p => p._id === projectId ? { ...p, status: newStatus, remarks } : p));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProjects(projects.map(p => p._id === editRecord._id ? { ...p, ...editForm } : p));
    setEditRecord(null);
  };

  const handleDelete = (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    setProjects(projects.filter(p => p._id !== projectId));
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.location && p.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects Management</h1>
          <p className="text-gray-500 mt-1">Review, approve, and manage projects</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Top Controls */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
            {['All', 'Pending', 'Approved', 'Rejected'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none ${
                  activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
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
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors"
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
                      <button onClick={() => setViewRecord(project)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => { setEditRecord(project); setEditForm(project); }} className="text-orange-600 hover:bg-orange-50 p-1.5 rounded-md transition-colors" title="Edit">
                        <Edit size={18} />
                      </button>
                      {project.status === 'Pending' && (
                        <>
                          <button onClick={() => handleStatusChange(project._id, 'Approved')} className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-md transition-colors" title="Approve">
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

      {/* View Modal */}
      {viewRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-900">Project Details</h3>
              <button onClick={() => setViewRecord(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">Title</p>
                <p className="text-lg font-semibold text-gray-900">{viewRecord.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Category</p>
                  <p className="text-gray-900">{viewRecord.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Location</p>
                  <p className="text-gray-900">{viewRecord.location || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Status</p>
                  <p className="text-gray-900">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${viewRecord.status === 'Pending' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' : ''}
                        ${viewRecord.status === 'Approved' ? 'bg-green-50 text-green-800 border-green-200' : ''}
                        ${viewRecord.status === 'Rejected' ? 'bg-red-50 text-red-800 border-red-200' : ''}
                      `}>
                      {viewRecord.status}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Date Added</p>
                  <p className="text-gray-900">{new Date(viewRecord.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Description</p>
                <p className="text-gray-900 whitespace-pre-wrap">{viewRecord.description}</p>
              </div>
              {viewRecord.featuredImage && (
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-2">Featured Image</p>
                  <img src={viewRecord.featuredImage} alt="Project" className="max-h-64 rounded-lg object-contain border border-gray-200" />
                </div>
              )}
              {viewRecord.remarks && (
                <div>
                  <p className="text-sm text-gray-500 font-medium text-red-600 mb-1">Remarks</p>
                  <p className="text-gray-900 bg-red-50 p-3 rounded-lg border border-red-100">{viewRecord.remarks}</p>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end">
              <button onClick={() => setViewRecord(null)} className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Edit Project</h3>
              <button onClick={() => setEditRecord(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <XCircle size={24} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" value={editForm.title || ''} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input type="text" value={editForm.subtitle || ''} onChange={e => setEditForm({...editForm, subtitle: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input type="text" value={editForm.category || ''} onChange={e => setEditForm({...editForm, category: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" value={editForm.location || ''} onChange={e => setEditForm({...editForm, location: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={editForm.status || 'Pending'} onChange={e => setEditForm({...editForm, status: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon (lucide-react)</label>
                  <input type="text" value={editForm.icon || ''} onChange={e => setEditForm({...editForm, icon: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={editForm.description || ''} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-500 outline-none" required></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
                <input type="text" value={editForm.featuredImage || ''} onChange={e => setEditForm({...editForm, featuredImage: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea value={editForm.remarks || ''} onChange={e => setEditForm({...editForm, remarks: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg min-h-[60px] focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                <button type="button" onClick={() => setEditRecord(null)} className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
