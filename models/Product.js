const { model, Schema } = require('mongoose')

const productSchema = new Schema(
  {
    name: String,
    description: String,
    image: {
      type: String,
      // TODO: Change the default image picture
      default: 'https://images.rappi.com/web/no-photos.svg'
    },
    price: Number,
    unit: String,
    stock: Number,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Product', productSchema)
