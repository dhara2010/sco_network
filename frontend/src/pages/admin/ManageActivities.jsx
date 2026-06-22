import React, { useState, useEffect } from 'react';
import { Search, Eye, CheckCircle, XCircle, Clock, Trash2, Activity } from 'lucide-react';
import { API_BASE_URL } from '../../utils/api';

const ManageActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewRecord, setViewRecord] = useState(null);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const statusQuery = activeTab !== 'All' ? `?status=${activeTab}` : '';
      
      const res = await fetch(`${API_BASE_URL}/activities/admin${statusQuery}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch activities');
      setActivities(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [activeTab]);

  const handleStatusChange = async (activityId, newStatus) => {
    const remarks = window.prompt(`Enter remarks for ${newStatus === 'Approved' ? 'approving' : 'rejecting'} this activity (Optional):`, '');
    if (remarks === null) return; // User cancelled

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/activities/admin/${activityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus, remarks })
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      fetchActivities();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (activityId) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/activities/admin/${activityId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error('Failed to delete activity');
      fetchActivities();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredActivities = activities.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (a.member_id?.fullName && a.member_id.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activities Management</h1>
          <p className="text-gray-500 mt-1">Review, approve, and manage member activities</p>
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
              placeholder="Search activities..."
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
                <th className="p-4 font-semibold">Activity Info</th>
                <th className="p-4 font-semibold">Author</th>
                <th className="p-4 font-semibold">Activity Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {loading ? (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500">Loading activities...</td></tr>
              ) : error ? (
                <tr><td colSpan="5" className="p-8 text-center text-red-500">Error: {error}</td></tr>
              ) : filteredActivities.length === 0 ? (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500">No activities found.</td></tr>
              ) : (
                filteredActivities.map((activity) => (
                  <tr key={activity._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                           <Activity size={20} />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{activity.title}</div>
                          <div className="text-gray-500 text-xs truncate max-w-[200px]">{activity.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">
                      {activity.member_id ? (
                        <>
                          <p className="font-medium">{activity.member_id.fullName}</p>
                          <p className="text-xs text-gray-400">{activity.member_id.email}</p>
                        </>
                      ) : (
                        <p className="font-medium text-gray-500">Admin</p>
                      )}
                    </td>
                    <td className="p-4 text-gray-600">
                      {activity.activityDate ? new Date(activity.activityDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${activity.status === 'Pending' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' : ''}
                        ${activity.status === 'Approved' ? 'bg-green-50 text-green-800 border-green-200' : ''}
                        ${activity.status === 'Rejected' ? 'bg-red-50 text-red-800 border-red-200' : ''}
                      `}>
                        {activity.status === 'Pending' && <Clock size={12} className="mr-1" />}
                        {activity.status === 'Approved' && <CheckCircle size={12} className="mr-1" />}
                        {activity.status === 'Rejected' && <XCircle size={12} className="mr-1" />}
                        {activity.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <button onClick={() => setViewRecord(activity)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                      {activity.status === 'Pending' && (
                        <>
                          <button onClick={() => handleStatusChange(activity._id, 'Approved')} className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-md transition-colors" title="Approve">
                            <CheckCircle size={18} />
                          </button>
                          <button onClick={() => handleStatusChange(activity._id, 'Rejected')} className="text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-colors" title="Reject">
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      {activity.status === 'Rejected' && (
                        <button onClick={() => handleStatusChange(activity._id, 'Pending')} className="text-yellow-600 hover:bg-yellow-50 p-1.5 rounded-md transition-colors" title="Revert to Pending">
                          <Clock size={18} />
                        </button>
                      )}
                      <button onClick={() => handleDelete(activity._id)} className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-colors ml-2" title="Delete">
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
              <h3 className="text-xl font-bold text-gray-900">Activity Details</h3>
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
                  <p className="text-sm text-gray-500 font-medium">Author</p>
                  <p className="text-gray-900">{viewRecord.member_id ? viewRecord.member_id.fullName : 'Admin'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Activity Date</p>
                  <p className="text-gray-900">{viewRecord.activityDate ? new Date(viewRecord.activityDate).toLocaleDateString() : '-'}</p>
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
    </div>
  );
};

export default ManageActivities;
