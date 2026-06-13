const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

// Public route
router.post('/', contactController.submitInquiry);

// Admin routes
router.get('/', protect, authorize('Chapter Admin', 'Super Admin'), contactController.getInquiries);
router.put('/:id/status', protect, authorize('Chapter Admin', 'Super Admin'), contactController.updateInquiryStatus);
router.delete('/:id', protect, authorize('Chapter Admin', 'Super Admin'), contactController.deleteInquiry);

module.exports = router;
