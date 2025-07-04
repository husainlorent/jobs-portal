import { Request, Response } from 'express'
import HTTP_STATUS from '@/globals/constants/http.constant'
import { packageService } from '../services/package.service'

class PackageController {
  public async create(req: Request, res: Response) {
    const packageEntity = await packageService.create(req.body)

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create package successfully',
      data: packageEntity
    })
  }

  public async readAll(req: Request, res: Response) {
    const packages = await packageService.readAll({ where: { isActive: true } })

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all packages',
      data: packages
    })
  }

  public async readAllAdmin(req: Request, res: Response) {
    const packages = await packageService.readAll({})

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all packages',
      data: packages
    })
  }

  public async readOne(req: Request, res: Response) {
    const packageEntity = await packageService.readOne(parseInt(req.params.id), { isActive: true })

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get one package',
      data: packageEntity
    })
  }

  public async readOneAdmin(req: Request, res: Response) {
    const packageEntity = await packageService.readOne(parseInt(req.params.id))

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get one package',
      data: packageEntity
    })
  }

  public async update(req: Request, res: Response) {
    const packageEntity = await packageService.update(parseInt(req.params.id), req.body)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update package successfully',
      data: packageEntity
    })
  }

  public async updateActive(req: Request, res: Response) {
    const packageEntity = await packageService.updateActive(parseInt(req.params.id), req.body.isActive)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update package active successfully',
      data: packageEntity
    })
  }
}

export const packageController: PackageController = new PackageController()
