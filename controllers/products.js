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
  res.render('products/new')
}
