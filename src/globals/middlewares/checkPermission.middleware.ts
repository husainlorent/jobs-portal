import prisma from '@/prisma'
import { NextFunction, Request, Response } from 'express'
import { ForbiddenException, NotFoundException } from '../cores/error.core'

export function checkPermission(model: keyof typeof prisma, foreignField: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.currentUser.id
    const userRole = req.currentUser.role
    const entityId = parseInt(req.params.id)

    try {
      const entity = await (prisma[model] as any).findUnique({
        where: { id: entityId }
      })
      if (!entity) {
        return next(new NotFoundException(`${String(model)} with id ${entityId} not found`))
      }

      if (userRole === 'ADMIN' || userRole === 'RECRUITER' || userId === entity[foreignField]) {
        return next()
      }

      return next(new ForbiddenException(`You don't have permission to access`))
    } catch (error) {
      next(error)
    }
  }
}
