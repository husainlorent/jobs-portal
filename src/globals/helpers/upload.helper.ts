import multer from 'multer'
import path from 'path'
import fs from 'fs/promises'
import fsSync from 'fs'
import { BadRequestException } from '../cores/error.core'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'company-images'
    const uploadDir = path.join(__dirname, '../../../uploads', uploadPath)

    if (!fsSync.existsSync(uploadDir)) {
      fsSync.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

export async function deleteImage(imageUrl: string) {
  const uploadPath = 'company-images'
  const uploadDir = path.join(__dirname, '../../../uploads', uploadPath, imageUrl)

  await fs.unlink(uploadDir)
}

export const uploadCompanyImage = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 5 MB
    files: 5 // maksimal 5 ta fayl
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true) // Fayl ruxsat etilgan
    } else {
      cb(new BadRequestException('Faqat JPEG yoki PNG formatdagi rasm fayllariga ruxsat beriladi!'))
    }
  }
})
