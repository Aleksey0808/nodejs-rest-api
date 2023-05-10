const express = require('express')
const Joi = require('joi')

const { createError } = require('../../helpers')

const contactsPath = require('../../models/contacts')

const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsPath.listContacts()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsPath.getContactById(contactId)
    if (!result) {
      throw createError(404)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw createError(400, error.message)
    }
    const result = await contactsPath.addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw createError(400, error.message)
    }
    const { contactId } = req.params
    const result = await contactsPath.updateContact(contactId, req.body)
    if (!result) {
      throw createError(404)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsPath.removeContact(contactId)
    if (!result) {
      throw createError(404)
    }
    res.json({
      message: 'Contact deleted',
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
