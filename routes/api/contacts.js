const express = require('express')

const { validateBody, presenceBody, isValidId } = require('../../middleWares')

const schemas = require('../../schemas/contacts')
const updateFavoriteSchema = require('../../schemas/contacts')

const router = express.Router()

const ctrl = require('../../controllers/contacts')

router.get('/', ctrl.getAll)

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/', validateBody(schemas), ctrl.add)

router.put(
  '/:contactId',
  presenceBody,
  isValidId,
  validateBody(schemas),
  ctrl.updateById,
)

router.patch(
  '/:contactId/favorite',
  presenceBody,
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavorite,
)

router.delete('/:contactId', ctrl.deleteById)

module.exports = router
