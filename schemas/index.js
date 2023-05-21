const { addSchema, updateFavoriteSchema } = require('./contacts')
const { registerSchema, loginSchema } = require('./user')

const ctrlWrapper = require('../middleWares/ctrlWrapper')

module.exports = {
  ctrlWrapper,
  addSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
}
