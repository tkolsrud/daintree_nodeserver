import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new Schema(
    {
        apiEndpoint: {
            type: String,
            required: true
        },
        tite: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        tags: [ String ]
    },
    { timestamps: true }
)

const wishListSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        products: [ productSchema ]
    },
    { timestamps: true }
)

const profileSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        wishLists: [ wishListSchema ],
        cart: [ productSchema ]
    },
    { timestamps: true }
)