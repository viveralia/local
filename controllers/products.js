const Product = require('../models/Product')
const User = require('../models/User')

exports.showAllproducts = async (req, res) => {
  const fruitProducts = await Product.find({ category: 'frutas' })
    .limit(5)
    .sort({ updatedAt: -1 })
  const vegetableProducts = await Product.find({ category: 'vegetales' })
    .limit(5)
    .sort({ updatedAt: -1 })
  const herbProducts = await Product.find({ category: 'hierbas' })
    .limit(5)
    .sort({ updatedAt: -1 })
  const meatProducts = await Product.find({ category: 'carnes' })
    .limit(5)
    .sort({ updatedAt: -1 })
  const dairyProducts = await Product.find({ category: 'lacteos' })
    .limit(5)
    .sort({ updatedAt: -1 })
  const otherProducts = await Product.find({ category: 'otros' })
    .limit(5)
    .sort({ updatedAt: -1 })
  res.render('products/all', {
    fruitProducts,
    vegetableProducts,
    herbProducts,
    meatProducts,
    dairyProducts,
    otherProducts
  })
}

exports.showSingleCategoryProd = async (req, res) => {
  const { categoryName } = req.params
  const productsInCategory = await Product.find({ category: categoryName })
  const config = {
    category: categoryName
  }
  res.render('products/category', { config, productsInCategory })
}

exports.showSingleProduct = async (req, res) => {
  const { productId } = req.params
  const currentProduct = await Product.findById(productId)
  const productCat = currentProduct.category
  const relatedProducts = await Product.find({ category: productCat }).limit(5)
  res.render('products/single', { currentProduct, relatedProducts })
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
