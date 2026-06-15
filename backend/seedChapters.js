const mongoose = require('mongoose');
const Chapter = require('./models/Chapter');
require('dotenv').config();

// Fix for ISP DNS SRV Blocking
require('dns').setServers(['8.8.8.8', '8.8.4.4']);

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');
    await Chapter.deleteMany({});
    
    const chapters = [
      { cityName: "Ahmedabad", websiteUrl: "https://ahmedabad.scowork.org", latitude: 23.0225, longitude: 72.5714, status: "approved" },
      { cityName: "Surat", websiteUrl: "https://surat.scowork.org", latitude: 21.1702, longitude: 72.8311, status: "approved" },
      { cityName: "Vadodara", websiteUrl: "https://vadodara.scowork.org", latitude: 22.3072, longitude: 73.1812, status: "approved" },
      { cityName: "Rajkot", websiteUrl: "https://rajkot.scowork.org", latitude: 22.3039, longitude: 70.8022, status: "approved" },
      { cityName: "Bhavnagar", websiteUrl: "https://bhavnagar.scowork.org", latitude: 21.7645, longitude: 72.1519, status: "approved" },
      { cityName: "Gandhinagar", websiteUrl: "https://gandhinagar.scowork.org", latitude: 23.2156, longitude: 72.6369, status: "approved" },
      { cityName: "Jamnagar", websiteUrl: "https://jamnagar.scowork.org", latitude: 22.4707, longitude: 70.0577, status: "approved" },
      { cityName: "Junagadh", websiteUrl: "https://junagadh.scowork.org", latitude: 21.5222, longitude: 70.4579, status: "approved" }
    ];
    
    await Chapter.insertMany(chapters);
    console.log(`Seeded ${chapters.length} chapters.`);
    process.exit();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
