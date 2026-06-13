const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/reports/public
// @desc    Get all APPROVED reports
// @access  Public
router.get('/public', async (req, res) => {
  try {
    // We can also allow filtering by category if needed
    const { category } = req.query;
    const query = { status: 'Approved' };
    if (category && category !== 'All Years') {
       query.category = category;
    }
    const reports = await Report.find(query).sort({ reportYear: -1, createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   GET /api/reports/admin
// @desc    Get all reports (with optional status filter)
// @access  Private (Admin)
router.get('/admin', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const reports = await Report.find(query).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   POST /api/reports/admin
// @desc    Create a new report
// @access  Private (Admin)
router.post('/admin', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const newReport = new Report({
      ...req.body,
      status: 'Pending' // Always pending by default
    });
    await newReport.save();
    res.status(201).json({ message: 'Report created successfully and is pending approval.', report: newReport });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   PUT /api/reports/admin/:id
// @desc    Update a report (includes status update)
// @access  Private (Admin)
router.put('/admin/:id', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json({ message: 'Report updated successfully', report });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   DELETE /api/reports/admin/:id
// @desc    Delete a report
// @access  Private (Admin)
router.delete('/admin/:id', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;
