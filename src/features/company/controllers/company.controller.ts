import { NextFunction, Request, Response } from 'express'
import { companyService } from '../services/company.service'
import HTTP_STATUS from '@/globals/constants/http.constant'

class CompanyController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const company = await companyService.create(req.body, req.currentUser)
      res.status(HTTP_STATUS.CREATED).json({
        message: 'Create company successfully',
        data: company
      })
    } catch (error) {
      next(error)
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10, filter = '' } = req.query
      const { companies, totalCounts } = await companyService.findAllWithPagination({
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        filter
      })
      res.status(HTTP_STATUS.OK).json({
        message: 'All companies',

        pagination: {
          totalCounts,
          currentPage: parseInt(page as string)
        },
        data: companies
      })
    } catch (error) {
      next(error)
    }
  }

  public async getMyCompanies(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10, filter = '' } = req.query
      const { companies, totalCounts } = await companyService.findMyCompanies(
        {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          filter
        },
        req.currentUser
      )
      res.status(HTTP_STATUS.OK).json({
        message: 'My companies',
        pagination: {
          totalCounts,
          currentPage: parseInt(page as string)
        },
        data: companies
      })
    } catch (error) {
      next(error)
    }
  }

  public async findAllForAdmin(req: Request, res: Response) {
    const { page = 1, limit = 5, filter = '' } = req.query

    const { companies, totalCounts } = await companyService.findAllPaginationForAdmin({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      filter
    })

    res.status(HTTP_STATUS.OK).json({
      message: 'Get all companies',
      pagination: {
        totalCounts,
        currentPage: parseInt(page as string)
      },
      data: companies
    })
  }

  public async getOneAdmin(req: Request, res: Response) {
    const company = await companyService.readOneAdmin(parseInt(req.params.id))

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get single company',
      data: company
    })
  }

  public async getCompanyById(req: Request, res: Response, next: NextFunction) {
    try {
      const companies = await companyService.findById(parseInt(req.params.id))
      res.status(HTTP_STATUS.OK).json({
        message: 'Company',
        data: companies
      })
    } catch (error) {
      next(error)
    }
  }

  public async update(req: Request, res: Response) {
    const company = await companyService.update(parseInt(req.params.id), req.body, req.currentUser)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update company successfully',
      data: company
    })
  }

  public async approved(req: Request, res: Response) {
    const company = await companyService.approved(parseInt(req.params.id), req.body.isApproved)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Change approved successfully',
      data: company
    })
  }

  public async remove(req: Request, res: Response) {
    await companyService.remove(parseInt(req.params.id), req.currentUser)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Delete company successfully'
    })
  }
}

export const companyController: CompanyController = new CompanyController()
