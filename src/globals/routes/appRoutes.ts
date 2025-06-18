import { Application } from 'express'
import userRoute from '@/features/user/routes/user.route'
import authRoute from '@/features/user/routes/auth.route'
import candidateProfileRoute from '@/features/candidate-profile/routes/candidate-profile.routes'

function appRoutes(app: Application) {
  app.use('/api/v1/users', userRoute)
  app.use('/api/v1/auth', authRoute)
  app.use('/api/v1/candidate-profile', candidateProfileRoute)
  app.use('/api/v1/candidate-language', candidateProfileRoute)
}

export default appRoutes
