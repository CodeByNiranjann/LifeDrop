// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Name is required'],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
//     },
//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//       minlength: [6, 'Password must be at least 6 characters'],
//       select: false,
//     },
//     phone: {
//       type: String,
//       required: [true, 'Phone number is required'],
//       trim: true,
//     },
//     city: {
//       type: String,
//       required: [true, 'City is required'],
//       trim: true,
//     },
//     bloodGroup: {
//       type: String,
//       required: [true, 'Blood group is required'],
//       enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//     },
//     age: {
//       type: Number,
//       required: [true, 'Age is required'],
//       min: [18, 'Donor must be at least 18 years old'],
//       max: [65, 'Donor must be under 65 years old'],
//     },
//     gender: {
//       type: String,
//       required: [true, 'Gender is required'],
//       enum: ['Male', 'Female', 'Other'],
//     },
//     lastDonated: {
//       type: Date,
//       default: null,
//     },
//     available: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
//   }
// );

// userSchema.pre('save', async function hashPassword(next) {
//   if (!this.isModified('password')) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// userSchema.methods.matchPassword = async function matchPassword(enteredPassword) {
//   return bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model('User', userSchema);

// module.exports = User;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: ['Donor', 'Seeker'],
      default: 'Seeker',
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: [
        function isDonor() {
          return this.role === 'Donor';
        },
        'Blood group is required for donors',
      ],
    },
    age: {
      type: Number,
      min: [18, 'Donor must be at least 18 years old'],
      max: [65, 'Donor must be under 65 years old'],
      required: [
        function isDonor() {
          return this.role === 'Donor';
        },
        'Age is required for donors',
      ],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: [
        function isDonor() {
          return this.role === 'Donor';
        },
        'Gender is required for donors',
      ],
    },
    lastDonated: {
      type: Date,
      default: null,
    },
    available: {
      type: Boolean,
      default: function defaultAvailability() {
        return this.role === 'Donor';
      },
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function matchPassword(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;