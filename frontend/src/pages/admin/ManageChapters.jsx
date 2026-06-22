import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { API_BASE_URL } from '../../utils/api';

const ManageChapters = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    cityName: '',
    websiteUrl: '',
    pincode: '',
    status: 'pending'
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/chapters/admin`);
      if (res.ok) {
        const data = await res.json();
        setChapters(data);
      }
    } catch (err) {
      console.error('Failed to fetch chapters', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `${API_BASE_URL}/chapters/admin/${editingId}`
        : `${API_BASE_URL}/chapters/admin`;

      const method = editingId ? 'PUT' : 'POST';

      const payload = { ...formData };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchChapters();
        resetForm();
      } else {
        alert('Failed to save chapter');
      }
    } catch (err) {
      console.error('Error saving chapter:', err);
    }
  };

  const handleEdit = (chapter) => {
    setFormData({
      cityName: chapter.cityName,
      websiteUrl: chapter.websiteUrl,
      pincode: chapter.pincode || '',
      status: chapter.status
    });
    setEditingId(chapter._id);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/chapters/admin/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchChapters();
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this chapter?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/chapters/admin/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchChapters();
      }
    } catch (err) {
      console.error('Error deleting chapter:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      cityName: '',
      websiteUrl: '',
      pincode: '',
      status: 'pending'
    });
    setEditingId(null);
  };

  const openModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Manage Chapters</h2>
          <p className="text-gray-500 text-sm mt-1">Add or update chapters for the Gujarat Map</p>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium text-sm shadow-sm"
        >
          <Plus size={18} /> Add Chapter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-y border-gray-100">
              <th className="py-4 px-4 font-semibold text-gray-600 text-sm">City</th>
              <th className="py-4 px-4 font-semibold text-gray-600 text-sm">Website URL</th>
              <th className="py-4 px-4 font-semibold text-gray-600 text-sm">Pincode</th>
              <th className="py-4 px-4 font-semibold text-gray-600 text-sm">Status</th>
              <th className="py-4 px-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">Loading chapters...</td>
              </tr>
            ) : chapters.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">No chapters found. Click 'Add Chapter' to create one.</td>
              </tr>
            ) : (
              chapters.map((chapter) => (
                <tr key={chapter._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-medium text-gray-800">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-blue-600" /> {chapter.cityName}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-blue-600">
                    <a href={chapter.websiteUrl} target="_blank" rel="noreferrer" className="hover:underline">{chapter.websiteUrl}</a>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {chapter.pincode ? chapter.pincode : 'N/A'}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${chapter.status === 'approved' ? 'bg-green-100 text-green-700' :
                        chapter.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                      }`}>
                      {chapter.status.charAt(0).toUpperCase() + chapter.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right flex justify-end items-center">
                    {chapter.status !== 'approved' && (
                      <button
                        onClick={() => handleStatusChange(chapter._id, 'approved')}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors mr-1"
                        title="Approve"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    {chapter.status !== 'rejected' && (
                      <button
                        onClick={() => handleStatusChange(chapter._id, 'rejected')}
                        className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors mr-2"
                        title="Reject"
                      >
                        <XCircle size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(chapter)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-1"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(chapter._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-900">
                {editingId ? 'Edit Chapter' : 'Add New Chapter'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">City Name</label>
                <input
                  type="text"
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., Surat"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Website URL</label>
                <input
                  type="url"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., https://suratchapter.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., 380001"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md"
                >
                  {editingId ? 'Save Changes' : 'Add Chapter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageChapters;
