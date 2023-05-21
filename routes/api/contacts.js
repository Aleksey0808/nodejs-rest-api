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

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/', validateBody(addSchema), ctrl.add)

router.put(
  '/:contactId',
  presenceBody,
  isValidId,
  validateBody(addSchema),
  ctrl.updateById,
)

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavorite,
)

router.delete('/:contactId', ctrl.deleteById)

module.exports = router
