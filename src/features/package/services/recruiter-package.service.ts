import { BadRequestException, NotFoundException } from '@/globals/cores/error.core'
import prisma from '@/prisma'
import { packageService } from './package.service'
import { orderService } from '@/features/order/services/order.service'

class RecruiterPackageService {
  public async create(packageId: number, currentUser: UserPayload) {
    const startDate = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 1)

    const existPackage = await this.findOne(currentUser.id).catch(() => null)

    await packageService.readOne(packageId, { isActive: true })

    if (existPackage && existPackage.endDate > new Date()) {
      throw new BadRequestException('You cannot buy this package')
    }

    const recruiterPackage = await prisma.recruiterPackage.create({
      data: {
        packageId,
        recruiterId: currentUser.id,
        startDate,
        endDate
      }
    })

    await orderService.create(packageId, currentUser)

    return recruiterPackage
  }

  public async findOne(recruiterId: number) {
    const recruiterPackage = await prisma.recruiterPackage.findFirst({
      where: {
        recruiterId
      }
    })
    if (!recruiterPackage) throw new NotFoundException('Cannot find recruiter package of current user')

    return recruiterPackage
  }
}

export const recruiterPackageService: RecruiterPackageService = new RecruiterPackageService()
