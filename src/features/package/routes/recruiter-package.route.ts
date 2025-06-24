import express from 'express'
import { recruiterPackageController } from '../controllers/recruiter-package.controller'
import { verifyUser } from '@/globals/middlewares/verifyUser.middleware'
import { allowAccess } from '@/globals/middlewares/allowAccess.middleware'
import asyncWrapper from '@/globals/cores/asyncWrapper'

const recruiterPackageRoute = express.Router()

recruiterPackageRoute.post('/', verifyUser, allowAccess('RECRUITER'), asyncWrapper(recruiterPackageController.create))

export default recruiterPackageRoute
