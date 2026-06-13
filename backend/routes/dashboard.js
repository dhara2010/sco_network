const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Member = require('../models/Member');

const ContactInquiry = require('../models/ContactInquiry');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private (Super Admin, Chapter Admin)
router.get('/stats', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const stats = {
      totalMembers: await Member.countDocuments({ status: 'Approved' }),
      pendingMembers: await Member.countDocuments({ status: 'Pending' }),
      approvedMembers: await Member.countDocuments({ status: 'Approved' }),
      rejectedMembers: await Member.countDocuments({ status: 'Rejected' }),

      totalContactInquiries: await ContactInquiry.countDocuments()
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
