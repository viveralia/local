const router = require('express').Router()
const checkRole = require('../middlewares/checkRole')
const uploadCloud = require('../config/cloudinary')
const {
  showAllproducts,
  showSingleCategoryProd,
  showSingleProduct,
  showNewProductForm,
  createNewProduct,
  deleteProduct,
  showUpdateProductForm,
  updateProduct
} = require('../controllers/products')

router.get('/productos', showAllproducts)
router.get('/productos/:categoryName', showSingleCategoryProd)
router.get('/producto/nuevo', checkRole('SELLER'), showNewProductForm)
router.post('/producto/nuevo', checkRole('SELLER'), uploadCloud.single('image'), createNewProduct)
router.get('/producto/:productId', showSingleProduct)

router.get('/producto/:productId/actualizar', showUpdateProductForm)
router.post('/producto/:productId/actualizar', uploadCloud.single('image'), updateProduct)
router.get('/producto/:productId/borrar', deleteProduct)

module.exports = router
