const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    default: 'Report',
  },
  description: {
    type: String,
    required: true,
  },
  reportFile: {
    type: String,
    required: true, // The actual PDF/Document URL
  },
  coverImage: {
    type: String,
  },
  reportYear: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    default: 'Admin',
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  remarks: {
    type: String,
    default: '',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);
