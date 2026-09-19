import express from 'express'
import { get_pmfby_guidelines } from '../controller/guidelines.controller.js'

const router = express.Router()

router.get('/guidelines/pmfby', get_pmfby_guidelines)

export default router
