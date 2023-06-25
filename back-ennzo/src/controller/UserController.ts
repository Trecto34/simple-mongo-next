import { Request, Response } from 'express';
import User from '../db/schemas/User';

class UserController {
  async find(req: Request, res: Response) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({
        error: 'Error finding users',
        message: error,
      });
    }
  }

  async create(req: Request, res: Response) {
    const { name, email, password, profession, teacher_Id, disciplines } = req.body;
    try {
      const userExists = await User.findOne({ email }) 

      if (userExists) {
        return res.status(400).json({
          error: 'User already exists',
          message: 'A user with this email already exists',
        });
      }

      const userData = {
        name,
        email,
        password,
        profession,
        teacher_Id,
        disciplines,
      };

      const user = await User.create(userData);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({
        error: 'Error creating user',
        message: error,
      });
    }
  }
}

export default new UserController();
