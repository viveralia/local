const { model, Schema } = require('mongoose')

const categorySchema = new Schema(
  {
    name: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Category', categorySchema)
