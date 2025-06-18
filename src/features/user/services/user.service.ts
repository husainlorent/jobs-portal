import prisma from '@/prisma'
import { User } from '@prisma/client'

class UserService {
  public async createUser(requestBody: User): Promise<User> {
    const { name, email, password, role } = requestBody

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        status: true,
        role
      }
    })

    return user
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany()
    return users
  }
}

export const userService: UserService = new UserService()
