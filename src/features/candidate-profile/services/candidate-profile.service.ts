import { BadRequestException, NotFoundException } from '@/globals/cores/error.core'
import prisma from '@/prisma'
import { ICandidateProfile } from '../interfaces/candidate-profile.interface'
import { CandidateProfile } from '@prisma/client'

class CandidateProfileService {
  public async create(requestBody: ICandidateProfile, currentUser: UserPayload): Promise<CandidateProfile> {
    const existing = await prisma.candidateProfile.findUnique({
      where: { user_id: currentUser.id }
    })

    if (existing) {
      throw new BadRequestException('Candidate profile already exists')
    }
    const { full_name, gender, phone, cv, birthdate, address } = requestBody
    const candidateProfile = await prisma.candidateProfile.create({
      data: {
        full_name,
        gender,
        phone,
        cv,
        birthdate: new Date(birthdate),
        address,
        user_id: currentUser.id
      }
    })
    return candidateProfile
  }

  public async readAll(): Promise<CandidateProfile[]> {
    const candidates: CandidateProfile[] = await prisma.candidateProfile.findMany({
      include: {
        candidateLanguages: true,
        candidateEducations: true
      }
    })
    return candidates
  }

  public async readOne(id: number): Promise<CandidateProfile> {
    const candidate: CandidateProfile | null = await prisma.candidateProfile.findUnique({
      where: { id }
    })
    if (!candidate) throw new NotFoundException(`Candidate profile with ID: ${id} not found`)
    return candidate
  }

  public async readOneByUserId(user_id: number): Promise<CandidateProfile> {
    const candidate: CandidateProfile | null = await prisma.candidateProfile.findUnique({
      where: { user_id }
    })

    if (!candidate) throw new NotFoundException(`Candidate profile not found`)
    return candidate
  }

  public async update(id: number, requestBody: ICandidateProfile): Promise<CandidateProfile> {
    const { full_name, gender, phone, cv, birthdate, address } = requestBody

    const profileUpdate: CandidateProfile = await prisma.candidateProfile.update({
      where: { id },
      data: {
        full_name,
        gender,
        phone,
        cv,
        birthdate,
        address
      }
    })

    return profileUpdate
  }

  public async remove(id: number): Promise<void> {
    await this.readOne(id)

    await prisma.candidateProfile.delete({
      where: { id }
    })
  }

  public async toggleOpenToWork(id: number, openToWork: boolean): Promise<void> {
    await this.readOne(id)

    await prisma.candidateProfile.update({
      where: { id },
      data: { openToWork }
    })
  }
}

export const candidateProfileService = new CandidateProfileService()
