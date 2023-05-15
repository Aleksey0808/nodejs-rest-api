const { createError } = require('../helpers')

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      let userField = error.message.split(' ')
      userField = `missing required ${userField[2]} field`

      next(createError(400, userField))
    }
    next()
  }
  return func
}

module.exports = validateBody
