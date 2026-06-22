const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/activities/public
// @desc    Get all APPROVED activities
// @access  Public
router.get('/public', async (req, res) => {
  try {
    const activities = await Activity.find({ status: 'Approved' }).sort({ activityDate: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   GET /api/activities/public/:id
// @desc    Get single APPROVED activity by ID
// @access  Public
router.get('/public/:id', async (req, res) => {
  try {
    const activity = await Activity.findOne({ _id: req.params.id, status: 'Approved' });
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   GET /api/activities/admin
// @desc    Get all activities (with optional status filter)
// @access  Private (Admin)
router.get('/admin', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const activities = await Activity.find(query).populate('member_id', 'fullName email').sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   POST /api/activities/admin
// @desc    Create a new activity (Admin)
// @access  Private (Admin)
router.post('/admin', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const newActivity = new Activity({
      ...req.body,
      createdBy: 'Admin',
      status: 'Approved' // Admin created activities are automatically approved
    });
    await newActivity.save();
    res.status(201).json({ message: 'Activity created successfully.', activity: newActivity });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   PUT /api/activities/admin/:id
// @desc    Update an activity (includes status update/approval)
// @access  Private (Admin)
router.put('/admin/:id', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json({ message: 'Activity updated successfully', activity });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   DELETE /api/activities/admin/:id
// @desc    Delete an activity
// @access  Private (Admin)
router.delete('/admin/:id', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;
