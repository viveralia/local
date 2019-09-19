module.exports = route => (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect(route)
  }
}
