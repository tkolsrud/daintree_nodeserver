import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const saltRounds = 6
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    
})