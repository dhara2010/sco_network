const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Fix for ISP DNS SRV Blocking (forces Google DNS)
require('dns').setServers(['8.8.8.8', '8.8.4.4']);

const Member = require('./src/models/Member');
const Project = require('./src/models/Project');
const Chapter = require('./src/models/Chapter');
const Report = require('./src/models/Report');

async function seedData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    // Create a temporary CommonJS version of the static data
    const staticDataPath = path.join(__dirname, '../frontend/src/data/staticData.js');
    let content = fs.readFileSync(staticDataPath, 'utf8');
    content = content.replace(/export const/g, 'exports.');
    content = content.replace(/export let/g, 'exports.');
    
    const tempPath = path.join(__dirname, 'tempStaticData.js');
    fs.writeFileSync(tempPath, content);
    
    // Require the temp file
    const staticData = require('./tempStaticData');

    console.log('Clearing existing data...');
    await Member.deleteMany({});
    await Project.deleteMany({});
    await Chapter.deleteMany({});
    await Report.deleteMany({});

    console.log('Inserting Members...');
    if (staticData.membersData && staticData.membersData.length > 0) {
      await Member.insertMany(staticData.membersData);
    }

    console.log('Inserting Projects...');
    if (staticData.projectsData && staticData.projectsData.length > 0) {
      await Project.insertMany(staticData.projectsData);
    }

    console.log('Inserting Chapters...');
    if (staticData.chaptersData && staticData.chaptersData.length > 0) {
      await Chapter.insertMany(staticData.chaptersData);
    }

    console.log('Inserting Reports...');
    if (staticData.reportsData && staticData.reportsData.length > 0) {
      await Report.insertMany(staticData.reportsData);
    }

    console.log('Seeding completed successfully!');
    
    // Clean up temp file
    fs.unlinkSync(tempPath);
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

seedData();
