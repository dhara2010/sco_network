const mongoose = require('mongoose');

const contactInquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Resolved'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('ContactInquiry', contactInquirySchema);
