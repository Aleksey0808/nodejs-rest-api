const { createError } = require('../helpers')
const { ctrlWrapper } = require('../middleWares')

const contactsPath = require('../models/contacts')

const getAll = async (req, res) => {
  const result = await contactsPath.listContacts()
  res.json(result)
}

const getById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsPath.getContactById(contactId)
  if (!result) {
    throw createError(404)
  }
  res.json(result)
}

const add = async (req, res) => {
  const result = await contactsPath.addContact(req.body)
  res.status(201).json(result)
}

const updateById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsPath.updateContact(contactId, req.body)
  if (!result) {
    throw createError(404, 'Not found')
  }
  res.json(result)
}

const deleteById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsPath.removeContact(contactId)
  if (!result) {
    throw createError(404, 'Not found')
  }
  res.json({
    message: 'Contact deleted',
  })
  res.json(result)
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
}
