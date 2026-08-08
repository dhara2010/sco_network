import React, { useState, useEffect } from 'react';
import { Search, Eye, CheckCircle, XCircle, Clock, Trash2, FileText, Edit } from 'lucide-react';
import { reportsData } from '../data/staticData';

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewRecord, setViewRecord] = useState(null);
  
  const [editRecord, setEditRecord] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchReports = () => {
    setLoading(true);
    setTimeout(() => {
      let filtered = reportsData;
      if (activeTab !== 'All') {
        filtered = filtered.filter(p => p.status === activeTab);
      }
      setReports(filtered);
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    fetchReports();
  }, [activeTab]);

  const handleStatusChange = (reportId, newStatus) => {
    const remarks = window.prompt(`Enter remarks for ${newStatus === 'Approved' ? 'approving' : 'rejecting'} this report (Optional):`, '');
    if (remarks === null) return; // User cancelled

    setReports(reports.map(r => r._id === reportId ? { ...r, status: newStatus, remarks } : r));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setReports(reports.map(r => r._id === editRecord._id ? { ...r, ...editForm } : r));
    setEditRecord(null);
  };

  const handleDelete = (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    setReports(reports.filter(r => r._id !== reportId));
  };

  const filteredReports = reports.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (r.reportYear && r.reportYear.toString().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports Management</h1>
          <p className="text-gray-500 mt-1">Review, approve, and manage annual reports</p>
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
              placeholder="Search reports..."
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
                <th className="p-4 font-semibold">Report Title</th>
                <th className="p-4 font-semibold">Year</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Date Added</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {loading ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">Loading reports...</td></tr>
              ) : error ? (
                <tr><td colSpan="6" className="p-8 text-center text-red-500">Error: {error}</td></tr>
              ) : filteredReports.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">No reports found.</td></tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                           <FileText size={20} />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{report.title}</div>
                          <a href={report.reportFile} target="_blank" rel="noreferrer" className="text-blue-500 text-xs hover:underline">View PDF</a>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-900 font-bold">{report.reportYear}</td>
                    <td className="p-4 text-gray-600">{report.category}</td>
                    <td className="p-4 text-gray-600">{new Date(report.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${report.status === 'Pending' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' : ''}
                        ${report.status === 'Approved' ? 'bg-green-50 text-green-800 border-green-200' : ''}
                        ${report.status === 'Rejected' ? 'bg-red-50 text-red-800 border-red-200' : ''}
                      `}>
                        {report.status === 'Pending' && <Clock size={12} className="mr-1" />}
                        {report.status === 'Approved' && <CheckCircle size={12} className="mr-1" />}
                        {report.status === 'Rejected' && <XCircle size={12} className="mr-1" />}
                        {report.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <button onClick={() => setViewRecord(report)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => { setEditRecord(report); setEditForm(report); }} className="text-orange-600 hover:bg-orange-50 p-1.5 rounded-md transition-colors" title="Edit">
                        <Edit size={18} />
                      </button>
                      {report.status === 'Pending' && (
                        <>
                          <button onClick={() => handleStatusChange(report._id, 'Approved')} className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-md transition-colors" title="Approve">
                            <CheckCircle size={18} />
                          </button>
                          <button onClick={() => handleStatusChange(report._id, 'Rejected')} className="text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-colors" title="Reject">
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      {report.status === 'Rejected' && (
                        <button onClick={() => handleStatusChange(report._id, 'Pending')} className="text-yellow-600 hover:bg-yellow-50 p-1.5 rounded-md transition-colors" title="Revert to Pending">
                          <Clock size={18} />
                        </button>
                      )}
                      <button onClick={() => handleDelete(report._id)} className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-colors ml-2" title="Delete">
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
              <h3 className="text-xl font-bold text-gray-900">Report Details</h3>
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
                  <p className="text-sm text-gray-500 font-medium">Year</p>
                  <p className="text-gray-900">{viewRecord.reportYear}</p>
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
              {viewRecord.reportFile && (
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-2">Report Document</p>
                  <a href={viewRecord.reportFile} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                    <FileText size={20} /> View PDF Document
                  </a>
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
              <h3 className="text-xl font-bold text-gray-900">Edit Report</h3>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Year</label>
                  <input type="text" value={editForm.reportYear || ''} onChange={e => setEditForm({...editForm, reportYear: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input type="text" value={editForm.category || ''} onChange={e => setEditForm({...editForm, category: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={editForm.status || 'Pending'} onChange={e => setEditForm({...editForm, status: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={editForm.description || ''} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-500 outline-none" required></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report File URL (PDF/Doc)</label>
                <input type="url" value={editForm.reportFile || ''} onChange={e => setEditForm({...editForm, reportFile: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                <input type="url" value={editForm.coverImage || ''} onChange={e => setEditForm({...editForm, coverImage: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
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

export default ManageReports;
