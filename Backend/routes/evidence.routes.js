import express from 'express'
import multer from 'multer'
import { upload_claim_evidence } from '../controller/evidence.controller.js'

const router = express.Router()
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 25 * 1024 * 1024,
		files: 5
	},
	fileFilter: (req, file, callback) => {
		const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
		if (!allowedTypes.includes(file.mimetype)) {
			return callback(new Error('File type is not supported'))
		}
		callback(null, true)
	}
})

router.post(
	'/claims/:claimId/evidence',
	upload.single('file'),
	(error, req, res, next) => {
		if (!error) return next()
		if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
			return res.status(413).json({ success: false, message: 'File is too large. Maximum size is 25 MB.' })
		}
		if (error.message === 'File type is not supported') {
			return res.status(415).json({ success: false, message: error.message })
		}
		return res.status(400).json({ success: false, message: 'The uploaded file could not be processed.' })
	},
	upload_claim_evidence
)

export default router
