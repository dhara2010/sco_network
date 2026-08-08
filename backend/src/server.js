const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Fix for ISP DNS SRV Blocking (forces Google DNS)
require('dns').setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const membersRoutes = require('./routes/members');
const contactRoutes = require('./routes/contact');

const dashboardRoutes = require('./routes/dashboard');
const projectsRoutes = require('./routes/projects');
const reportsRoutes = require('./routes/reports');
const chaptersRoutes = require('./routes/chapters');
const memberDashboardRoutes = require('./routes/member-dashboard');
const activitiesRoutes = require('./routes/activities');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/members', membersRoutes);
app.use('/api/v1/contact', contactRoutes);

app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/projects', projectsRoutes);
app.use('/api/v1/reports', reportsRoutes);
app.use('/api/v1/chapters', chaptersRoutes);
app.use('/api/v1/member-dashboard', memberDashboardRoutes);
app.use('/api/v1/activities', activitiesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
