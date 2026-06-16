import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const designations = [
  'Board of Directors',
  'Working Committee',
  'Statutory Committee',
  'Project/Wing Committee',
  'Zone Chairman',
  'Chapter Chairman',
  'Chief Secretary'
];

const BecomeMemberPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', confirmPassword: '', mobile: '',
    gender: '', dob: '', country: '', state: '', city: '', address: '',
    companyName: '', businessType: '', occupation: '', website: '',
    designation: '', experience: '', bio: '', declaration: false,
    profilePicture: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.declaration) {
      setError('You must confirm the declaration to proceed.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://sco-network.onrender.com/api/members/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit application');
      
      setSuccess('Application submitted successfully. Waiting for admin approval.');
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[var(--color-sco-navy)] to-[#112255] py-8 px-10 text-white">
          <h2 className="text-3xl font-bold">Become a Member</h2>
          <p className="mt-2 opacity-90">Join our prestigious organization by filling out the form below.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>}
          {success && <div className="p-4 bg-green-50 text-green-600 rounded-lg">{success}</div>}

          {/* Personal Information */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium text-gray-700">Full Name *</label><input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"/></div>
              <div><label className="block text-sm font-medium text-gray-700">Profile Picture</label><input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/></div>
              <div><label className="block text-sm font-medium text-gray-700">Email Address *</label><input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"/></div>
              <div><label className="block text-sm font-medium text-gray-700">Mobile Number *</label><input type="tel" name="mobile" required value={formData.mobile} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"/></div>
              <div><label className="block text-sm font-medium text-gray-700">Password *</label><input type="password" name="password" required value={formData.password} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"/></div>
              <div><label className="block text-sm font-medium text-gray-700">Confirm Password *</label><input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"/></div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700">Date of Birth</label><input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"/></div>
            </div>
          </section>

          {/* Address Information */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <div><label className="block text-sm font-medium text-gray-700">Country</label><input type="text" name="country" value={formData.country} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"/></div>
              <div><label className="block text-sm font-medium text-gray-700">State</label><input type="text" name="state" value={formData.state} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"/></div>
              <div><label className="block text-sm font-medium text-gray-700">City</label><input type="text" name="city" value={formData.city} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"/></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700">Full Address</label><textarea name="address" rows="2" value={formData.address} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"></textarea></div>
          </section>

          {/* Business Information */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium text-gray-700">Company Name</label><input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"/></div>
              <div><label className="block text-sm font-medium text-gray-700">Business Type</label><input type="text" name="businessType" value={formData.businessType} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"/></div>
              <div><label className="block text-sm font-medium text-gray-700">Occupation</label><input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"/></div>
              <div><label className="block text-sm font-medium text-gray-700">Website (Optional)</label><input type="url" name="website" value={formData.website} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"/></div>
            </div>
          </section>

          {/* Membership Information */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Membership Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Designation *</label>
                <select name="designation" required value={formData.designation} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select Designation</option>
                  {designations.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700">Experience</label><input type="text" name="experience" placeholder="e.g. 10 Years" value={formData.experience} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"/></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700">Short Introduction / Bio</label><textarea name="bio" rows="3" value={formData.bio} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"></textarea></div>
          </section>

          {/* Declaration */}
          <section>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleInputChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"/>
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-700">Declaration *</label>
                <p className="text-gray-500">I confirm that all information provided is correct and I agree to abide by the organization's rules and regulations.</p>
              </div>
            </div>
          </section>

          <div className="flex gap-4 pt-4 border-t">
            <button type="submit" disabled={loading} className="flex-1 bg-[var(--color-sco-navy)] text-white py-3 px-4 rounded-md shadow hover:bg-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-sco-navy)] font-semibold">
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
            <button type="button" onClick={() => window.location.reload()} className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-md shadow hover:bg-gray-200 transition-colors font-semibold">
              Reset Form
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BecomeMemberPage;
