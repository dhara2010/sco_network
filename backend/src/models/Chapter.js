const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  chapterName: {
    type: String,
    trim: true
  },
  cityName: {
    type: String,
    required: true,
    trim: true
  },
  websiteUrl: {
    type: String,
    trim: true
  },
  pincode: {
    type: String,
    trim: true
  },
  membersCount: {
    type: Number,
    default: 0
  },
  presidentName: {
    type: String
  },
  establishedYear: {
    type: Number
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  status: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Chapter', ChapterSchema);
