import { BadRequestException, NotFoundException } from '@/globals/cores/error.core'
import { generateToken } from '@/globals/helpers/jwt.helper'
import prisma from '@/prisma'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'

class AuthService {
  public async signUp(requestBody: any) {
    const { email, name, password } = requestBody

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) throw new BadRequestException('Email already exists')

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    const accessToken = generateToken(user)
    return accessToken
  }

  public async signIn(requestBody: any) {
    const { email, password } = requestBody

    const userByEmail = await this.findUserByEmail(email)
    if (!userByEmail) throw new NotFoundException(`The email: ${email} does not exist`)

    const isMatchPassword = await bcrypt.compare(password, userByEmail.password)
    if (!isMatchPassword) throw new BadRequestException('Invalid credentials')

    const accessToken = generateToken(userByEmail)
    return accessToken
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { email }
    })
  }
}

export const authService: AuthService = new AuthService()
