const express = require('express');
const router = express.Router();

const contactsRouter = require('../../models/contacts.json')

router.get('/', async(req, res) => {
  // res.send(contactsRouter);
  res.json(contactsRouter);
});

router.get('/:id', async(req, res) => {
  res.json(contactsRouter[0]);
});

router.post('/:id', async(req, res) => {
  res.json(contactsRouter[0]);
});

router.put('/:id', async(req, res) => {
  res.json(contactsRouter[0]);
});

router.delete('/:id', async(req, res) => {
  res.json(contactsRouter[0]);
});

module.exports = router