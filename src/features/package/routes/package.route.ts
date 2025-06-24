import express from 'express'
import { packageController } from '../controllers/package.controller'
import { verifyUser } from '@/globals/middlewares/verifyUser.middleware'
import { allowAccess } from '@/globals/middlewares/allowAccess.middleware'
import asyncWrapper from '@/globals/cores/asyncWrapper'

const packageRoute = express.Router()

packageRoute.post('/', verifyUser, allowAccess('FAILED'), asyncWrapper(packageController.create))
packageRoute.get('/', verifyUser, allowAccess('ADMIN', 'RECRUITER'), asyncWrapper(packageController.readAll))
packageRoute.get('/admin', verifyUser, allowAccess('ADMIN'), asyncWrapper(packageController.readAllAdmin))
packageRoute.get('/:id', verifyUser, allowAccess('ADMIN', 'RECRUITER'), asyncWrapper(packageController.readOne))
packageRoute.get('/:id/admin', verifyUser, allowAccess('ADMIN'), asyncWrapper(packageController.readOneAdmin))
packageRoute.patch('/:id', verifyUser, allowAccess('ADMIN'), asyncWrapper(packageController.update))
packageRoute.patch('/:id/active', verifyUser, allowAccess('ADMIN'), asyncWrapper(packageController.updateActive))

export default packageRoute
