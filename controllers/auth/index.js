const User = require('../../models/User')
const md5 = require('md5') // Hashes the email in md5 format for Gravatar (profile pic)

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
  const gravatar = `https://www.gravatar.com/avatar/${md5(email)}?d=identicon&s=200`
  try {
    await User.register(
      {
        role: 'BUYER',
        firstName,
        lastName,
        email,
        location: { address, city, state, postalCode, country },
        region,
        profilePic: gravatar
      },
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
  const gravatar = `https://www.gravatar.com/avatar/${md5(email)}?d=identicon&s=200`
  try {
    await User.register(
      {
        role: 'SELLER',
        firstName,
        lastName,
        email,
        location: { address, city, state, postalCode, country },
        region,
        profilePic: gravatar
      },
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

exports.showUserProfile = async (req, res) => {
  const currentUser = req.user
  const user = await User.findById(currentUser._id).populate('products')
  const products = user.products

  const config = {
    isProfile: true,
    isSeller: currentUser.role === 'SELLER',
    isBuyer: currentUser.role === 'BUYER'
  }
  res.render('auth/dashboard', { currentUser, config, products })
}
exports.showUserUpdateForm = (req, res) => {
  const currentUser = req.user
  const config = {
    isEdit: true,
    isSeller: currentUser.role === 'SELLER',
    isMexicoCity: currentUser.location.state === 'CDMX',
    isMexicoState: currentUser.location.state === 'Edo. Mex',
    isNorth: currentUser.location.region === 'NORTH',
    isCenter: currentUser.location.region === 'CENTER',
    isSouth: currentUser.location.region === 'SOUTH'
  }
  res.render('auth/dashboard', { currentUser, config })
}

exports.logoutUser = (req, res) => {
  req.logout()
  res.redirect('/login')
}

exports.updateUser = async (req, res) => {
  try {
    const currentUser = req.user
    const { firstName, lastName, email, address, city, state, postalCode, country, region, bio } = req.body
    const gravatar = `https://www.gravatar.com/avatar/${md5(email)}?d=identicon&s=200`
    const updatedUser = {
      role: currentUser.role,
      firstName,
      lastName,
      email,
      location: { address, city, state, postalCode, country },
      region,
      bio,
      profilePic: gravatar
    }
    await User.findByIdAndUpdate(currentUser, updatedUser)
    res.redirect('/perfil')
  } catch (e) {
    console.log(e) // Logs the error
  }
}
