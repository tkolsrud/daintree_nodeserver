import { Profile } from '../models/profile.js'

// Profile Controllers

async function index(req, res) {
    try {
        const profiles = await Profile.find({})
        res.status(200).json(profiles)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

async function profileDetail(req, res) {
    try {
        const profile = await Profile.findById(req.user.profile)
            .populate('cart')
            .populate({path: 'wishLists', select: 'name'})
        res.status(200).json(profile)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// Cart Controllers

async function addToCart(req, res) {
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
    console.log(req)
    try {
        const profile = await Profile.findById(req.user.profile)
        const cart = profile.cart
        cart.splice(cart.findIndex(product => product._id === req.params.id), 1)
        profile.save()
        res.status(200).json(profile)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// Wish List Controllers

async function createWishList(req, res) {
    try {
        const profile = await Profile.findById(req.user.profile)
            .populate('cart')
            .populate({ path: 'wishLists', select: 'names'})
        if (profile.wishLists.some(wishList => wishList.name === req.body.name )) throw new Error('wishList already exists')
        profile.wishLists.push(req.body)
        profile.save()
        res.status(200).json(profile)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

async function deleteWishList(req, res) {
    try {
        const profile = await Profile.findById(req.user.profile)
        profile.wishLists.id(req.params.id).deleteOne()
        profile.save()
        res.status(200).json(profile)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }

}

async function addToWishList(req, res){
    try {
        const profile = await Profile.findById(req.user.profile)
        console.log(req.body)
        const wishList = profile.wishLists.id(req.body.id)
        wishList.products.push(req.body.product)
        profile.save()
        res.status(200).json(profile)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

async function removeFromWishList(req, res){
    try {
        console.log('REQPARAMS', req.params)
        const profile = await Profile.findById(req.user.profile)
        const wishList = await profile.wishLists.id(req.params.listId)
        console.log(wishList)
        wishList.products.splice(wishList.products.findIndex(product => product._id === req.params.prodId), 1)
        profile.save()
        console.log(profile, wishList)
        res.status(200).json({profile})
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

async function changeWishListName(req, res){
    try {
        const profile = await Profile.findById(req.user.profile)
        profile.wishLists[req.body.id].name = req.body.newName
        profile.save()
        res.status(200).json(profile)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export { 
        index, 
        profileDetail,
        addToCart,
        removeFromCart,
        createWishList,
        addToWishList,
        removeFromWishList,
        deleteWishList,
        changeWishListName
    }