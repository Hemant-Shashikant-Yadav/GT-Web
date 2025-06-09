import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  jobTitle: {
    type: String,
    maxlength: 100,
    default: ''
  },
  company: {
    type: String,
    maxlength: 100,
    default: ''
  },
  location: {
    type: String,
    maxlength: 100,
    default: ''
  },
  skills: [{
    type: String,
    maxlength: 50
  }],
  achievements: [{
    title: String,
    description: String,
    date: Date
  }],
  projects: [{
    title: String,
    description: String,
    url: String,
    image: String
  }],
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
    website: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model('User', userSchema);