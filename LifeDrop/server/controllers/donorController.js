// const User = require('../models/User');

// // @desc    Get all registered donors
// // @route   GET /api/donors
// // @access  Private
// const getAllDonors = async (req, res, next) => {
//   try {
//     const donors = await User.find({}).sort({ createdAt: -1 });
//     res.status(200).json(donors);
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Search donors by city and/or blood group
// // @route   GET /api/donors/search
// // @access  Private
// const searchDonors = async (req, res, next) => {
//   try {
//     const { city, bloodGroup } = req.query;

//     const filter = {};

//     if (city) {
//       filter.city = { $regex: city, $options: 'i' };
//     }

//     if (bloodGroup) {
//       filter.bloodGroup = bloodGroup;
//     }

//     const donors = await User.find(filter).sort({ available: -1, createdAt: -1 });

//     res.status(200).json(donors);
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Update logged-in user's donor availability
// // @route   PUT /api/donors/availability
// // @access  Private
// const updateAvailability = async (req, res, next) => {
//   try {
//     const { available } = req.body;

//     if (typeof available !== 'boolean') {
//       res.status(400);
//       throw new Error('Availability must be true or false');
//     }

//     const user = await User.findById(req.user._id);

//     if (!user) {
//       res.status(404);
//       throw new Error('User not found');
//     }

//     user.available = available;
//     const updatedUser = await user.save();

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   getAllDonors,
//   searchDonors,
//   updateAvailability,
// };

const User = require('../models/User');

// @desc    Get all registered donors
// @route   GET /api/donors
// @access  Private
const getAllDonors = async (req, res, next) => {
  try {
    const donors = await User.find({ role: 'Donor' }).sort({ createdAt: -1 });
    res.status(200).json(donors);
  } catch (error) {
    next(error);
  }
};

// @desc    Search donors by city and/or blood group
// @route   GET /api/donors/search
// @access  Private
const searchDonors = async (req, res, next) => {
  try {
    const { city, bloodGroup } = req.query;

    const filter = { role: 'Donor' };

    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }

    if (bloodGroup) {
      filter.bloodGroup = bloodGroup;
    }

    const donors = await User.find(filter).sort({ available: -1, createdAt: -1 });

    res.status(200).json(donors);
  } catch (error) {
    next(error);
  }
};

// @desc    Update logged-in user's donor availability
// @route   PUT /api/donors/availability
// @access  Private
const updateAvailability = async (req, res, next) => {
  try {
    const { available } = req.body;

    if (typeof available !== 'boolean') {
      res.status(400);
      throw new Error('Availability must be true or false');
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (user.role !== 'Donor') {
      res.status(403);
      throw new Error('Only donors can update availability');
    }

    user.available = available;
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDonors,
  searchDonors,
  updateAvailability,
};