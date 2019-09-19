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
      type: String,
      enum: [
        'VEGETABLES',
        'FRUIT',
        'HERBS',
        'BEEF',
        'PORK',
        'CHICKEN',
        'TURKEY',
        'SEAFOOD',
        'MEAT ALTERNATIVES',
        'MILK',
        'MILK ALTERNATIVES',
        'CREAM',
        'BUTTER',
        'CHEESE',
        'EGGS',
        'OTHER DAIRY',
        'OTHER'
      ]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Product', productSchema)
