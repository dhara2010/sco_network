import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Plus, X, Shield, Users, Layers, MapPin, Eye } from 'lucide-react';
import { groupsData, chaptersData, membersData } from '../data/staticData';

const ManageGroups = () => {
  const [groups, setGroups] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    chapterId: '',
    groupName: '',
    maxMembers: 6,
    status: 'Active'
  });
  
  const [editingId, setEditingId] = useState(null);
  const [viewingMembersGroup, setViewingMembersGroup] = useState(null);

  useEffect(() => {
    // Load from staticData initially
    setGroups(groupsData);
    setChapters(chaptersData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (group) => {
    setFormData({
      chapterId: group.chapterId || '',
      groupName: group.groupName || '',
      maxMembers: group.maxMembers || 6,
      status: group.status || 'Active'
    });
    setEditingId(group._id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      setGroups(groups.filter(g => g._id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      chapterId: '',
      groupName: '',
      maxMembers: 6,
      status: 'Active'
    });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setGroups(groups.map(g => g._id === editingId ? { ...g, ...formData } : g));
    } else {
      const newGroup = {
        _id: 'new-' + Date.now(),
        ...formData
      };
      setGroups([...groups, newGroup]);
    }
    resetForm();
  };

  const filteredGroups = groups.filter(g => 
    g.groupName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Layers className="text-blue-600" />
            Manage Groups
          </h1>
          <p className="text-gray-500 text-sm mt-1">Create and manage groups within chapters</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium shadow-sm shadow-blue-200"
        >
          <Plus size={20} /> Add New Group
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-100">
                <th className="py-4 px-4 font-semibold text-gray-600 text-sm">Group Name</th>
                <th className="py-4 px-4 font-semibold text-gray-600 text-sm">Chapter</th>
                <th className="py-4 px-4 font-semibold text-gray-600 text-sm">Max Capacity</th>
                <th className="py-4 px-4 font-semibold text-gray-600 text-sm">Status</th>
                <th className="py-4 px-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGroups.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    No groups found.
                  </td>
                </tr>
              ) : (
                filteredGroups.map(group => {
                  const chapter = chapters.find(c => c._id === group.chapterId);
                  return (
                    <tr key={group._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-800">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-blue-600" /> {group.groupName}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {chapter ? chapter.chapterName || chapter.cityName : 'Unknown Chapter'}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {group.maxMembers} Members
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${group.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {group.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => setViewingMembersGroup(group)}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="View Members"
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => handleEdit(group)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(group._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Layers className="text-blue-600" size={20} />
                {editingId ? 'Edit Group' : 'Add New Group'}
              </h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Parent Chapter *</label>
                <select 
                  name="chapterId" 
                  value={formData.chapterId} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">Select a Chapter</option>
                  {chapters.filter(c => c.status === 'approved').map(c => (
                    <option key={c._id} value={c._id}>{c.chapterName || c.cityName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Group Name *</label>
                <input 
                  type="text" 
                  name="groupName" 
                  value={formData.groupName} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                  placeholder="e.g., Group A" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Max Capacity *</label>
                <input 
                  type="number" 
                  name="maxMembers" 
                  value={formData.maxMembers} 
                  onChange={handleInputChange} 
                  required
                  min="1"
                  max="100" 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                  placeholder="e.g., 6" 
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={resetForm} className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
                  {editingId ? 'Save Changes' : 'Create Group'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Members Modal */}
      {viewingMembersGroup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="text-blue-600" size={20} />
                Members of {viewingMembersGroup.groupName}
              </h3>
              <button onClick={() => setViewingMembersGroup(null)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
              {(() => {
                const groupMembers = membersData.filter(m => m.groupId === viewingMembersGroup._id && m.status === 'Approved');
                if (groupMembers.length === 0) {
                  return <p className="text-center text-gray-500 py-8">No members currently assigned to this group.</p>;
                }
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {groupMembers.map(member => (
                      <div key={member._id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
                        <div className="flex-shrink-0">
                          {member.profilePicture ? (
                            <img src={member.profilePicture} alt="Profile" className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                              {member.fullName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 truncate">{member.fullName}</p>
                          <p className="text-xs text-blue-600 font-semibold mb-1">{member.groupPosition}</p>
                          <p className="text-xs text-gray-500 truncate">{member.email}</p>
                          <p className="text-xs text-gray-500">{member.mobile}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end bg-white">
              <button onClick={() => setViewingMembersGroup(null)} className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGroups;
