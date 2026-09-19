import express from 'express'
import { get_india_locations } from '../controller/locations.controller.js'

const router = express.Router()

router.get('/locations/india', get_india_locations)

export default router
