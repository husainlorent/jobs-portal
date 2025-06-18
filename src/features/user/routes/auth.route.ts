import express from 'express'
import { authController } from '../controllers/auth.controller'
import asyncWrapper from '@/globals/cores/asyncWrapper'
import { verifyUser } from '@/globals/middlewares/verifyUser.middleware'

const authRoute = express.Router()

authRoute.post('/signup', asyncWrapper(authController.signUp))
authRoute.post('/signin', asyncWrapper(authController.signIn))
authRoute.get('/me', verifyUser, asyncWrapper(authController.getCurrentUser))
authRoute.post('/logout', asyncWrapper(verifyUser), asyncWrapper(authController.logout))

export default authRoute
