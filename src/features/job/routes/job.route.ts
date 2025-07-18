import asyncWrapper from '@/globals/cores/asyncWrapper'
import { allowAccess } from '@/globals/middlewares/allowAccess.middleware'
import { validateSchema } from '@/globals/middlewares/validateSchema.middleware'
import { verifyUser, verifyUserOrNot } from '@/globals/middlewares/verifyUser.middleware'
import express from 'express'
import { jobCreateSchema, jobUpdateSchema } from '../schemas/job.schema'
import { jobController } from '../controllers/job.controller'

const jobRoute = express.Router()

jobRoute.post(
  '/',
  verifyUser,
  allowAccess('RECRUITER'),
  validateSchema(jobCreateSchema),
  asyncWrapper(jobController.create)
)
jobRoute.get('/', asyncWrapper(jobController.readAll))
jobRoute.get('/me', verifyUser, allowAccess('RECRUITER'), asyncWrapper(jobController.readAllForRecruiter))

// const incrementViewMiddleware = incrementView(
//   (id) => `${RedisKey.JOBS_KEY}:${id}`,
//   (id) => `job_views:${id}`,
//   (redisViewKey, userId) => jobRedis.checkUserInSet(redisViewKey, userId),
//   (redisKey) => jobRedis.incrementJobView(redisKey),
//   (redisViewKey, userId) => jobRedis.addUserToSet(redisViewKey, userId)
// )

jobRoute.get('/:id', verifyUserOrNot, asyncWrapper(jobController.readOne))

jobRoute.patch(
  '/:id/:companyId/status',
  verifyUser,
  allowAccess('RECRUITER'),
  validateSchema(jobUpdateSchema),
  asyncWrapper(jobController.updateStatus)
)
jobRoute.patch(
  '/:id/:companyId',
  verifyUser,
  allowAccess('RECRUITER'),
  validateSchema(jobUpdateSchema),
  asyncWrapper(jobController.update)
)
jobRoute.delete('/:id/:companyId', verifyUser, allowAccess('RECRUITER'), asyncWrapper(jobController.remove))

export default jobRoute
