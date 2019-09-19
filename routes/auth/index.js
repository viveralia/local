const router = require('express').Router()
const passport = require('../../config/passport')
const isLoggedIn = require('../../middlewares/isLoggedIn')
const {
  showBuyerForm,
  registerNewBuyer,
  showSellerForm,
  registerNewSeller,
  showLogInForm,
  loginUser,
  logoutUser,
  showUserProfile
} = require('../../controllers/auth')

/*****************************/
/*********** BUYER ***********/
/****************************/
router.get('/comprador/registro', showBuyerForm)
router.post('/comprador/registro', registerNewBuyer)

/*****************************/
/*********** SELLER **********/
/****************************/
router.get('/vendedor/registro', showSellerForm)
router.post('/vendedor/registro', registerNewSeller)

/*****************************/
/************ BOTH ***********/
/****************************/
router.get('/login', showLogInForm)
router.post('/login', passport.authenticate('local'), loginUser)
router.get('/perfil', isLoggedIn('/login'), showUserProfile)
router.get('/logout', logoutUser)

module.exports = router
