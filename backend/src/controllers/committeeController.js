const CommitteeMember = require('../models/CommitteeMember');
const CommitteeApplication = require('../models/CommitteeApplication');
const User = require('../models/User');

// @desc    Get all committee members (public)
// @route   GET /api/committee
// @access  Public
exports.getCommitteeMembers = async (req, res) => {
  try {
    const committee = await CommitteeMember.find().populate('memberId', 'email');
    res.json(committee);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Apply for committee member
// @route   POST /api/committee/apply
// @access  Private (Member)
exports.applyForCommittee = async (req, res) => {
  try {
    const newApp = new CommitteeApplication({
      memberId: req.user.id,
      desiredDesignation: req.body.desiredDesignation,
      experience: req.body.experience,
      status: 'pending'
    });
    const savedApp = await newApp.save();
    res.status(201).json({ message: 'Application submitted', application: savedApp });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get committee applications
// @route   GET /api/committee/applications
// @access  Private (Chapter Admin, Super Admin)
exports.getCommitteeApplications = async (req, res) => {
  try {
    const apps = await CommitteeApplication.find().populate('memberId', 'email');
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Approve/Reject committee application
// @route   PUT /api/committee/applications/:id
// @access  Private (Chapter Admin, Super Admin)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const app = await CommitteeApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });

    app.status = status;
    await app.save();

    if (status === 'approved') {
      const newMember = new CommitteeMember({
        memberId: app.memberId,
        designation: app.desiredDesignation,
        description: app.experience || ''
      });
      await newMember.save();

      // Update User role
      await User.findByIdAndUpdate(app.memberId, { role: 'Committee Member' });
    }

    res.json({ message: `Application ${status}`, application: app });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Manually add committee member
// @route   POST /api/committee
// @access  Private (Chapter Admin, Super Admin)
exports.addCommitteeMember = async (req, res) => {
  try {
    const newMember = new CommitteeMember(req.body);
    const member = await newMember.save();
    
    // Update User role
    await User.findByIdAndUpdate(req.body.memberId, { role: 'Committee Member' });

    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update committee member
// @route   PUT /api/committee/:id
// @access  Private (Chapter Admin, Super Admin)
exports.updateCommitteeMember = async (req, res) => {
  try {
    const member = await CommitteeMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ message: 'Not found' });
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Remove committee member
// @route   DELETE /api/committee/:id
// @access  Private (Chapter Admin, Super Admin)
exports.removeCommitteeMember = async (req, res) => {
  try {
    const member = await CommitteeMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: 'Not found' });

    // Revert role to Member
    await User.findByIdAndUpdate(member.memberId, { role: 'Member' });

    res.json({ message: 'Removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
