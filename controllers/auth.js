import jwt from 'jsonwebtoken'


import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'

async function signup(req, res) {
    try {
        if (!process.env.SECRET) throw new Error('no SECRET in back-end .env')
        
        const user = await User.findOneAndReplace({ email: req.body.email })
        if (user) throw new Error('Account already exists')
        
        const profile = await Profile.create(req.body)
        req.body.profile = profile._id
        const newUser = await User.create(req.body)

        const token = createJWT(newUser)
        res.status(200).json({ token, profile })
    } catch(err) {
        console.log(err)
        try {
            if (req.body.profile){
                await Profile.findByIdAndDelete(req.body.profile)
            }
        } catch(err) {
            console.log(err)
            return res.status(500).json({ err: err.message })
        }
        res.status(500).json({ err: err.message })
    }
}

async function login(req, res) {
    console.log(req.headers)
    try {
        if (!process.env.SECRET) throw new Error('no SECRET in back-end env')
        
        const user = await User.findOne({ email: req.body.email })
        const profile = await Profile.findById(user.profile)
            // Should this be selectively fetched per page, or just fetched on login?:
            // .populate('cart')
            // .populate({ path: 'wishLists', select: 'name' })
        if (!user) throw new Error('User not found')

        const isMatch = await user.comparePassword(req.body.password)
        if (!isMatch) throw new Error('Incorrect password')
        
        const token = createJWT(user)
        res.json({ token, profile })
    } catch(err) {
        handleAuthError(err, res)
    }
}

async function changePassword(req, res) {
    try {
        const user = await User.findById(req.user._id)
        if (!user) throw new Error('User not found')
        
        const isMatch = user.comparePassword(req.body.password)
        if (!isMatch) throw new Error('Incorrect password')

        user.password = req.body.newPassword
        await user.save()

        const token = createJWT(user)
        res.json({ token })
    } catch(err) {
        handleAuthError(err, res)
    }
}

async function deleteUser(req, res) {
    try {
        await Profile.findByIdAndDelete(req.user.profile)
        const deletedUser = await User.findByIdAndDelete(req.user._id)
        
        res.status(200).json(deletedUser)
    } catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

// Helper Functions

function handleAuthError(err, res) {
    console.log(err)
    const { message } = err
    if (message === 'User not found' || message === 'Incorrect password') {
        res.status(401).json({ err: message })
    }
}

function createJWT(user) {
    return jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' })
}

export { 
        signup, 
        login, 
        changePassword,
        deleteUser 
    }