const Product = require('../models/Product')
const User = require('../models/User')

exports.showAllproducts = (req, res) => {
  // TODO: Render de productos de Mongo
  res.render('products/all')
}

exports.showSingleCategoryProd = (req, res) => {
  // TODO: Render de productos de Mongo
  res.render('products/category')
}

exports.showSingleProduct = (req, res) => {
  res.render('products/single')
}

exports.showNewProductForm = (req, res) => {
  const config = {
    title: 'Nuevo producto',
    action: '/producto/nuevo'
  }
  res.render('products/form', { config })
}

// TODO: Not creating the products
exports.createNewProduct = async (req, res) => {
  try {
    const { name, description, price, unit, stock, category } = req.body
    // const { url: image } = req.file
    const newProduct = {
      name,
      description,
      price,
      unit,
      stock,
      category
    }

    const currentUser = req.user
    const userProduct = await Product.create(newProduct)
    await User.findByIdAndUpdate(currentUser._id, { $push: { products: userProduct } })
    res.redirect('/perfil')
  } catch (error) {
    console.log(error)
  }
}
