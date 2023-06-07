const { addSchema, updateFavoriteSchema } = require('./contacts')
const { registerSchema, loginSchema, loginEmailSchema } = require('./user')

const ctrlWrapper = require('../middleWares/ctrlWrapper')

module.exports = {
  ctrlWrapper,
  addSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
  loginEmailSchema,
}
