import { Application } from 'express'
import userRoute from '@/features/user/routes/user.route'
import authRoute from '@/features/user/routes/auth.route'
import candidateProfileRoute from '@/features/candidate-profile/routes/candidate-profile.routes'
import candidateLanguageRoute from '@/features/candidate-profile/routes/candidate-language.route'
import candidateEducationRoute from '@/features/candidate-profile/routes/candidate-education.route'
import candidateSkillRoute from '@/features/candidate-profile/routes/candidate-skill.route'
import candidateExperienceRoute from '@/features/candidate-profile/routes/candidate-experience.route'
import companyRoute from '@/features/company/routes/company.route'

function appRoutes(app: Application) {
  app.use('/api/v1/users', userRoute)
  app.use('/api/v1/auth', authRoute)
  app.use('/api/v1/candidate-profile', candidateProfileRoute)
  app.use('/api/v1/candidate-language', candidateLanguageRoute)
  app.use('/api/v1/candidate-language', candidateLanguageRoute)
  app.use('/api/v1/candidate-education', candidateEducationRoute)
  app.use('/api/v1/candidate-skill', candidateSkillRoute)
  app.use('/api/v1/candidate-experiences', candidateExperienceRoute)
  app.use('/api/v1/companies', companyRoute)
}

export default appRoutes
