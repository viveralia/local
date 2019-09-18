const Buyer = require('../../models/User')

exports.ensureLogin = (req, res, next) => {
  const config = {
    title: 'Sign up',
    action: '/buyer/signup',
    button: 'Sign up',
    register: true
  }
  res.render('auth/buyerForm', config)
}

//Registro de buyers nuevos
exports.registerNewBuyer = async (req, res, next) => {
  const { firstName, lastName, email, password, address, city, state, postalCode, country, region } = req.body
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
}

exports.ensureLog = (req, res, next) => {
  const config = {
    title: 'Log in',
    action: '/login',
    button: 'Log in'
  }
  res.render('auth/buyerForm', config)
}

//Login de usuario

exports.login = (req, res, next) => {
  res.redirect('/buyerProfile')
}

exports.isLoggedin = (req, res, next) => {
  res.render('auth/buyerProfile', { buyer: req.user })
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
