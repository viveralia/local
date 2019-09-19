const User = require('../../models/User')

/*****************************/
/*********** BUYER ***********/
/****************************/
exports.showBuyerForm = (req, res, next) => {
  const config = {
    title: '¡Únete al cambio!',
    register: true,
    action: '/comprador/registro',
    alt: '¿Ya eres usuario? <a href="/login">Inicia sesión aquí</a>',
    addressHeading: '¿A dónde realizamos tus envíos?',
    button: 'Registrarme'
  }
  res.render('auth/form', config)
}

exports.registerNewBuyer = async (req, res, next) => {
  const { firstName, lastName, email, password, address, city, state, postalCode, country, region } = req.body
  try {
    await User.register(
      { role: 'BUYER', firstName, lastName, email, location: { address, city, state, postalCode, country }, region },
      password
    )
    res.redirect('/login')
  } catch (e) {
    res.redirect('/login')
    res.send('El usuario ya existe')
  }
}

/*****************************/
/*********** SELLER **********/
/****************************/
exports.showSellerForm = (req, res, next) => {
  const config = {
    title: 'Comienza a vender con nosotros',
    register: true,
    action: '/vendedor/registro',
    alt: '¿Ya eres usuario? <a href="/login">Inicia sesión aquí</a>',
    addressHeading: '¿Desde dónde mandas tus productos?',
    button: 'Registrarme'
  }
  res.render('auth/form', config)
}

exports.registerNewSeller = async (req, res, next) => {
  const { firstName, lastName, email, password, address, city, state, postalCode, country, region } = req.body
  try {
    await User.register(
      { role: 'SELLER', firstName, lastName, email, location: { address, city, state, postalCode, country }, region },
      password
    )
    res.redirect('/login')
  } catch (e) {
    res.redirect('/login')
    res.send('El usuario ya existe')
  }
}

/*****************************/
/*********** BOTH ***********/
/***************************/
exports.showLogInForm = (req, res) => {
  const config = {
    title: 'Inicia sesión',
    register: false,
    action: '/login',
    alt: '¿Quieres comprar y no tienes cuenta? <br /> <a href="/comprador/registro">Regístrate aquí</a>',
    button: 'Iniciar sesión'
  }
  res.render('auth/form', config)
}

exports.loginUser = (req, res) => {
  res.redirect('/perfil')
}

exports.showUserProfile = (req, res) => {
  const currentUser = req.user
  res.render('auth/profile', currentUser)
}

exports.logoutUser = (req, res) => {
  req.logout()
  res.redirect('/login')
}
