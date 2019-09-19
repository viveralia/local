const router = require('express').Router()
const uploadCloud = require('../config/cloudinary')
const catchErrors = require('../middlewares/catchErrors')

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
router.post('/create', uploadCloud.single('image'), catchErrors(createNewProduct))
router.get('/edit/:productId', showEditProductForm)
router.post('/edit/:productId', uploadCloud.single('image'), catchErrors(updateProduct))
router.get('/delete/:productId', deleteProduct)
module.exports = router
