const router = require('express').Router()
const passport = require('../../config/passport')
const {
  ensureLogin,
  registerNewBuyer,
  ensureLog,
  login,
  isLoggedin,
  logOut,
  loggedin
} = require('../../controllers/auth/buyer')

router.get('/buyer/signup', ensureLogin)
router.post('/buyer/signup', registerNewBuyer)
router.get('/login', ensureLog)
router.post('/login', passport.authenticate('local'), login)
router.get('/buyerProfile', loggedin, isLoggedin)
router.get('/logout', logOut)

//--------------------------------
/*
const ensureLogin = router.get('/buyer/signup', (req, res, next) => {
  const config = {
    title: 'Sign up',
    action: '/buyer/signup',
    button: 'Sign up',
    register: true
  }
  res.render('auth/buyerForm', config)
})


//Registro de buyers nuevos
router.post('/buyer/signup', async (req, res, next) => {
  const { firstName, lastName, email, password, address, city, state, postalCode, country, region } = req.body
  console.log(region)
  try {
    const buyer = await Buyer.register(
      { firstName, lastName, email, location: { address, city, state, postalCode, country }, region },
      req.body.password
    )
    res.redirect('/login')
  } catch (e) {
    res.redirect('/login')
    res.send('El usuario ya existe')
  }
})

router.get('/login', (req, res, next) => {
  const config = {
    title: 'Log in',
    action: '/login',
    button: 'Log in'
  }
  res.render('auth/buyerForm', config)
})

//Login de usuario

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/buyerProfile')
})

router.get('/buyerProfile', isLoggedin, (req, res, next) => {
  res.render('auth/buyerProfile', { buyer: req.user })
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/login')
})

function isLoggedin(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}
*/
module.exports = router
