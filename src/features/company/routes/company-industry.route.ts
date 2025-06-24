import express from 'express'

import { companyIndustryController } from '../controllers/company-industry.controller'
import { verifyUser } from '@/globals/middlewares/verifyUser.middleware'
import { allowAccess } from '@/globals/middlewares/allowAccess.middleware'
import asyncWrapper from '@/globals/cores/asyncWrapper'

const companyIndustryRoute = express.Router()

companyIndustryRoute.post(
  '/:companyId',
  verifyUser,
  allowAccess('RECRUITER'),
  asyncWrapper(companyIndustryController.add)
)

companyIndustryRoute.get('/:companyId', asyncWrapper(companyIndustryController.read))

companyIndustryRoute.delete(
  '/:companyId',
  verifyUser,
  allowAccess('RECRUITER'),
  asyncWrapper(companyIndustryController.remove)
)
export default companyIndustryRoute
