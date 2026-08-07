// const BloodRequest = require('../models/BloodRequest');

// // @desc    Create a new blood request
// // @route   POST /api/requests
// // @access  Private
// const createRequest = async (req, res, next) => {
//   try {
//     const {
//       patientName,
//       hospital,
//       city,
//       bloodGroup,
//       urgency,
//       contactNumber,
//       description,
//     } = req.body;

//     if (
//       !patientName ||
//       !hospital ||
//       !city ||
//       !bloodGroup ||
//       !urgency ||
//       !contactNumber ||
//       !description
//     ) {
//       res.status(400);
//       throw new Error('Please provide all required fields');
//     }

//     const request = await BloodRequest.create({
//       patientName,
//       hospital,
//       city,
//       bloodGroup,
//       urgency,
//       contactNumber,
//       description,
//       requestedBy: req.user._id,
//     });

//     res.status(201).json(request);
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Get all blood requests
// // @route   GET /api/requests
// // @access  Private
// const getAllRequests = async (req, res, next) => {
//   try {
//     const requests = await BloodRequest.find({})
//       .populate('requestedBy', 'name email phone')
//       .sort({ createdAt: -1 });

//     res.status(200).json(requests);
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   createRequest,
//   getAllRequests,
// };

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

// @desc    Get all blood requests (optionally filter by status)
// @route   GET /api/requests
// @access  Private
const getAllRequests = async (req, res, next) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) {
      filter.status = status;
    }

    const requests = await BloodRequest.find(filter)
      .populate('requestedBy', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a blood request's status (e.g. mark as Fulfilled)
// @route   PUT /api/requests/:id/status
// @access  Private (only the request's creator)
const updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'Fulfilled'].includes(status)) {
      res.status(400);
      throw new Error('Status must be either Pending or Fulfilled');
    }

    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      res.status(404);
      throw new Error('Blood request not found');
    }

    if (request.requestedBy.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('You are not authorized to update this request');
    }

    request.status = status;
    const updatedRequest = await request.save();

    res.status(200).json(updatedRequest);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete/cancel a blood request
// @route   DELETE /api/requests/:id
// @access  Private (only the request's creator)
const deleteRequest = async (req, res, next) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      res.status(404);
      throw new Error('Blood request not found');
    }

    if (request.requestedBy.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('You are not authorized to delete this request');
    }

    await request.deleteOne();

    res.status(200).json({ message: 'Blood request removed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  updateRequestStatus,
  deleteRequest,
};