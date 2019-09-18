const Seller = require('../../models/User')

exports.ensureLogin = (req, res, next) => {
  const config = {
    title: 'Sign up',
    action: '/seller/signup',
    button: 'Sign up',
    register: true
  }
  res.render('auth/sellerForm', config)
}

//Registro de sellers nuevos
exports.registerNewSeller = async (req, res, next) => {
  const { firstName, lastName, email, password, address, city, state, postalCode, country, region } = req.body
  try {
    const seller = await Seller.register(
      { firstName, lastName, email, location: { address, city, state, postalCode, country }, region, role: 'SELLER' },
      req.body.password
    )
    res.redirect('/login')
  } catch (e) {
    res.redirect('/login')
    res.send('El usuario ya existe')
  }
}

exports.ensureLog = (req, res, next) => {
  const config = {
    title: 'Log in',
    action: '/login',
    button: 'Log in'
  }
  res.render('auth/sellerForm', config)
}

//Login de usuario

exports.login = (req, res, next) => {
  res.redirect('/sellerProfile')
}

exports.isLoggedin = (req, res, next) => {
  res.render('auth/sellerProfile', { seller: req.user })
}

exports.logOut = (req, res, next) => {
  req.logout()
  res.redirect('/login')
}

exports.loggedin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}
