import { profile } from 'console'
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
    try {
        const profile = await Profile.findById(req.user.profile)
        profile.cart[req.body.prodctIndex].deleteOne()
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
        if (profile.wishLists.some(wishList => wishList.Name === req.body.name )) throw new Error('wishList already exists')
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
        profile.wishLists[req.body.wishListIndex].deleteOne()
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
        profile.wishLists[req.body.wishListIndex].products.push(req.body.product)
        profile.save()
        res.status(200).json(profile)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

async function removeFromWishList(req, res){
    try {
        const profile = await Profile.findById(req.user.profile)
        profile.wishLists[req.body.wishListIndex].products[req.body.productIndex].deleteOne()
        profile.save()
        res.status(200).json(profile)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

async function changeWishListName(req, res){
    try {
        const profile = await Profile.findById(req.user.profile)
        profile.wishLists[req.body.wishListIndex].name = req.body.newName
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