const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Member = require('../models/Member');
const Project = require('../models/Project');
const Report = require('../models/Report');
const Activity = require('../models/Activity');
const Chapter = require('../models/Chapter');
const ContactInquiry = require('../models/ContactInquiry');
const { protect, authorize } = require('../middleware/auth');
const { startOfMonth, subMonths, endOfMonth } = require('date-fns');

// Helper to calculate percentage growth
const calculateGrowth = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

// @route   GET /api/dashboard/stats
// @desc    Get comprehensive dashboard statistics
// @access  Private (Super Admin, Chapter Admin)
router.get('/stats', protect, authorize('Super Admin', 'Chapter Admin'), async (req, res) => {
  try {
    const now = new Date();
    const currentMonthStart = startOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthEnd = endOfMonth(subMonths(now, 1));

    // Basic counts
    const [
      totalMembers, currentMonthMembers, lastMonthMembers,
      totalProjects, currentMonthProjects, lastMonthProjects,
      totalReports, currentMonthReports, lastMonthReports,
      totalActivities, currentMonthActivities, lastMonthActivities,
      totalChapters,
      pendingMembers, pendingProjects, pendingReports, pendingActivities,
      totalContactInquiries
    ] = await Promise.all([
      Member.countDocuments({ status: 'Approved' }),
      Member.countDocuments({ status: 'Approved', createdAt: { $gte: currentMonthStart } }),
      Member.countDocuments({ status: 'Approved', createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } }),

      Project.countDocuments(),
      Project.countDocuments({ createdAt: { $gte: currentMonthStart } }),
      Project.countDocuments({ createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } }),

      Report.countDocuments(),
      Report.countDocuments({ createdAt: { $gte: currentMonthStart } }),
      Report.countDocuments({ createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } }),

      Activity.countDocuments(),
      Activity.countDocuments({ createdAt: { $gte: currentMonthStart } }),
      Activity.countDocuments({ createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } }),

      Chapter.countDocuments(),

      Member.countDocuments({ status: 'Pending' }),
      Project.countDocuments({ status: 'Pending' }),
      Report.countDocuments({ status: 'Pending' }),
      Activity.countDocuments({ status: 'Pending' }),

      ContactInquiry.countDocuments()
    ]);

    // Timeline (Fetch latest across collections)
    const [latestMembers, latestProjects, latestReports, latestActivities] = await Promise.all([
      Member.find().sort({ createdAt: -1 }).limit(5).select('fullName createdAt status').lean(),
      Project.find().populate('member_id', 'fullName').sort({ createdAt: -1 }).limit(5).select('title createdAt status member_id').lean(),
      Report.find().populate('member_id', 'fullName').sort({ createdAt: -1 }).limit(5).select('title createdAt status member_id').lean(),
      Activity.find().populate('member_id', 'fullName').sort({ createdAt: -1 }).limit(5).select('title createdAt status member_id').lean(),
    ]);

    // Format timeline
    const timeline = [
      ...latestMembers.map(m => ({ type: 'Member', action: 'Registered', name: m.fullName, date: m.createdAt, status: m.status })),
      ...latestProjects.map(p => ({ type: 'Project', action: 'Submitted', name: p.member_id?.fullName || 'Admin', title: p.title, date: p.createdAt, status: p.status })),
      ...latestReports.map(r => ({ type: 'Report', action: 'Uploaded', name: r.member_id?.fullName || 'Admin', title: r.title, date: r.createdAt, status: r.status })),
      ...latestActivities.map(a => ({ type: 'Activity', action: 'Added', name: a.member_id?.fullName || 'Admin', title: a.title, date: a.createdAt, status: a.status })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

    // Chart Data (Mocking last 6 months for demo purposes to avoid huge aggregation queries if empty)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const chartData = [];
    for (let i = 5; i >= 0; i--) {
      const d = subMonths(now, i);
      const start = startOfMonth(d);
      const end = endOfMonth(d);
      
      const pCount = await Project.countDocuments({ createdAt: { $gte: start, $lte: end } });
      const rCount = await Report.countDocuments({ createdAt: { $gte: start, $lte: end } });
      const aCount = await Activity.countDocuments({ createdAt: { $gte: start, $lte: end } });
      
      chartData.push({
        name: monthNames[d.getMonth()],
        projects: pCount,
        reports: rCount,
        activities: aCount
      });
    }

    // Reports approval rate
    const approvedReports = await Report.countDocuments({ status: 'Approved' });
    const reportApprovalRate = totalReports > 0 ? Math.round((approvedReports / totalReports) * 100) : 0;

    // Leaderboards
    // Top Contributors
    const topMembersAgg = await Project.aggregate([
      { $group: { _id: '$member_id', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);
    const topContributors = await Member.populate(topMembersAgg, { path: '_id', select: 'fullName profilePicture city' });

    // Chapter Performance (group by member city)
    const chapterPerformance = await Project.aggregate([
      {
        $lookup: {
          from: 'members',
          localField: 'member_id',
          foreignField: '_id',
          as: 'member'
        }
      },
      { $unwind: '$member' },
      { $group: { _id: '$member.city', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);

    const stats = {
      hero: {
        totalMembers, memberGrowth: calculateGrowth(currentMonthMembers, lastMonthMembers),
        totalProjects, projectGrowth: calculateGrowth(currentMonthProjects, lastMonthProjects),
        totalReports, reportGrowth: calculateGrowth(currentMonthReports, lastMonthReports),
        totalActivities, activityGrowth: calculateGrowth(currentMonthActivities, lastMonthActivities),
      },
      pending: {
        members: pendingMembers,
        projects: pendingProjects,
        reports: pendingReports,
        activities: pendingActivities,
      },
      system: {
        totalChapters,
        totalContactInquiries,
        reportApprovalRate
      },
      timeline,
      chartData,
      leaderboards: {
        topContributors: topContributors.map((c, i) => ({
          member: c._id,
          count: c.count,
          rank: i + 1
        })).filter(c => c.member !== null),
        topChapters: chapterPerformance.map((c, i) => ({
          chapter: c._id || 'Unknown',
          count: c.count,
          rank: i + 1
        }))
      }
    };
    
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
