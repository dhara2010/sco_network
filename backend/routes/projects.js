const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/projects/public
// @desc    Get all APPROVED projects
// @access  Public
router.get('/public', async (req, res) => {
  try {
    const projects = await Project.find({ status: 'Approved' }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   GET /api/projects/public/:id
// @desc    Get single APPROVED project by ID
// @access  Public
router.get('/public/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, status: 'Approved' });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   GET /api/projects/admin
// @desc    Get all projects (with optional status filter)
// @access  Private (Admin)
router.get('/admin', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   POST /api/projects/admin
// @desc    Create a new project
// @access  Private (Admin)
router.post('/admin', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const newProject = new Project({
      ...req.body,
      status: 'Pending' // Always pending by default
    });
    await newProject.save();
    res.status(201).json({ message: 'Project created successfully and is pending approval.', project: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   PUT /api/projects/admin/:id
// @desc    Update a project (includes status update)
// @access  Private (Admin)
router.put('/admin/:id', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project updated successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   DELETE /api/projects/admin/:id
// @desc    Delete a project
// @access  Private (Admin)
router.delete('/admin/:id', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;
