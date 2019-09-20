const router = require('express').Router()
const checkRole = require('../middlewares/checkRole')
const uploadCloud = require('../config/cloudinary')
const {
  showAllproducts,
  showSingleCategoryProd,
  showSingleProduct,
  showNewProductForm,
  createNewProduct
} = require('../controllers/products')

router.get('/productos', showAllproducts)
router.get('/productos/:categoryName', showSingleCategoryProd)
router.get('/producto/nuevo', checkRole('SELLER'), showNewProductForm)
router.post('/producto/nuevo', checkRole('SELLER'), uploadCloud.single('image'), createNewProduct)
router.get('/producto/:productId', showSingleProduct)

module.exports = router
