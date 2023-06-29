import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Teacher schema
const teacherSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
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
  role: {
    type: String,
    required: true,
    enum: ['teacher'],
    default: 'teacher',
  },
  teacher_Id: {
    type: String,
    required: true,
  },
  disciplines: {
    type: [String],
    required: true,
  },
});

teacherSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const TeacherModel = mongoose.model('Teacher', teacherSchema);
