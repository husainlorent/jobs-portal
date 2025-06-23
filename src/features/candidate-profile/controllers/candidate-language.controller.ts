import { NextFunction, Request, Response } from 'express'
import { candidateLanguageService } from '../services/candidate-language.service'
import HTTP_STATUS from '@/globals/constants/http.constant'

class CandidateLanguageController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const candidateLanguage = await candidateLanguageService.create(req.body, req.currentUser)

      return res.status(HTTP_STATUS.CREATED).json({
        message: 'Create candidate language successfully',
        data: candidateLanguage
      })
    } catch (error) {
      next(error)
    }
  }

  public async readAll(req: Request, res: Response) {
    const candidateLanguages = await candidateLanguageService.readAll()
    return res.status(HTTP_STATUS.OK).json({
      message: 'All candidate languages',
      data: candidateLanguages
    })
  }

  public async readMyLanguages(req: Request, res: Response) {
    const candidateLanguages = await candidateLanguageService.readMyLanguages(req.currentUser)
    return res.status(HTTP_STATUS.OK).json({
      message: 'candidate languages',
      data: candidateLanguages
    })
  }

  public async updateLevel(req: Request, res: Response) {
    const candidateLanguage = await candidateLanguageService.updateLevel(
      req.currentUser,
      req.params.languageName,
      req.body.level
    )
    return res.status(HTTP_STATUS.OK).json({
      message: 'Update candidate language',
      data: candidateLanguage
    })
  }

  public async remove(req: Request, res: Response) {
    const candidateLanguage = await candidateLanguageService.remove(req.currentUser, req.params.languageName)
    return res.status(HTTP_STATUS.OK).json({
      message: 'Removed candidate language'
    })
  }
}

export const candidateLanguageController: CandidateLanguageController = new CandidateLanguageController()
