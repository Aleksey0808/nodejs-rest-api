const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { createError } = require('../helpers')
const { ctrlWrapper } = require('../middleWares')

const { SECRET_KEY } = process.env

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw createError(409, 'Email already in use')
  }

  const hashPassword = await bcrypt.hash(password, 10)

  const newUser = await User.create({ ...req.body, password: hashPassword })
  if (!newUser) {
    throw createError(404, 'Not found')
  }
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw createError(401, 'Email or password invalid')
  }
  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) {
    throw createError(401, 'Email or password invalid')
  }

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })
  res.json({ token })
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
}
