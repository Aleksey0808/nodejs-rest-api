const validateBody = require('./validateBody')
const presenceBody = require('./presenceBody')

const ctrlWrapper = require('../middleWares/ctrlWrapper')

module.exports = {
  validateBody,
  ctrlWrapper,
  presenceBody,
}
