import { NextFunction, Request, Response } from 'express'
import { userService } from '../services/user.service'

class UserController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.createUser(req.body)
      return res.status(201).json({
        message: 'Create user successfully',

        data: user
      })
    } catch (error) {
      next(error)
    }
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getAllUsers()
    res.status(200).json({
      message: 'Get all users successfully',
      data: users
    })
  }
}

export const userController: UserController = new UserController()
