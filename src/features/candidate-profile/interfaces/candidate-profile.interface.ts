import { Gender } from 'generated/prisma'

export interface ICandidateProfile {
  full_name: string
  gender: Gender
  phone: string
  cv: string
  birthdate: string
  address: string
}
