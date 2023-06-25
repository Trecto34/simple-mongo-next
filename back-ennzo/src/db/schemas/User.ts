import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profession: {
    type: String,
    enum: ['Teacher', 'Director', 'Secretary', 'Student', 'Parent'],
  },
  teacher_Id: {
    type: String,
    required: function() {
      return this.profession === 'Teacher';
    },
  },
  disciplines: {
    type: [String],
    required: function() {
      return this.profession === 'Teacher';
    },
  },
});

User.pre('save', async function(next) {
  const hashedPass = await bcrypt.hash(this.password, 12)
  this.password = hashedPass;
  next();
});

export default mongoose.model("User", User);
