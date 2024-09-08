import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new Schema(
    {
        apiId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        brand: {
            type: String, required: true
        },
        price: {
            type: Number,
            required: true
        },
        tags: [ String ],
        thumbnail: {
            type: String,
            required: true
        }
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

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }