const { model, Schema } = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ['BUYER', 'SELLER'],
      default: 'BUYER'
    },
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true
    },
    location: {
      address: String,
      city: String,
      state: String,
      postalCode: Number,
      country: String
    },
    region: {
      type: String,
      enum: ['NORTH', 'CENTER', 'SOUTH']
    },
    // Mainly for the Seller 👇
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    profilePic: String,
    bio: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = model('User', userSchema)
