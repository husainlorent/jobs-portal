import express from 'express'
import { allowAccess } from '@/globals/middlewares/allowAccess.middleware'
import { verifyUser } from '@/globals/middlewares/verifyUser.middleware'
import { applyController } from '../controllers/apply.controller'
import asyncWrapper from '@/globals/cores/asyncWrapper'

const applyRoute = express.Router()

applyRoute.post('/', verifyUser, allowAccess('CANDIDATE'), asyncWrapper(applyController.create))
applyRoute.get('/', verifyUser, allowAccess('CANDIDATE'), asyncWrapper(applyController.readMe))
applyRoute.get('/:jobId', verifyUser, allowAccess('RECRUITER'), asyncWrapper(applyController.readMeRecruiter))
applyRoute.patch('/', verifyUser, allowAccess('RECRUITER'), asyncWrapper(applyController.updateStatus))

export default applyRoute
