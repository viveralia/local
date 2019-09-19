const router = require('express').Router()
const checkRole = require('../middlewares/checkRole')
const {
  showAllproducts,
  showSingleCategoryProd,
  showSingleProduct,
  showNewProductForm
} = require('../controllers/products')

router.get('/productos', showAllproducts)
router.get('/productos/:categoryName', showSingleCategoryProd)
router.get('/producto/nuevo', checkRole('SELLER'), showNewProductForm)
router.get('/producto/:productId', showSingleProduct)

module.exports = router
