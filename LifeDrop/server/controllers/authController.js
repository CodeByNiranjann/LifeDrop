// const User = require('../models/User');
// const generateToken = require('../utils/generateToken');

// // @desc    Register a new user
// // @route   POST /api/auth/register
// // @access  Public
// const registerUser = async (req, res, next) => {
//   try {
//     const { name, email, password, phone, city, bloodGroup, age, gender } = req.body;

//     if (!name || !email || !password || !phone || !city || !bloodGroup || !age || !gender) {
//       res.status(400);
//       throw new Error('Please provide all required fields');
//     }

//     const userExists = await User.findOne({ email: email.toLowerCase() });
//     if (userExists) {
//       res.status(400);
//       throw new Error('An account with this email already exists');
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//       phone,
//       city,
//       bloodGroup,
//       age,
//       gender,
//     });

//     const token = generateToken(user._id);

//     res.status(201).json({
//       token,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         city: user.city,
//         bloodGroup: user.bloodGroup,
//         age: user.age,
//         gender: user.gender,
//         lastDonated: user.lastDonated,
//         available: user.available,
//         createdAt: user.createdAt,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Authenticate user & get token
// // @route   POST /api/auth/login
// // @access  Public
// const loginUser = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       res.status(400);
//       throw new Error('Please provide email and password');
//     }

//     const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

//     if (!user || !(await user.matchPassword(password))) {
//       res.status(401);
//       throw new Error('Invalid email or password');
//     }

//     const token = generateToken(user._id);

//     res.status(200).json({
//       token,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         city: user.city,
//         bloodGroup: user.bloodGroup,
//         age: user.age,
//         gender: user.gender,
//         lastDonated: user.lastDonated,
//         available: user.available,
//         createdAt: user.createdAt,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Get logged-in user's profile
// // @route   GET /api/auth/profile
// // @access  Private
// const getProfile = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       res.status(404);
//       throw new Error('User not found');
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Update logged-in user's profile
// // @route   PUT /api/auth/profile
// // @access  Private
// const updateProfile = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       res.status(404);
//       throw new Error('User not found');
//     }

//     const { name, phone, city, bloodGroup, age, gender, available, lastDonated } = req.body;

//     user.name = name ?? user.name;
//     user.phone = phone ?? user.phone;
//     user.city = city ?? user.city;
//     user.bloodGroup = bloodGroup ?? user.bloodGroup;
//     user.age = age ?? user.age;
//     user.gender = gender ?? user.gender;
//     user.available = typeof available === 'boolean' ? available : user.available;
//     user.lastDonated = lastDonated ?? user.lastDonated;

//     const updatedUser = await user.save();

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   getProfile,
//   updateProfile,
// };

const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      city,
      role,
      bloodGroup,
      age,
      gender,
    } = req.body;

    if (!name || !email || !password || !phone || !city || !role) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    if (!['Donor', 'Seeker'].includes(role)) {
      res.status(400);
      throw new Error('Role must be either Donor or Seeker');
    }

    if (role === 'Donor' && (!bloodGroup || !age || !gender)) {
      res.status(400);
      throw new Error('Blood group, age, and gender are required for donors');
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      res.status(400);
      throw new Error('An account with this email already exists');
    }

    const userData = {
      name,
      email,
      password,
      phone,
      city,
      role,
    };

    if (role === 'Donor') {
      userData.bloodGroup = bloodGroup;
      userData.age = age;
      userData.gender = gender;
    }

    const user = await User.create(userData);

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        role: user.role,
        bloodGroup: user.bloodGroup,
        age: user.age,
        gender: user.gender,
        lastDonated: user.lastDonated,
        available: user.available,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        role: user.role,
        bloodGroup: user.bloodGroup,
        age: user.age,
        gender: user.gender,
        lastDonated: user.lastDonated,
        available: user.available,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged-in user's profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// @desc    Update logged-in user's profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const { name, phone, city, bloodGroup, age, gender, available, lastDonated } = req.body;

    user.name = name ?? user.name;
    user.phone = phone ?? user.phone;
    user.city = city ?? user.city;

    if (user.role === 'Donor') {
      user.bloodGroup = bloodGroup ?? user.bloodGroup;
      user.age = age ?? user.age;
      user.gender = gender ?? user.gender;
      user.available = typeof available === 'boolean' ? available : user.available;
      user.lastDonated = lastDonated ?? user.lastDonated;
    }

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
};