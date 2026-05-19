import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  setupDonorProfile,
  getDonorProfile,
  getDonors,
} from '../controllers/donorController.js'

const router = express.Router()

router.route('/').get(getDonors)
router
  .route('/profile')
  .post(protect, setupDonorProfile)
  .get(protect, getDonorProfile)

export default router
