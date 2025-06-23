import asyncWrapper from '@/globals/cores/asyncWrapper'
import { allowAccess } from '@/globals/middlewares/allowAccess.middleware'
import { verifyUser } from '@/globals/middlewares/verifyUser.middleware'
import express from 'express'
import { companyController } from '../controllers/company.controller'
import { validateSchema } from '@/globals/middlewares/validateSchema.middleware'
import { companyApprovedSchema, companyCreateSchema, companyUpdateSchema } from '../schemas/company.schema'

const companyRoute = express.Router()

companyRoute.post(
  '/',
  verifyUser,
  validateSchema(companyCreateSchema),
  allowAccess('RECRUITER'),
  asyncWrapper(companyController.create)
)

companyRoute.post(
  '/',
  verifyUser,
  validateSchema(companyCreateSchema),
  allowAccess('ADMIN'),
  asyncWrapper(companyController.findAllForAdmin)
)

companyRoute.get('/', asyncWrapper(companyController.getAll))
companyRoute.get('/me', verifyUser, allowAccess('RECRUITER'), asyncWrapper(companyController.getMyCompanies))
companyRoute.get('/:id', asyncWrapper(companyController.getCompanyById))
companyRoute.patch(
  '/:id',
  verifyUser,
  validateSchema(companyUpdateSchema),
  allowAccess('RECRUITER'),
  asyncWrapper(companyController.update)
)
companyRoute.get(
  '/:id/admin',
  verifyUser,
  validateSchema(companyUpdateSchema),
  allowAccess('ADMIN'),
  asyncWrapper(companyController.getOneAdmin)
)

companyRoute.patch(
  '/approved/:id',
  verifyUser,
  allowAccess('RECRUITER'),
  validateSchema(companyApprovedSchema),
  asyncWrapper(companyController.approved)
)
companyRoute.delete('/:id', verifyUser, allowAccess('RECRUITER'), asyncWrapper(companyController.remove))

export default companyRoute
