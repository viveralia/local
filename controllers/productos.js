const Product = require('../models/Product')
exports.showAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.render('producto/all', { products })
  } catch (error) {
    console.log(error)
  }
}

exports.showNewProductForm = (req, res) => {
  const options = {
    title: 'Create a new product',
    action: '/create',
    buttonText: 'Create'
  }
  res.render('producto/form', { options })
}

exports.createNewProduct = async (req, res) => {
  try {
    const { name, description, image, price, unit, stock, category } = req.body
    console.log(req.body)
    const newProduct = {
      name,
      description,
      image,
      price,
      unit,
      stock,
      category
    }
    await Product.create(newProduct)
    res.redirect('/all')
  } catch (error) {
    console.log(error)
  }
}

exports.showEditProductForm = async (req, res) => {
  const { productId } = req.params
  const options = {
    title: 'Edit',
    action: `/product/edit/${productId}`,
    buttonText: 'Update',
    edit: true
  }
  const productToEdit = await Product.findById(productId)
  res.render('producto/form', { productToEdit, options })
}

exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params
    const { name, description, image, price, unit, stock, category } = req.body
    const updatedProduct = {
      name,
      description,
      image,
      price,
      unit,
      stock,
      category
    }
    await Product.findByIdAndUpdate(productId, updatedProduct)
    res.redirect('/all')
  } catch (error) {
    console.log(error)
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params
    await Product.findByIdAndDelete(productId)
    res.redirect('/all')
  } catch (error) {
    console.log(error)
  }
}
