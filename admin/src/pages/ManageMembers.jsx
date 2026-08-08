import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, X, AlertCircle, Eye, Shield, UserX, UserCheck, XCircle, CheckCircle, Clock } from 'lucide-react';
import { membersData, groupsData, chaptersData } from '../data/staticData';

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [selectedMember, setSelectedMember] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [assignGroup, setAssignGroup] = useState('');
  const [assignPosition, setAssignPosition] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [viewRecord, setViewRecord] = useState(null);

  const fetchMembers = () => {
    setLoading(true);
    setTimeout(() => {
      let filtered = membersData;
      if (statusFilter !== 'All') {
        filtered = filtered.filter(m => m.status === statusFilter);
      }
      if (searchTerm) {
        filtered = filtered.filter(m => 
          m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
          m.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setMembers(filtered);
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    fetchMembers();
  }, [statusFilter, searchTerm]);

  const handleStatusChange = (memberId, newStatus) => {
    if (newStatus === 'Approved' && selectedMember?.status === 'Pending' && (!assignGroup || !assignPosition)) {
      alert("Please select a Group and Position to approve the member.");
      return;
    }
    setActionLoading(true);
    setTimeout(() => {
      setMembers(members.map(m => m._id === memberId ? { 
        ...m, 
        status: newStatus, 
        remarks,
        ...(newStatus === 'Approved' && { groupId: assignGroup || m.groupId, groupPosition: assignPosition || m.groupPosition })
      } : m));
      setSelectedMember(null);
      setRemarks('');
      setAssignGroup('');
      setAssignPosition('');
      setActionLoading(false);
    }, 200);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setMembers(members.map(m => m._id === editRecord._id ? { ...m, ...editForm } : m));
    setEditRecord(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"><CheckCircle size={14} className="mr-1 mt-0.5" /> Approved</span>;
      case 'Rejected': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"><XCircle size={14} className="mr-1 mt-0.5" /> Rejected</span>;
      default: return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"><Clock size={14} className="mr-1 mt-0.5" /> Pending</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Member Requests Management</h1>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white sm:text-sm transition-colors"
            placeholder="Search by name, email, city..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          {['', 'Pending', 'Approved', 'Rejected'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${statusFilter === status ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
            >
              {status || 'All'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name & Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map(member => (
                <tr key={member._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                        {member.profilePicture ? <img className="h-10 w-10 object-cover" src={member.profilePicture} alt="" /> : null}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.fullName}</div>
                        <div className="text-sm text-gray-500">{member.email} • {member.mobile}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.designation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {[member.city, member.state].filter(Boolean).join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(member.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                    <button onClick={() => { 
                      setSelectedMember(member); 
                      setRemarks(member.remarks || ''); 
                      setAssignGroup(member.groupId || '');
                      setAssignPosition(member.groupPosition || '');
                    }} className="text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 p-2 rounded-lg" title="View / Action">
                      <Eye size={18} />
                    </button>
                    <button onClick={() => { 
                        setEditRecord(member); 
                        setEditForm({
                          ...member, 
                          dob: member.dob ? new Date(member.dob).toISOString().split('T')[0] : ''
                        }); 
                      }} className="text-orange-600 hover:text-orange-800 transition-colors bg-orange-50 hover:bg-orange-100 p-2 rounded-lg" title="Edit">
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {members.length === 0 && <div className="text-center py-8 text-gray-500">No members found</div>}
        </div>
      )}

      {/* View Modal */}
      {selectedMember && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setSelectedMember(null)}><div className="absolute inset-0 bg-gray-500 opacity-75"></div></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full relative z-10">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 border-b pb-2 flex justify-between">
                      Member Profile
                      <button onClick={() => setSelectedMember(null)} className="text-gray-400 hover:text-gray-500"><XCircle size={24} /></button>
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                      <div><p className="font-semibold text-gray-500">Full Name</p><p>{selectedMember.fullName}</p></div>
                      <div><p className="font-semibold text-gray-500">Email</p><p>{selectedMember.email}</p></div>
                      <div><p className="font-semibold text-gray-500">Mobile</p><p>{selectedMember.mobile}</p></div>
                      <div><p className="font-semibold text-gray-500">Gender & DOB</p><p>{selectedMember.gender} • {new Date(selectedMember.dob).toLocaleDateString()}</p></div>
                      <div><p className="font-semibold text-gray-500">Designation</p><p>{selectedMember.designation}</p></div>
                      <div><p className="font-semibold text-gray-500">Company</p><p>{selectedMember.companyName}</p></div>
                      <div className="col-span-2"><p className="font-semibold text-gray-500">Address</p><p>{selectedMember.address}, {selectedMember.city}, {selectedMember.state}, {selectedMember.country}</p></div>
                      <div className="col-span-2"><p className="font-semibold text-gray-500">Bio</p><p>{selectedMember.bio || 'N/A'}</p></div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Admin Remarks (Optional)</label>
                      <textarea rows="2" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2" value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Add remarks for approval or rejection..."></textarea>
                    </div>

                    {selectedMember.status === 'Pending' && selectedMember.chapterId && (
                      <div className="grid grid-cols-2 gap-4 mb-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <div className="col-span-2">
                          <h4 className="font-semibold text-blue-900 mb-1">Group Assignment</h4>
                          <p className="text-sm text-blue-700">Detected Chapter: <strong>{chaptersData.find(c => c._id === selectedMember.chapterId)?.chapterName || 'Unknown'}</strong></p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Select Group *</label>
                          <select value={assignGroup} onChange={e => setAssignGroup(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 bg-white">
                            <option value="">-- Choose Group --</option>
                            {groupsData.filter(g => g.chapterId === selectedMember.chapterId && g.status === 'Active').map(g => {
                              const currentMembers = members.filter(m => m.groupId === g._id && m.status === 'Approved').length;
                              const isFull = currentMembers >= g.maxMembers;
                              return (
                                <option key={g._id} value={g._id} disabled={isFull}>
                                  {g.groupName} ({currentMembers}/{g.maxMembers}){isFull ? ' - Full' : ''}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Assign Position *</label>
                          <select value={assignPosition} onChange={e => setAssignPosition(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 bg-white">
                            <option value="">-- Choose Position --</option>
                            <option value="President">President</option>
                            <option value="Vice President">Vice President</option>
                            <option value="Secretary">Secretary</option>
                            <option value="Joint Secretary">Joint Secretary</option>
                            <option value="Treasurer">Treasurer</option>
                            <option value="Member">Member</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button disabled={actionLoading} type="button" onClick={() => handleStatusChange(selectedMember._id, 'Approved')} className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm transition-colors">Approve Member</button>
                <button disabled={actionLoading} type="button" onClick={() => handleStatusChange(selectedMember._id, 'Rejected')} className="mt-3 w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors">Reject</button>
                <button disabled={actionLoading} type="button" onClick={() => handleStatusChange(selectedMember._id, 'Pending')} className="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-200 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors">Set Pending</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Edit Member</h3>
              <button onClick={() => setEditRecord(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <XCircle size={24} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={editForm.fullName || ''} onChange={e => setEditForm({...editForm, fullName: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <input type="text" value={editForm.mobile || ''} onChange={e => setEditForm({...editForm, mobile: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select value={editForm.gender || ''} onChange={e => setEditForm({...editForm, gender: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DOB</label>
                  <input type="date" value={editForm.dob || ''} onChange={e => setEditForm({...editForm, dob: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input type="text" value={editForm.country || ''} onChange={e => setEditForm({...editForm, country: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input type="text" value={editForm.state || ''} onChange={e => setEditForm({...editForm, state: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" value={editForm.city || ''} onChange={e => setEditForm({...editForm, city: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" value={editForm.address || ''} onChange={e => setEditForm({...editForm, address: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input type="text" value={editForm.companyName || ''} onChange={e => setEditForm({...editForm, companyName: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <select value={editForm.designation || ''} onChange={e => setEditForm({...editForm, designation: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="">Select Designation</option>
                    <option value="Board of Directors">Board of Directors</option>
                    <option value="Working Committee">Working Committee</option>
                    <option value="Statutory Committee">Statutory Committee</option>
                    <option value="Project/Wing Committee">Project/Wing Committee</option>
                    <option value="Zone Chairman">Zone Chairman</option>
                    <option value="Chapter Chairman">Chapter Chairman</option>
                    <option value="Chief Secretary">Chief Secretary</option>
                  </select>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                  <input type="text" value={editForm.remarks || ''} onChange={e => setEditForm({...editForm, remarks: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea value={editForm.bio || ''} onChange={e => setEditForm({...editForm, bio: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg min-h-[80px] focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>
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

export default ManageMembers;
