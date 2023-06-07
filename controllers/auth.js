const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp')
const { nanoid } = require('nanoid')

const { createError, sendEmail } = require('../helpers')
const { ctrlWrapper } = require('../middleWares')

const { SECRET_KEY, PROJECT_URL } = process.env

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw createError(409, 'Email already in use')
  }

  const hashPassword = await bcrypt.hash(password, 10)
  const avatarURL = gravatar.url(email)
  const verificationCode = nanoid()

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  })

  if (!newUser) {
    throw createError(404, 'Not found')
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${PROJECT_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`,
  }
  await sendEmail(verifyEmail)

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
  await User.findByIdAndUpdate(user._id, { token })

  res.json({ token })
}

const getCurrent = async (req, res) => {
  const { name, email } = req.user
  res.json({
    name,
    email,
  })
}

const logout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: '' })
  res.json({
    message: 'Logout success',
  })
}

const updateAvatar = async (req, res) => {
  const { _id } = req.user
  const { path: tempUpload, originalname } = req.file

  const avatar = await Jimp.read(tempUpload)
  await avatar
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempUpload)

  const filName = `${_id}_${originalname}`
  const resultUpload = path.join(avatarsDir, filName)
  await fs.rename(tempUpload, resultUpload)
  const avatarURL = path.join('avatars', filName)
  await User.findByIdAndUpdate(_id, { avatarURL })
  res.json({
    avatarURL,
  })
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
}
