import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profile.js'

const router = Router()

// Public Routes

// Protected Routes
router.use(decodeUserFromToken)

// Profile Routes
router.get('/', checkAuth, profilesCtrl.index)
router.get('/user-profile', checkAuth, profilesCtrl.profileDetail)

// Cart Routes
router.post('/add-to-cart', checkAuth, profilesCtrl.addToCart)
router.put('/remove-from-cart', checkAuth, profilesCtrl.removeFromCart)

// Wish List Routes
router.post('/create-wishlist', checkAuth, profilesCtrl.createWishList)

export { router }