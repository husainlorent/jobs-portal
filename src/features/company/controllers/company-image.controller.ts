import { NextFunction, Request, Response } from 'express'
import { companyImageService } from '../services/company-image.service'
import HTTP_STATUS from '@/globals/constants/http.constant'

class CompanyImageController {
  public async create(req: Request, res: Response, next: NextFunction) {
    await companyImageService.create(
      parseInt(req.params.companyId),
      req.currentUser,
      req.files as Express.Multer.File[]
    )

    res.status(HTTP_STATUS.CREATED).json({
      message: 'Add image to company successfully'
    })
  }

  public async readAll(req: Request, res: Response) {
    const companyImages = await companyImageService.readAll(parseInt(req.params.companyId))

    res.status(HTTP_STATUS.OK).json({
      message: 'Get all company images',
      data: companyImages
    })
  }

  public async remove(req: Request, res: Response) {
    await companyImageService.remove(
      parseInt(req.params.companyId),
      req.currentUser,
      parseInt(req.params.companyImageId)
    )

    return res.status(HTTP_STATUS.OK).json({
      message: 'Delete company image successfully'
    })
  }
}

export const copmanyImageController: CompanyImageController = new CompanyImageController()
