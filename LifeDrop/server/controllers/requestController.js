const BloodRequest = require('../models/BloodRequest');

// @desc    Create a new blood request
// @route   POST /api/requests
// @access  Private
const createRequest = async (req, res, next) => {
  try {
    const {
      patientName,
      hospital,
      city,
      bloodGroup,
      urgency,
      contactNumber,
      description,
    } = req.body;

    if (
      !patientName ||
      !hospital ||
      !city ||
      !bloodGroup ||
      !urgency ||
      !contactNumber ||
      !description
    ) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const request = await BloodRequest.create({
      patientName,
      hospital,
      city,
      bloodGroup,
      urgency,
      contactNumber,
      description,
      requestedBy: req.user._id,
    });

    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all blood requests
// @route   GET /api/requests
// @access  Private
const getAllRequests = async (req, res, next) => {
  try {
    const requests = await BloodRequest.find({})
      .populate('requestedBy', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRequest,
  getAllRequests,
};