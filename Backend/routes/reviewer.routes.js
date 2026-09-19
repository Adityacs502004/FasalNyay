import express from 'express'
import { get_reviewer_case } from '../controller/reviewer.controller.js'

const router = express.Router()

router.get('/review/claims/:claimId', get_reviewer_case)

export default router
