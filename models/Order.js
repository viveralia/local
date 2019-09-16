const { model, Schema } = require('mongoose')

const orderSchema = new Schema(
  {
    products: {
      type: [Schema.Types.ObjectId],
      ref: 'Product'
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Order', orderSchema)
