import { Profile } from '../models/profile.js'

async function index(req, res) {
    try {
        const profiles = await Profile.find({})
        res.status(200).json(profiles)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

async function addToCart(req, res) {
    console.log("add to cart", req.body)
    try {
        const profile = await Profile.findById(req.user.profile)
        profile.cart.push(req.body)
        profile.save()
        res.status(200).json(profile)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

async function removeFromCart(req, res) {
    try {
        const profile = await Profile.findById(req.user.profile)
        const cart = profile.cart
        cart.splice(cart.findIndex((item) => item._id === req.body.productId), 1)
        profile.save()
        res.status(200).json(profile)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export { 
        index, 
        addToCart,
        removeFromCart
    }