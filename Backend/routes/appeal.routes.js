import express from 'express'
import { generate_claim_appeal } from '../controller/appeal.controller.js'

const router = express.Router()

router.post('/claims/:claimId/appeal-draft', generate_claim_appeal)

export default router
