const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const { protect, authorize } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// @route   POST /api/members/register
// @desc    Register a new member
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newMember = new Member({
      ...rest,
      email,
      password: hashedPassword,
      status: 'Pending'
    });

    await newMember.save();

    res.status(201).json({ message: 'Registration submitted successfully. Pending approval.' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   GET /api/members/public
// @desc    Get all approved members grouped by designation
// @access  Public
router.get('/public', async (req, res) => {
  try {
    const members = await Member.find({ status: 'Approved' }).select('-password -remarks');
    
    // Group by designation
    const groupedMembers = members.reduce((acc, member) => {
      const { designation } = member;
      if (!acc[designation]) acc[designation] = [];
      acc[designation].push(member);
      return acc;
    }, {});

    res.json(groupedMembers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/members/public/:id
// @desc    Get a single approved member by ID
// @access  Public
router.get('/public/:id', async (req, res) => {
  try {
    const member = await Member.findOne({ _id: req.params.id, status: 'Approved' }).select('-password -remarks');
    if (!member) {
      return res.status(404).json({ message: 'Member not found or not approved' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// @route   GET /api/members/admin
// @desc    Get all members for admin (supports filtering)
// @access  Private (Super Admin)
router.get('/admin', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};
    
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } }
      ];
    }

    const members = await Member.find(query).select('-password').sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/members/admin/:id
// @desc    Update member status and remarks
// @access  Private (Super Admin)
router.put('/admin/:id', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const { status, remarks } = req.body;
    
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    if (status) member.status = status;
    if (remarks !== undefined) member.remarks = remarks;

    await member.save();
    
    res.json({ message: `Member ${status.toLowerCase()}`, member });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/members/stats
// @desc    Get statistics for members
// @access  Private (Super Admin)
router.get('/stats', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();
    const pendingMembers = await Member.countDocuments({ status: 'Pending' });
    const approvedMembers = await Member.countDocuments({ status: 'Approved' });
    const rejectedMembers = await Member.countDocuments({ status: 'Rejected' });

    const membersByDesignation = await Member.aggregate([
      { $match: { status: 'Approved' } },
      { $group: { _id: '$designation', count: { $sum: 1 } } }
    ]);

    res.json({
      totalMembers,
      pendingMembers,
      approvedMembers,
      rejectedMembers,
      membersByDesignation
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
