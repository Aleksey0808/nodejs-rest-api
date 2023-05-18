const { createError } = require('../helpers')

const validateFavorite = (req, res, next) => {
  const user = req.body
  if (Object.keys(user).length === 0) {
    throw createError(400, 'missing fields favorite')
  }
  next()
}

module.exports = validateFavorite
