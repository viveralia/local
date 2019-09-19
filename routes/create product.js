const express = require('express')
const router = express.Router()
const User = require('../models/User')
const uploadCloud = require('../config/cloudinary')

/* GET home page */
/*router.get('/sellerProfile', async (req, res) => {
  const user = await User.findById(req.user.id)
  console.log('req.user')
  res.render('sellerProfile', { user: req.user })
})
*/

module.exports = router
