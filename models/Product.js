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
    category: {
      type: String,
      enum: ['frutas', 'vegetales', 'hierbas', 'carnes', 'lacteos', 'otros']
    },
    producer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Product', productSchema)
