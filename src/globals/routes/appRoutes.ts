import { Application } from 'express'
import userRoute from '@/features/user/routes/user.route'
import authRoute from '@/features/user/routes/auth.route'
import candidateProfileRoute from '@/features/candidate-profile/routes/candidate-profile.routes'
import candidateLanguageRoute from '@/features/candidate-profile/routes/candidate-language.route'
import candidateEducationRoute from '@/features/candidate-profile/routes/candidate-education.route'
import candidateSkillRoute from '@/features/candidate-profile/routes/candidate-skill.route'
import candidateExperienceRoute from '@/features/candidate-profile/routes/candidate-experience.route'
import companyRoute from '@/features/company/routes/company.route'
import companyImageRoute from '@/features/company/routes/company-image.route'
import companyIndustryRoute from '@/features/company/routes/company-industry.route'
import jobRoleRoute from '@/features/job/routes/job-role.route'
import jobRoute from '@/features/job/routes/job.route'
import jobSkillRoute from '@/features/job/routes/job-skill.route'
import jobBenefitRoute from '@/features/job/routes/job-benefit.route'
import applyRoute from '@/features/apply/routes/apply.route'
import packageRoute from '@/features/package/routes/package.route'
import recruiterPackageRoute from '@/features/package/routes/recruiter-package.route'
import orderRoute from '@/features/order/routes/order.route'

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
  app.use('/api/v1/company-images', companyImageRoute)
  app.use('/api/v1/company-industries', companyIndustryRoute)
  app.use('/api/v1/job-roles', jobRoleRoute)
  app.use('/api/v1/jobs', jobRoute)
  app.use('/api/v1/job-skills', jobSkillRoute)
  app.use('/api/v1/job-benefits', jobBenefitRoute)
  app.use('/api/v1/applies', applyRoute)
  app.use('/api/v1/packages', packageRoute)
  app.use('/api/v1/recruiter-packages', recruiterPackageRoute)
  app.use('/api/v1/orders', orderRoute)
}

export default appRoutes
