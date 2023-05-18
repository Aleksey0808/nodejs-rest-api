const validateBody = require('./validateBody')
const presenceBody = require('./presenceBody')
const isValidId = require('./isValidId')
const validateFavorite = require('./validateFavorite')

const ctrlWrapper = require('../middleWares/ctrlWrapper')

module.exports = {
  validateBody,
  ctrlWrapper,
  presenceBody,
  isValidId,
  validateFavorite,
}
