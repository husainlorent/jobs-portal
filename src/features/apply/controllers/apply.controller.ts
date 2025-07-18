import { Request, Response } from 'express'

import HTTP_STATUS from '@/globals/constants/http.constant'
import { applyService } from '../services/apply.service'

class ApplyController {
  public async create(req: Request, res: Response) {
    const apply = await applyService.create(req.body.jobId, req.currentUser)

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Apply job successfully',
      data: apply
    })
  }

  public async readMe(req: Request, res: Response) {
    const { page = 1, limit = 5 } = req.query

    const { applies, totalCounts } = await applyService.readMe(
      { page: parseInt(page as string), limit: parseInt(limit as string) },
      req.currentUser
    )

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get my applications',
      pagination: {
        totalCounts,
        currentPage: parseInt(page as string)
      },
      data: applies
    })
  }

  public async readMeRecruiter(req: Request, res: Response) {
    const { page = 1, limit = 5 } = req.query

    const { applies, totalCounts } = await applyService.readMeRecruiter(
      { page: parseInt(page as string), limit: parseInt(limit as string) },
      parseInt(req.params.jobId),
      req.currentUser
    )

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get my applications',
      pagination: {
        totalCounts,
        currentPage: parseInt(page as string)
      },
      data: applies
    })
  }

  public async updateStatus(req: Request, res: Response) {
    const apply = await applyService.updateStatus(req.body, req.currentUser)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update status successfully',
      data: apply
    })
  }
}

export const applyController: ApplyController = new ApplyController()
