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
router.delete('/remove-from-cart/:id', checkAuth, profilesCtrl.removeFromCart)

// Wish List Routes
router.post('/create-wl', checkAuth, profilesCtrl.createWishList)
router.delete('/delete-wl/:id', checkAuth, profilesCtrl.deleteWishList)
router.patch('/change-wl-name', checkAuth, profilesCtrl.changeWishListName)

router.post('/add-product-wl', checkAuth, profilesCtrl.addToWishList)
router.delete('/list/:listId/remove-product-wl/:prodId', checkAuth, profilesCtrl.removeFromWishList)


export { router }