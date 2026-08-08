const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  activityDate: {
    type: Date,
    required: true,
  },
  images: [{
    type: String,
  }],
  documents: [{
    type: String,
  }],
  member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
  },
  createdBy: {
    type: String,
    default: 'Admin', // If admin creates it without member_id
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

module.exports = mongoose.model('Activity', activitySchema);
