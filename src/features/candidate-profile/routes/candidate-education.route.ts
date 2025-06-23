import express from 'express'
import { candidateEdcationController } from '../controllers/candidate-education.controller'
import { verifyUser } from '@/globals/middlewares/verifyUser.middleware'
import { allowAccess } from '@/globals/middlewares/allowAccess.middleware'
import asyncWrapper from '@/globals/cores/asyncWrapper'
import { validateSchema } from '@/globals/middlewares/validateSchema.middleware'
import { candidateEducationCreateSchema, candidateEducationUpdateSchema } from '../schemas/candidate-education.schema'

const candidateEducationRoute = express.Router()

candidateEducationRoute.post(
  '/',
  verifyUser,
  validateSchema(candidateEducationCreateSchema),
  asyncWrapper(candidateEdcationController.create)
)
candidateEducationRoute.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(candidateEdcationController.readAll))
candidateEducationRoute.get('/me', verifyUser, asyncWrapper(candidateEdcationController.readAll))
candidateEducationRoute.patch(
  '/:educationId',
  verifyUser,
  validateSchema(candidateEducationUpdateSchema),
  asyncWrapper(candidateEdcationController.update)
)
candidateEducationRoute.delete('/:educationId', verifyUser, asyncWrapper(candidateEdcationController.remove))

export default candidateEducationRoute
