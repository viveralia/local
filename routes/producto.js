const router = require('express').Router()

const {
  showAllProducts,
  showNewProductForm,
  createNewProduct,
  showEditProductForm,
  updateProduct,
  deleteProduct
} = require('../controllers/productos')

router.get('/all', showAllProducts)
router.get('/create', showNewProductForm)
router.post('/create', createNewProduct)
router.get('/edit/:productId', showEditProductForm)
router.post('/edit/:productId', updateProduct)
router.get('/delete/:productId', deleteProduct)
module.exports = router
