import { companyService } from '@/features/company/services/company.service'
import { Job, JobStatus } from '@prisma/client'
import { IJob } from '../interfaces/job.interface'
import { jobRoleService } from './job-role.service'
import prisma from '@/prisma'
import { BadRequestException, NotFoundException } from '@/globals/cores/error.core'
import { getPaginationAndFilters } from '@/globals/helpers/pagination-filter.helpers'
import { serializeData } from '@/globals/helpers/serialize.helper'
import { excludeFields } from '@/globals/helpers/excludeFields.helper'
import { packageService } from '@/features/package/services/package.service'

class JobService {
  public async create(requestBody: IJob, currentUser: UserPayload): Promise<Job> {
    const { companyId, title, description, minSalary, maxSalary, jobRoleName } = requestBody

    await companyService.findOne(companyId, currentUser.id)
    await jobRoleService.findOne(jobRoleName)

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      include: { recruiterPackages: true }
    })

    if (!user) throw new NotFoundException('user does not exist')

    const activePackage = user.recruiterPackages.find((pgk) => new Date(Date.now()) < new Date(pgk.endDate))

    if (!activePackage) throw new BadRequestException('You must buy the package')

    const jobsCount = await prisma.job.count({
      where: {
        postById: currentUser.id,
        createdAt: { gt: new Date(activePackage.startDate) },
        isDeleted: false
      }
    })

    const packageEntity = await packageService.readOne(activePackage.packageId, { isActive: true })

    if (jobsCount >= packageEntity.jobPostLimit) {
      throw new BadRequestException('You already reach the limit of current package')
    }

    const job = await prisma.job.create({
      data: {
        companyId,
        jobRoleName,
        title,
        description,
        minSalary,
        maxSalary,
        postById: currentUser.id
      }
    })

    const jobData = await this.readOne(job.id)

    return job
  }

  public async readAll({ page, limit, filter, minSalary, maxSalary }: any) {
    const additionalCondition: any = {
      isDeleted: false
    }

    if (minSalary) additionalCondition.minSalary = { gte: Number(minSalary) }
    if (maxSalary) additionalCondition.maxSalary = { lte: Number(maxSalary) }

    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['title', 'description'],
      entity: 'job',
      additionalCondition,
      orderCondition: { createdAt: 'desc' }
    })

    return { jobs: data, totalCounts }
  }

  public async readAllForRecruiter({ page, limit, filter, minSalary }: any, currentUser: UserPayload) {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['title', 'description'],
      entity: 'job',
      additionalCondition: { minSalary: { gte: minSalary }, postById: currentUser.id },
      orderCondition: { createdAt: 'desc' }
    })

    return { jobs: data, totalCounts }
  }

  public async readOne(id: number): Promise<Job> {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        company: true,
        postBy: true
      }
    })

    if (!job) throw new NotFoundException(`Cannot find job: ${id}`)

    const dataConfig = {
      company: [
        { newKey: 'companyName', property: 'name' },
        { newKey: 'companyWebsiteUrl', property: 'websiteUrl' }
      ],
      postBy: [{ newKey: 'postByName', property: 'name' }]
    }

    const data = serializeData(job, dataConfig)

    return excludeFields(data, ['companyId', 'postById'])
  }

  public async update(id: number, companyId: number, requestBody: IJob, currentUser: UserPayload): Promise<Job> {
    const { title, description, minSalary, maxSalary } = requestBody

    await this.findOne(id, companyId, currentUser.id)

    const job = await prisma.job.update({
      where: { id, companyId, postById: currentUser.id },
      data: { title, description, minSalary, maxSalary }
    })

    return job
  }

  public async updateStatus(id: number, companyId: number, status: JobStatus, currentUser: UserPayload): Promise<Job> {
    await this.findOne(id, companyId, currentUser.id)

    const job = await prisma.job.update({
      where: { id, companyId, postById: currentUser.id },
      data: { status }
    })

    return job
  }

  public async remove(id: number, companyId: number, currentUser: UserPayload): Promise<void> {
    await this.findOne(id, companyId, currentUser.id)

    const job = await prisma.job.update({
      where: { id, companyId, postById: currentUser.id },
      data: { isDeleted: true }
    })
  }

  private async findOne(id: number, companyId: number, userId: number): Promise<Job> {
    const job = await prisma.job.findFirst({
      where: { id, companyId, postById: userId }
    })

    if (!job) throw new NotFoundException(`Cannot find company: ${companyId} belong to user: ${userId}`)

    return job
  }

  public async findOneActive(jobId: number) {
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        status: 'ACTIVE'
      }
    })

    if (!job) throw new NotFoundException('This job is no longer active')

    return job
  }

  public async findJobByUser(id: number, userId: number): Promise<Job> {
    const job = await prisma.job.findFirst({
      where: { id, postById: userId }
    })

    if (!job) throw new NotFoundException(`Cannot find job`)

    return job
  }
}

export const jobService: JobService = new JobService()
