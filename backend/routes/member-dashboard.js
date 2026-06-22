const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Report = require('../models/Report');
const Activity = require('../models/Activity');
const { protect, authorize } = require('../middleware/auth');

// Apply middleware to all routes in this file
router.use(protect);
router.use(authorize('Member'));

// @route   GET /api/member-dashboard/stats
// @desc    Get counts of member's projects, reports, activities
router.get('/stats', async (req, res) => {
  try {
    const memberId = req.user.id;
    const projectsCount = await Project.countDocuments({ member_id: memberId });
    const reportsCount = await Report.countDocuments({ member_id: memberId });
    const activitiesCount = await Activity.countDocuments({ member_id: memberId });

    res.json({
      projects: projectsCount,
      reports: reportsCount,
      activities: activitiesCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// --- PROJECTS ---

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find({ member_id: req.user.id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

router.post('/projects', async (req, res) => {
  try {
    const newProject = new Project({
      ...req.body,
      member_id: req.user.id,
      createdBy: 'Member',
      status: 'Pending',
      remarks: ''
    });
    await newProject.save();
    res.status(201).json({ message: 'Project submitted successfully.', project: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, member_id: req.user.id });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.status === 'Approved') return res.status(403).json({ message: 'Cannot edit an approved project' });

    // Update fields except status and member_id
    const { status, member_id, createdBy, remarks, ...updateData } = req.body;
    Object.assign(project, updateData);
    project.status = 'Pending'; // Resubmit as pending
    project.remarks = '';

    await project.save();
    res.json({ message: 'Project updated successfully.', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, member_id: req.user.id });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.status === 'Approved') return res.status(403).json({ message: 'Cannot delete an approved project' });

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// --- REPORTS ---

router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find({ member_id: req.user.id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

router.post('/reports', async (req, res) => {
  try {
    const newReport = new Report({
      ...req.body,
      member_id: req.user.id,
      createdBy: 'Member',
      status: 'Pending',
      remarks: ''
    });
    await newReport.save();
    res.status(201).json({ message: 'Report submitted successfully.', report: newReport });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

router.put('/reports/:id', async (req, res) => {
  try {
    const report = await Report.findOne({ _id: req.params.id, member_id: req.user.id });
    if (!report) return res.status(404).json({ message: 'Report not found' });
    if (report.status === 'Approved') return res.status(403).json({ message: 'Cannot edit an approved report' });

    const { status, member_id, createdBy, remarks, ...updateData } = req.body;
    Object.assign(report, updateData);
    report.status = 'Pending';
    report.remarks = '';

    await report.save();
    res.json({ message: 'Report updated successfully.', report });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

router.delete('/reports/:id', async (req, res) => {
  try {
    const report = await Report.findOne({ _id: req.params.id, member_id: req.user.id });
    if (!report) return res.status(404).json({ message: 'Report not found' });
    if (report.status === 'Approved') return res.status(403).json({ message: 'Cannot delete an approved report' });

    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// --- ACTIVITIES ---

router.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find({ member_id: req.user.id }).sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

router.post('/activities', async (req, res) => {
  try {
    const newActivity = new Activity({
      ...req.body,
      member_id: req.user.id,
      createdBy: 'Member',
      status: 'Pending',
      remarks: ''
    });
    await newActivity.save();
    res.status(201).json({ message: 'Activity submitted successfully.', activity: newActivity });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

router.put('/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findOne({ _id: req.params.id, member_id: req.user.id });
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    if (activity.status === 'Approved') return res.status(403).json({ message: 'Cannot edit an approved activity' });

    const { status, member_id, createdBy, remarks, ...updateData } = req.body;
    Object.assign(activity, updateData);
    activity.status = 'Pending';
    activity.remarks = '';

    await activity.save();
    res.json({ message: 'Activity updated successfully.', activity });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

router.delete('/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findOne({ _id: req.params.id, member_id: req.user.id });
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    if (activity.status === 'Approved') return res.status(403).json({ message: 'Cannot delete an approved activity' });

    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;
