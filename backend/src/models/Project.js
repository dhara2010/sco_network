const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'Folder',
  },
  category: {
    type: String,
    required: true,
    default: 'Project',
  },
  description: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
  },
  gallery: [{
    type: String,
  }],
  location: {
    type: String,
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
  },
  member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
