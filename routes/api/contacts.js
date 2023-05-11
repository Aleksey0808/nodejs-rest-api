
const express = require('express')


const { validateBody } = require('../../middleWares')

const schemas = require('../../schemas/contacts')


const router = express.Router()

const ctrl = require('../../controllers/contacts')

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', validateBody(schemas), ctrl.add)

router.put('/:contactId', validateBody(schemas), ctrl.updateById)

router.delete('/:contactId', ctrl.deleteById)

module.exports = router
