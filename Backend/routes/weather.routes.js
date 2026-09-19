import express from 'express'
import { get_claim_weather } from '../controller/weather.controller.js'

const router = express.Router()

router.get('/claims/:claimId/weather', get_claim_weather)

export default router
