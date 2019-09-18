const router = require('express').Router()
const passport = require('../../config/passport')
const {
  ensureLogin,
  registerNewSeller,
  ensureLog,
  login,
  isLoggedin,
  logOut,
  loggedin
} = require('../../controllers/auth/seller')

router.get('/seller/signup', ensureLogin)
router.post('/seller/signup', registerNewSeller)
router.get('/login', ensureLog)
router.post('/login', passport.authenticate('local'), login)
router.get('/sellerProfile', loggedin, isLoggedin)
router.get('/logout', logOut)

module.exports = router
