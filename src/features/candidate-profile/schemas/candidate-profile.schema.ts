import Joi from 'joi'

export const candidateProfileCreateSchema = Joi.object({
  full_name: Joi.string().required(),
  gender: Joi.string().required(),
  phone: Joi.string().required(),
  cv: Joi.string().required(),
  birthdate: Joi.string().isoDate().required(),
  address: Joi.string().required()
})

export const candidateProfileUpdateSchema = Joi.object({
  full_name: Joi.string().optional(),
  gender: Joi.string().optional(),
  phone: Joi.string().optional(),
  cv: Joi.string().optional(),
  birthdate: Joi.string().isoDate().optional(),
  address: Joi.string().optional()
})

export const candidateProfileOpenToWorkSchema = Joi.object({
  openToWork: Joi.boolean().optional()
})
