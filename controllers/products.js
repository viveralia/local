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
    action: '/producto/nuevo',
    buttonText: 'Crear'
  }
  res.render('products/form', { config })
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

    const currentUser = req.user
    const userProduct = await Product.create(newProduct)
    await User.findByIdAndUpdate(currentUser._id, { $push: { products: userProduct } })
    res.redirect('/perfil')
  } catch (error) {
    console.log(error)
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params
    await Product.findByIdAndDelete(productId)
    res.redirect('/perfil')
  } catch (error) {
    console.log(error)
  }
}

exports.showUpdateProductForm = async (req, res) => {
  const { productId } = req.params
  const product = await Product.findById(productId)
  const config = {
    title: 'Actualizando: ',
    action: `/producto/${productId}/actualizar`,
    buttonText: 'Actualizar',
    isEdit: true,
    isKg: product.unit === 'kg',
    isLt: product.unit === 'litro',
    isFruit: product.category === 'frutas',
    isVeggie: product.category === 'vegetales',
    isHerb: product.category === 'hierbas',
    isMeat: product.category === 'carnes',
    isSeafood: product.category === 'mariscos',
    isDairy: product.category === 'lacteos',
    isOther: product.category === 'otros'
  }
  const productToEdit = await Product.findById(productId)
  res.render('products/form', { productToEdit, config, product })
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
    res.redirect('/perfil')
  } catch (error) {
    console.log(error)
  }
}
