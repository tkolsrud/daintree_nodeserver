import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profile.js'

const router = Router()

// Public Routes

// Protected Routes
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.post('/add-to-cart', checkAuth, profilesCtrl.addToCart)
router.put('/remove-from-cart', checkAuth, profilesCtrl.removeFromCart)

export { router }