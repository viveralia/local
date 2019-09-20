const router = require('express').Router()
const { showHome } = require('../controllers/index')

router.get('/', showHome)

module.exports = router
