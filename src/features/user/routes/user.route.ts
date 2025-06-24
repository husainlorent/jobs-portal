import express from 'express'
import { userController } from '../controllers/user.controller'
import { validateSchema } from '@/globals/middlewares/validateSchema.middleware'
import {
  userCreateSchema,
  userUpdateNameSchema,
  userUpdatePasswordSchema,
  userUpdateStatusSchema
} from '../schemas/user.schema'
import { verifyUser } from '@/globals/middlewares/verifyUser.middleware'
import { allowAccess } from '@/globals/middlewares/allowAccess.middleware'
import asyncWrapper from '@/globals/cores/asyncWrapper'

const userRoute = express.Router()

userRoute.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(userController.getAll))
userRoute.get('/:id', verifyUser, allowAccess('ADMIN'), asyncWrapper(userController.getOne))
userRoute.post(
  '/',
  verifyUser,
  allowAccess('ADMIN'),
  validateSchema(userCreateSchema),
  asyncWrapper(userController.create)
)

userRoute.patch('/:id', verifyUser, validateSchema(userUpdateNameSchema), asyncWrapper(userController.update))
userRoute.patch(
  '/:id/password',
  verifyUser,
  validateSchema(userUpdatePasswordSchema),
  asyncWrapper(userController.updatePassword)
)
userRoute.patch(
  '/:id/status',
  verifyUser,
  validateSchema(userUpdateStatusSchema),
  allowAccess('ADMIN'),
  asyncWrapper(userController.updateStatus)
)

export default userRoute
