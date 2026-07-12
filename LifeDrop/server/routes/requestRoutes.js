const express = require('express');
const {
  createRequest,
  getAllRequests,
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createRequest);
router.get('/', protect, getAllRequests);

module.exports = router;