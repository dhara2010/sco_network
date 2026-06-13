import React, { useState, useEffect } from 'react';
import { Search, Eye, CheckCircle, XCircle, Clock, Trash2, FileText } from 'lucide-react';

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchReports = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const statusQuery = activeTab !== 'All' ? `?status=${activeTab}` : '';
      
      const res = await fetch(`http://localhost:5000/api/reports/admin${statusQuery}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch reports');
      setReports(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [activeTab]);

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/api/reports/admin/${reportId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      fetchReports();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/api/reports/admin/${reportId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error('Failed to delete report');
      fetchReports();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredReports = reports.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.reportYear.includes(searchQuery)
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports Management</h1>
          <p className="text-gray-500 mt-1">Review, approve, and manage annual reports</p>
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
              placeholder="Search reports..."
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
                      {report.status === 'Pending' && (
                        <>
                          <button onClick={() => handleStatusChange(report._id, 'Approved')} className="text-green-600 hover:bg-green-50 p-1.5 rounded-md transition-colors" title="Approve">
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
    </div>
  );
};

export default ManageReports;
