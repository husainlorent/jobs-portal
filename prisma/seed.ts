import { Benefit, Industry, JobRole, Language, PrismaClient, Skill } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const data: Language[] = [{ name: 'english' }, { name: 'japanese' }, { name: 'chinese' }]

  await prisma.language.createMany({
    data
  })
}

async function createEducationData() {
  const data = [
    { name: 'Harvard University', map: 'https://maps.app.goo.gl/f6JQ4oZwCubWX4Jz7' },
    { name: 'Stanford University', map: 'https://maps.app.goo.gl/f6JQ4oZwCubWX4Jz7' },
    { name: 'California Institute of Technology', map: 'https://maps.app.goo.gl/f6JQ4oZwCubWX4Jz7' }
  ]

  await prisma.education.createMany({
    data
  })
}

// async function createSkillData() {
//   const data: Skill[] = [
//     { name: 'JavaScript' },
//     { name: 'HTML' },
//     { name: 'CSS' },
//     { name: 'C++' },
//     { name: 'C#' },
//     { name: 'Docker' },
//     { name: 'ReactJS' },
//     { name: 'TypeScript' },
//     { name: 'NodeJS' }
//   ]

//   await prisma.skill.createMany({
//     data
//   })
// }

async function createIndustryData() {
  const data: Industry[] = [
    { name: 'Advertising and marketing' },
    { name: 'Computer and technology' },
    { name: 'Education' },
    { name: 'Finance and economic' }
  ]

  await prisma.industry.createMany({
    data
  })
}

async function createJobRoleData() {
  const data: JobRole[] = [
    { name: 'senior' },
    { name: 'fresher' },
    { name: 'internship' },
    { name: 'junior' },
    { name: 'middle' }
  ]

  await prisma.jobRole.createMany({
    data
  })
}

async function createBenefitData() {
  const data: Benefit[] = [
    { name: 'medical coverage' },
    { name: 'dental insurance' },
    { name: 'vision insurance' },
    { name: 'life insurance policies' },
    { name: 'mental health coverage' }
  ]

  await prisma.benefit.createMany({
    data
  })
}

createBenefitData()
  .then()
  .catch((err) => console.log(err))
