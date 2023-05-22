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
  await User.findByIdAndUpdate(user._id, {token})

  res.json({ token })
}

const getCurrent = async (req, res) => {
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, {token: ''})
  res.json({
    message: "Logout success"
  })
}

const logout = async (req, res) => {
  const {name, email} = req.user;
  res.json({
    name,
    email,
  })
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
}
