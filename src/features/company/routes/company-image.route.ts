import asyncWrapper from '@/globals/cores/asyncWrapper'
import { uploadCompanyImage } from '@/globals/helpers/upload.helper'
import { allowAccess } from '@/globals/middlewares/allowAccess.middleware'
import { verifyUser } from '@/globals/middlewares/verifyUser.middleware'
import express from 'express'
import { copmanyImageController } from '../controllers/company-image.controller'

const companyImageRoute = express.Router()

companyImageRoute.post(
  '/:companyId',
  verifyUser,
  allowAccess('RECRUITER'),
  uploadCompanyImage.array('images'),
  asyncWrapper(copmanyImageController.create)
)

companyImageRoute.get('/:companyId', asyncWrapper(copmanyImageController.readAll))
companyImageRoute.delete(
  '/:companyId/:companyImageId',
  verifyUser,
  allowAccess('RECRUITER'),
  asyncWrapper(copmanyImageController.remove)
)

export default companyImageRoute
