import express from 'express'
import { create_user_claim, update_user_details } from '../controller/userdetails.controller.js';

const router = express.Router();

router.post('/claims', create_user_claim)
router.patch('/claims/:claimId', update_user_details)

export default router;