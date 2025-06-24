import asyncWrapper from '@/globals/cores/asyncWrapper'
import { allowAccess } from '@/globals/middlewares/allowAccess.middleware'
import { verifyUser } from '@/globals/middlewares/verifyUser.middleware'
import express from 'express'
import { jobRoleController } from '../controllers/job-role.controller'

const jobRoleRoute = express.Router()

jobRoleRoute.post('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(jobRoleController.create))
jobRoleRoute.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(jobRoleController.readAll))
jobRoleRoute.delete('/:name', verifyUser, allowAccess('ADMIN'), asyncWrapper(jobRoleController.remove))

export default jobRoleRoute
