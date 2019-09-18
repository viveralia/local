const router = require('express').Router()
const { showAllproducts, showSingleCategoryProd, showSingleProduct } = require('../controllers/products')

router.get('/productos', showAllproducts)
router.get('/productos/:categoryName', showSingleCategoryProd)
router.get('/producto/:productId', showSingleProduct)

module.exports = router
