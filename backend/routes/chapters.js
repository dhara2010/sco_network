const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');

// Helper function to geocode pincode
async function getCoordinates(pincode) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json`, {
      headers: { 'User-Agent': 'SCO_Network_App/1.0' }
    });
    const data = await response.json();
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }
  } catch (err) {
    console.error('Geocoding error:', err);
  }
  return null;
}

// @route   GET /api/chapters/public
// @desc    Get all APPROVED chapters for the frontend map
// @access  Public
router.get('/public', async (req, res) => {
  try {
    const chapters = await Chapter.find({ status: 'approved' });
    res.json(chapters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/chapters/admin
// @desc    Get all chapters for admin panel
// @access  Public (should be protected in prod)
router.get('/admin', async (req, res) => {
  try {
    const chapters = await Chapter.find().sort({ createdAt: -1 });
    res.json(chapters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/chapters/admin
// @desc    Create a new chapter
// @access  Public (should be protected in prod)
router.post('/admin', async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.pincode) {
      const coords = await getCoordinates(payload.pincode);
      if (coords) {
        payload.latitude = coords.lat;
        payload.longitude = coords.lon;
      }
    }
    
    const newChapter = new Chapter({
      ...payload,
      status: payload.status || 'pending'
    });
    const chapter = await newChapter.save();
    res.json(chapter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/chapters/admin/:id
// @desc    Update a chapter
// @access  Public (should be protected in prod)
router.put('/admin/:id', async (req, res) => {
  try {
    let chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ msg: 'Chapter not found' });

    const payload = { ...req.body };
    // Only fetch new coordinates if pincode has changed and is present
    if (payload.pincode && payload.pincode !== chapter.pincode) {
      const coords = await getCoordinates(payload.pincode);
      if (coords) {
        payload.latitude = coords.lat;
        payload.longitude = coords.lon;
      }
    }

    chapter = await Chapter.findByIdAndUpdate(
      req.params.id,
      { $set: payload },
      { new: true }
    );
    res.json(chapter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/chapters/admin/:id
// @desc    Delete a chapter
// @access  Public (should be protected in prod)
router.delete('/admin/:id', async (req, res) => {
  try {
    let chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ msg: 'Chapter not found' });

    await Chapter.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Chapter removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
