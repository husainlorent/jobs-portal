import express from 'express'
import { allowAccess } from '@/globals/middlewares/allowAccess.middleware'
import { verifyUser } from '@/globals/middlewares/verifyUser.middleware'
import { jobBenefitController } from '../controllers/job-benefit.controller'
import asyncWrapper from '@/globals/cores/asyncWrapper'

const jobBenefitRoute = express.Router()

jobBenefitRoute.post('/', verifyUser, allowAccess('RECRUITER'), asyncWrapper(jobBenefitController.create))
jobBenefitRoute.get('/:jobId', asyncWrapper(jobBenefitController.read))
jobBenefitRoute.delete(
  '/:jobId/:benefitName',
  verifyUser,
  allowAccess('RECRUITER'),
  asyncWrapper(jobBenefitController.remove)
)

export default jobBenefitRoute
