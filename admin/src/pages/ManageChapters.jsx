import React, { useState, useEffect } from 'react';
import { Search, Eye, CheckCircle, XCircle, Clock, Trash2, Edit, Edit2, Plus, X, MapPin } from 'lucide-react';
import { chaptersData } from '../data/staticData';

const ManageChapters = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    chapterName: '',
    cityName: '',
    state: '',
    servedPincodes: '',
    contactPerson: '',
    contactNumber: '',
    email: '',
    address: '',
    websiteUrl: '',
    imageUrl: '',
    latitude: '',
    longitude: '',
    status: 'pending'
  });
  const [editingId, setEditingId] = useState(null);

  const fetchChapters = () => {
    setLoading(true);
    setTimeout(() => {
      let filtered = chaptersData;
      if (activeTab !== 'All') {
        filtered = filtered.filter(p => p.status === activeTab.toLowerCase());
      }
      setChapters(filtered);
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    fetchChapters();
  }, [activeTab]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setChapters(chapters.map(c => c._id === editingId ? { ...c, ...formData } : c));
    } else {
      setChapters([...chapters, { ...formData, _id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const handleEdit = (chapter) => {
    setFormData({
      chapterName: chapter.chapterName || '',
      cityName: chapter.cityName || '',
      state: chapter.state || '',
      servedPincodes: chapter.servedPincodes || '',
      contactPerson: chapter.contactPerson || '',
      contactNumber: chapter.contactNumber || '',
      email: chapter.email || '',
      address: chapter.address || '',
      websiteUrl: chapter.websiteUrl || '',
      imageUrl: chapter.imageUrl || '',
      latitude: chapter.latitude || '',
      longitude: chapter.longitude || '',
      status: chapter.status
    });
    setEditingId(chapter._id);
    setIsModalOpen(true);
  };

  const handleStatusChange = (id, newStatus) => {
    setChapters(chapters.map(c => c._id === id ? { ...c, status: newStatus } : c));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this chapter?')) return;
    setChapters(chapters.filter(c => c._id !== id));
  };

  const resetForm = () => {
    setFormData({
      chapterName: '',
      cityName: '',
      state: '',
      servedPincodes: '',
      contactPerson: '',
      contactNumber: '',
      email: '',
      address: '',
      websiteUrl: '',
      imageUrl: '',
      latitude: '',
      longitude: '',
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
              <th className="py-4 px-4 font-semibold text-gray-600 text-sm">Chapter Name</th>
              <th className="py-4 px-4 font-semibold text-gray-600 text-sm">City</th>
              <th className="py-4 px-4 font-semibold text-gray-600 text-sm">Contact Person</th>
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
                      <MapPin size={16} className="text-blue-600" /> {chapter.chapterName || chapter.cityName}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {chapter.cityName}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {chapter.contactPerson ? (
                      <div>
                        <div className="font-medium">{chapter.contactPerson}</div>
                        <div className="text-xs text-gray-500">{chapter.contactNumber}</div>
                      </div>
                    ) : 'N/A'}
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
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-900">
                {editingId ? 'Edit Chapter' : 'Add New Chapter'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Chapter Name *</label>
                  <input type="text" name="chapterName" value={formData.chapterName} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="e.g., Surat West Chapter" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">City *</label>
                  <input type="text" name="cityName" value={formData.cityName} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="e.g., Surat" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">State *</label>
                  <input type="text" name="state" value={formData.state} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="e.g., Gujarat" />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Served PIN Codes * <span className="text-xs text-gray-400 font-normal">(Comma separated)</span></label>
                  <input type="text" name="servedPincodes" value={formData.servedPincodes} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="e.g., 395003, 395004" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Person *</label>
                  <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="e.g., Rahul Patel" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Number *</label>
                  <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="e.g., 9876543210" />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="e.g., info@chapter.com" />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Address</label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} rows="2" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="Enter full address..."></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Latitude</label>
                  <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="e.g., 21.1702" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Longitude</label>
                  <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="e.g., 72.8311" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Website URL</label>
                  <input type="url" name="websiteUrl" value={formData.websiteUrl} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="e.g., https://suratchapter.com" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                  <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="e.g., /images/chapters/my-chapter.png" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white">
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
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
