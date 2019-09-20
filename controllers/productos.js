// IMANOL

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
    const { name, description, price, unit, stock, category } = req.body
    const { url: image } = req.file
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
  const product = await Product.findById(productId)
  const options = {
    title: 'Edit',
    action: `/product/edit/${productId}`,
    buttonText: 'Update',
    edit: true
  }
  const productToEdit = await Product.findById(productId)
  res.render('producto/form', { productToEdit, options, product })
}

exports.updateProduct = async (req, res) => {
  const { productId } = req.params
  const product = await Product.findById(productId)
  try {
    const { name, description, price, unit, stock, category } = req.body

    if (!req.file) {
      let updatedProduct = {
        name,
        description,
        price,
        unit,
        stock,
        category
      }
      await Product.findByIdAndUpdate(productId, updatedProduct)
    } else {
      const { url: image } = req.file
      let updatedProduct = {
        name,
        description,
        image,
        price,
        unit,
        stock,
        category
      }
      await Product.findByIdAndUpdate(productId, updatedProduct)
    }
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
