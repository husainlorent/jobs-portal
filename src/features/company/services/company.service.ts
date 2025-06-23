import { Company, Prisma } from '@prisma/client'
import { ICompany } from '../interfaces/company.interface'
import prisma from '@/prisma'
import { NotFoundException } from '@/globals/cores/error.core'
import { getPaginationAndFilters } from '@/globals/helpers/pagination-filter.helpers'

class CompanyService {
  public async create(requestBody: ICompany, currentUser: UserPayload): Promise<Company> {
    const { name, description, teamSize, establishmentDate, websiteUrl, mapLink, address } = requestBody

    const company = await prisma.company.create({
      data: {
        name,
        description,
        teamSize,
        establishmentDate: new Date(establishmentDate),
        websiteUrl,
        mapLink,
        address,
        userId: currentUser.id
      }
    })
    return company
  }

  public async findAllWithPagination({ page, limit, filter }: any) {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['name', 'description'],
      entity: 'company',
      additionalCondition: { isApproved: true }
    })

    return { companies: data, totalCounts }
  }

  public async findAllPaginationForAdmin({ page, limit, filter }: any) {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['name', 'description'],
      entity: 'company'
    })

    return { companies: data, totalCounts }
  }

  public async findAll(): Promise<Company[]> {
    const companies = await prisma.company.findMany()
    return companies
  }

  public async findMyCompanies({ page, limit, filter }: any, currentUser: UserPayload) {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['name', 'description'],
      entity: 'company',
      additionalCondition: currentUser.id
    })

    return { companies: data, totalCounts }
    // return prisma.company.findMany({
    //   where: { userId: currentUser.id }
    // })
  }

  public async findById(id: number): Promise<Company> {
    const company = await prisma.company.findUnique({
      where: { id, isApproved: true }
    })
    if (!company) throw new NotFoundException(`connot find company with id: ${id}`)

    return company
  }

  public async readOneAdmin(id: number): Promise<Company> {
    // 1) Get company from redis

    const company = await prisma.company.findUnique({
      where: { id }
    })

    if (!company) throw new NotFoundException(`Cannot find company with id: ${id}`)

    return company
  }

  public async findOne(companyId: number, userId: number): Promise<Company> {
    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
        userId
      }
    })

    if (!company) throw new NotFoundException(`Cannot find company ${companyId} of user ${userId}`)

    return company
  }

  public async findOneAdmin(id: number): Promise<Company> {
    // 1) Get company from redi

    const company = await prisma.company.findUnique({
      where: { id }
    })

    if (!company) throw new NotFoundException(`Cannot find company with id: ${id}`)

    return company
  }

  public async update(id: number, requestBody: ICompany, currentUser: UserPayload) {
    const { name, description, teamSize, establishmentDate, websiteUrl, mapLink, address } = requestBody

    await this.findOne(id, currentUser.id)

    const company = await prisma.company.update({
      where: { id, userId: currentUser.id },
      data: {
        name,
        description,
        teamSize,
        establishmentDate: establishmentDate ? new Date(establishmentDate) : undefined,
        websiteUrl,
        mapLink,
        address
      }
    })

    return company
  }

  public async approved(id: number, isApproved: boolean) {
    await this.findOneAdmin(id)

    const company = await prisma.company.update({
      where: { id },
      data: { isApproved }
    })

    return company
  }

  public async remove(id: number, currentUser: UserPayload): Promise<void> {
    await this.findOneAdmin(id)

    await prisma.company.delete({
      where: {
        id,
        userId: currentUser.id
      }
    })
  }
}

export const companyService: CompanyService = new CompanyService()
