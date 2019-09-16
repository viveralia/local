const { model, Schema } = require('mongoose')

const regionSchema = new Schema(
  {
    name: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Region', regionSchema)
