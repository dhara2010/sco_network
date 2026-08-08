const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  profilePicture: { type: String, default: '' }, // We'll store a base64 string or URL here
  gender: { type: String },
  dob: { type: Date },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  address: { type: String },
  companyName: { type: String },
  businessType: { type: String },
  occupation: { type: String },
  website: { type: String },
  designation: {
    type: String,
    required: true,
    enum: [
      'Board of Directors',
      'Working Committee',
      'Statutory Committee',
      'Project/Wing Committee',
      'Zone Chairman',
      'Chapter Chairman',
      'Chief Secretary'
    ]
  },
  experience: { type: String },
  bio: { type: String },
  bloodGroup: { type: String },
  businessAddress: { type: String },
  businessDescription: { type: String },
  businessEmail: { type: String },
  businessMobile: { type: String },
  businessSince: { type: Date },
  connectionsCount: { type: Number, default: 0 },
  memberOf: { type: String },
  renewalDate: { type: Date },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  groupId: { type: String },
  groupPosition: { type: String },
  socialLinks: {
    whatsapp: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    linkedin: { type: String }
  },
  v2vSheetVisible: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  remarks: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
