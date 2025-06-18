import { NextFunction, Request, Response } from 'express'
import { candidateProfileService } from '../services/candidate-profile.service'
import HTTP_STATUS from '@/globals/constants/http.constant'

class CandidateProfileController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const candidateProfile = await candidateProfileService.create(req.body, req.currentUser)
      return res.status(HTTP_STATUS.CREATED).json({
        message: 'Create candidate profile successfully',
        data: candidateProfile
      })
    } catch (error) {
      next(error)
    }
  }

  public async readAll(req: Request, res: Response, next: NextFunction) {
    const candidates = await candidateProfileService.readAll()
    return res.status(HTTP_STATUS.OK).json({
      message: 'get all candidate profiles successfully',
      data: candidates
    })
  }
  public async readOne(req: Request, res: Response, next: NextFunction) {
    const candidate = await candidateProfileService.readOne(parseInt(req.params.id))

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get one candidate profile successfully',
      data: candidate
    })
  }

  public async update(req: Request, res: Response) {
    const candidate = await candidateProfileService.update(parseInt(req.params.id), req.body)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update candidate profile successfully',
      data: candidate
    })
  }

  public async remove(req: Request, res: Response) {
    await candidateProfileService.remove(parseInt(req.params.id))

    return res.status(HTTP_STATUS.OK).json({
      message: 'Delete candidate profile successfully'
    })
  }

  public async toggleOpenToWork(req: Request, res: Response) {
    await candidateProfileService.toggleOpenToWork(parseInt(req.params.id), req.body.openToWork)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Edit open to work successfully'
    })
  }
}

export const candidateProfileController = new CandidateProfileController()
