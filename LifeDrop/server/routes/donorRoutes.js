const express = require('express');
const {
  getAllDonors,
  searchDonors,
  updateAvailability,
} = require('../controllers/donorController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/search', protect, searchDonors);
router.get('/', protect, getAllDonors);
router.put('/availability', protect, updateAvailability);

module.exports = router;