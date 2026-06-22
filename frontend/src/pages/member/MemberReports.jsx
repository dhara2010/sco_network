import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, AlertCircle, Eye, XCircle, FileText } from 'lucide-react';
import { API_BASE_URL } from '../../utils/api';

const MemberReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'Report', description: '', reportYear: '', reportFile: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [viewRecord, setViewRecord] = useState(null);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('memberToken');
      const res = await fetch(`${API_BASE_URL}/member-dashboard/reports`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setReports(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('PDF must be less than 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, reportFile: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('memberToken');
      const url = editId 
        ? `${API_BASE_URL}/member-dashboard/reports/${editId}`
        : `${API_BASE_URL}/member-dashboard/reports`;
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({ title: '', category: 'Report', description: '', reportYear: '', reportFile: '' });
        setEditId(null);
        fetchReports();
      } else {
        const data = await res.json();
        setError(data.message || 'Error saving report');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleEdit = (report) => {
    setEditId(report._id);
    setFormData({
      title: report.title,
      category: report.category,
      description: report.description,
      reportYear: report.reportYear || '',
      reportFile: report.reportFile || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        const token = localStorage.getItem('memberToken');
        const res = await fetch(`${API_BASE_URL}/member-dashboard/reports/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          fetchReports();
        } else {
          alert('Error deleting report');
        }
      } catch (err) {
        alert('Server error');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Reports</h2>
        <button 
          onClick={() => { setEditId(null); setFormData({ title: '', category: 'Report', description: '', reportYear: '', reportFile: '' }); setShowModal(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} /> Add Report
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading reports...</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                  <th className="p-4 font-semibold text-sm">Title</th>
                  <th className="p-4 font-semibold text-sm">Year</th>
                  <th className="p-4 font-semibold text-sm">Status</th>
                  <th className="p-4 font-semibold text-sm">Remarks</th>
                  <th className="p-4 font-semibold text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.length > 0 ? (
                  reports.map(report => (
                    <tr key={report._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-medium text-gray-900">{report.title}</p>
                        <p className="text-xs text-gray-500 truncate max-w-xs">{report.description}</p>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{report.reportYear}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          report.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                          report.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600 max-w-[200px] truncate">
                        {report.remarks || '-'}
                      </td>
                      <td className="p-4 flex items-center justify-end gap-2">
                        <button onClick={() => setViewRecord(report)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                          <Eye size={18} />
                        </button>
                        {report.status !== 'Approved' && (
                          <>
                            <button onClick={() => handleEdit(report)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => handleDelete(report._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                        {report.status === 'Approved' && (
                          <span className="text-xs text-gray-400 italic">Locked</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No reports found. Click "Add Report" to submit one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-900">{editId ? 'Edit Report' : 'Add New Report'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2">
                  <AlertCircle size={20} /> {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Title *</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                  <input type="text" name="reportYear" required value={formData.reportYear} onChange={handleInputChange} placeholder="e.g. 2026" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF *</label>
                  <input type="file" accept="application/pdf" name="reportFile" required={!formData.reportFile} onChange={handleFileChange} className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white" />
                  {formData.reportFile && formData.reportFile.startsWith('data:') && (
                    <p className="mt-2 text-sm text-green-600 font-medium">✓ PDF selected</p>
                  )}
                  {formData.reportFile && !formData.reportFile.startsWith('data:') && (
                    <p className="mt-2 text-sm text-gray-500 truncate"><a href={formData.reportFile} target="_blank" rel="noreferrer" className="text-purple-600 hover:underline">View Current PDF</a></p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea name="description" required rows="4" value={formData.description} onChange={handleInputChange} className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm transition-colors">
                  {editId ? 'Update Report' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              <button onClick={() => setViewRecord(null)} className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberReports;
