import { JobRole } from '@prisma/client'
import prisma from '@/prisma'
import { getPaginationAndFilters } from '@/globals/helpers/pagination-filter.helpers'
import { NotFoundException } from '@/globals/cores/error.core'

class JobRoleService {
  public async create(name: string): Promise<JobRole> {
    const jobRole = await prisma.jobRole.create({
      data: { name }
    })

    return jobRole
  }

  public async readAll({ page, limit, filter }: any) {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['name'],
      entity: 'jobRole'
    })

    return { jobRoles: data, totalCounts }
  }

  public async findOne(name: string): Promise<JobRole> {
    const jobRole = await prisma.jobRole.findUnique({
      where: { name }
    })

    if (!jobRole) throw new NotFoundException(`Job Role: ${name} does not exist`)

    return jobRole
  }

  public async remove(name: string): Promise<void> {
    await this.findOne(name)

    await prisma.jobRole.delete({
      where: { name }
    })
  }
}

export const jobRoleService: JobRoleService = new JobRoleService()
