import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StudentModel } from '../db/schemas/roles/student'
import {TeacherModel}from '../db/schemas/roles/teacher'
import {DirectorModel} from '../db/schemas/roles/director'
import {SecretaryModel}from '../db/schemas/roles/secretary'
import {ParentModel } from '../db/schemas/roles/parent'

class UserController {
  async find(req: Request, res: Response) {
    try {
      const students = await StudentModel.find();
      const teachers = await TeacherModel.find();
      const directors = await DirectorModel.find();
      const secretaries = await SecretaryModel.find();
      const parents = await ParentModel.find();
      const users = [...students, ...teachers, ...directors, ...secretaries, ...parents];
      return res.json(users);
    } catch (error) {
      return res.status(500).json({
        error: 'Error finding users',
        message: error,
      });
    }
  }

  async login(req: Request, res: Response) {
    const {email, password} = req.body;

    try {
      const user = await StudentModel.findOne({ email }).select('+password')
        || await TeacherModel.findOne({ email }).select('+password')
        || await DirectorModel.findOne({ email }).select('+password')
        || await SecretaryModel.findOne({ email }).select('+password')
        || await ParentModel.findOne({ email }).select('+password');

      //Error Handling Section

      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" })
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" })
      }


      const token = jwt.sign({name: user.name, profession: user.profession,}, 'secret')
      return res.json({ token })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error: "Error when trying to login",
        message: error,
      })
    }
  }


  async create(req: Request, res: Response) {
    const { firstname, lastname, email, password, profession, teacher_Id, disciplines, classes, children } = req.body;
    try {
      const emailExists = await StudentModel.findOne({ email })
        || await TeacherModel.findOne({ email })
        || await DirectorModel.findOne({ email })
        || await SecretaryModel.findOne({ email })
        || await ParentModel.findOne({ email });

      if (emailExists) {
        return res.status(400).json({
          error: 'User already exists',
          message: 'A user with this email already exists',
        });
      }

      if (!profession) {
        return res.status(400).json({
          error: 'Missing Profession',
          message: 'The profession field is required',
        })
      }

      let userData = {
        firstname,
        lastname,
        email,
        password,
      };

      switch (profession) {
        case 'student':
          userData = {
            ...userData,
            classes,
            parent: children,
          };
          await StudentModel.create(userData);
          break;
        case 'teacher':
          userData = {
            ...userData,
            teacher_Id,
            disciplines,
          };
          await TeacherModel.create(userData);
          break;
        case 'director':
          await DirectorModel.create(userData);
          break;
        case 'secretary':
          await SecretaryModel.create(userData);
          break;
        case 'parent':
          userData = {
            ...userData,
            children,
          };
          await ParentModel.create(userData);
          break;
        default:
          return res.status(400).json({
            error: 'Invalid Profession',
            message: 'The profession field is invalid',
          });
      }

      return res.json({ message: 'User created successfully' });
    } catch (error) {
      if (error.name == 'ValidationError') {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({
          error: 'Validation Error',
          message: errors.join(', '),
        })
      }
      return res.status(500).json({
        error: 'Error creating user',
        message: error,
      });
    }
  }
}

export default new UserController();
