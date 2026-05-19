import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { createRequest, getRequests } from '../controllers/requestController.js'

const router = express.Router()

router.route('/').post(protect, createRequest).get(getRequests)

export default router
