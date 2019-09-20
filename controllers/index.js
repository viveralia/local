const Product = require('../models/Product')

exports.showHome = async (req, res) => {
  const products = await Product.find()
    .limit(8)
    .sort({ updatedAt: -1 })
  res.render('index', { products })
}
