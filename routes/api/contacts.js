const express = require('express')

const {
  validateBody,
  presenceBody,
  isValidId,
  authenticate,
} = require('../../middleWares')

const { addSchema, updateFavoriteSchema } = require('../../schemas')

const router = express.Router()

const ctrl = require('../../controllers/contacts')

router.get('/', authenticate, ctrl.getAll)

router.get('/:contactId', authenticate, isValidId, ctrl.getById)

router.post('/', authenticate, validateBody(addSchema), ctrl.add)

router.put(
  '/:contactId',
  authenticate,
  presenceBody,
  isValidId,
  validateBody(addSchema),
  ctrl.updateById,
)

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavorite,
)

router.delete('/:contactId', authenticate, ctrl.deleteById)

module.exports = router
