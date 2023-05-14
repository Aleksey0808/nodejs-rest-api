const { createError } = require('../helpers')

const presenceBody = (req, res, next) => {
  const user = req.body
  if (Object.keys(user).length === 0) {
    throw createError(400, 'missing fields')
  }
  next()
}

module.exports = presenceBody
