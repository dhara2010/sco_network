require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Project = require('./models/Project');
const Member = require('./models/Member');
const Activity = require('./models/Activity');
const Report = require('./models/Report');
const Chapter = require('./models/Chapter');

// Note: Ensure dns settings if needed (as done in seed script)
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function exportData() {
  try {
    console.log('Connecting to MongoDB...', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    const projects = await Project.find({}).lean();
    const members = await Member.find({}).lean();
    const activities = await Activity.find({}).lean();
    const reports = await Report.find({}).lean();
    const chapters = await Chapter.find({}).lean();

    const dataPath = path.join(__dirname, '..', 'frontend', 'src', 'data');
    if (!fs.existsSync(dataPath)) {
      fs.mkdirSync(dataPath, { recursive: true });
    }

    const content = `
// Static Data Exported from DB
export const projectsData = ${JSON.stringify(projects, null, 2)};

export const membersData = ${JSON.stringify(members, null, 2)};

export const activitiesData = ${JSON.stringify(activities, null, 2)};

export const reportsData = ${JSON.stringify(reports, null, 2)};

export const chaptersData = ${JSON.stringify(chapters, null, 2)};

export const dashboardStatsData = {
  totalMembers: ${members.length},
  activeProjects: ${projects.filter(p => p.status === 'Active').length},
  totalChapters: ${chapters.length},
  recentActivities: ${activities.length}
};
`;

    fs.writeFileSync(path.join(dataPath, 'staticData.js'), content);
    console.log('Static data successfully exported to frontend/src/data/staticData.js');
    process.exit(0);
  } catch (error) {
    console.error('Error exporting data:', error);
    process.exit(1);
  }
}

exportData();
