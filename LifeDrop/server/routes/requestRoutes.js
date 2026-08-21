const express = require('express');
const {
  createRequest,
  getAllRequests,
  updateRequestStatus,
  deleteRequest,
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createRequest);
router.get('/', protect, getAllRequests);
router.put('/:id/status', protect, updateRequestStatus);
router.delete('/:id', protect, deleteRequest);

module.exports = router;