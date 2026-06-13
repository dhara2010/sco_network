const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Seed route to create initial Super Admin
router.post('/seed', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const admin = new User({ email, password: hashedPassword, role: 'Super Admin', isActive: true });
    await admin.save();
    
    res.status(201).json({ message: 'Super Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



// Unified Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if it's the hardcoded legacy admin
    if (email === 'admin12@gmail.com' && password === 'admin1234') {
      const payload = {
        user: {
          id: '000000000000000000000000',
          role: 'Super Admin'
        }
      };
      
      jwt.sign(
        payload,
        process.env.JWT_SECRET || 'secret123',
        { expiresIn: '1d' },
        (err, token) => {
          if (err) throw err;
          return res.json({ token, role: 'Super Admin' });
        }
      );
      return;
    }

    // Check if it's a registered user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    if (!user.isActive) {
      return res.status(403).json({ message: 'Your account is inactive.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, role: user.role });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
