import express from 'express'
import { allowAccess } from '@/globals/middlewares/allowAccess.middleware'
import { verifyUser } from '@/globals/middlewares/verifyUser.middleware'
import { jobSkillController } from '../controllers/job-skill.controller'
import asyncWrapper from '@/globals/cores/asyncWrapper'

const jobSkillRoute = express.Router()

jobSkillRoute.post('/', verifyUser, allowAccess('RECRUITER'), asyncWrapper(jobSkillController.create))
jobSkillRoute.get('/:jobId', asyncWrapper(jobSkillController.read))
jobSkillRoute.delete(
  '/:jobId/:skillName',
  verifyUser,
  allowAccess('RECRUITER'),
  asyncWrapper(jobSkillController.remove)
)

export default jobSkillRoute
