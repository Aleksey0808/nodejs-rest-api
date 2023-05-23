const validateBody = require('./validateBody')
const presenceBody = require('./presenceBody')
const isValidId = require('./isValidId')
const authenticate = require('./authenticate')
const upload = require('./upload')

const ctrlWrapper = require('../middleWares/ctrlWrapper')

module.exports = {
  validateBody,
  ctrlWrapper,
  presenceBody,
  isValidId,
  authenticate,
  upload,
}
