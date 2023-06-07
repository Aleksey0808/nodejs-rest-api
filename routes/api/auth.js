const express = require('express')

const ctrl = require('../../controllers/auth')

const router = express.Router()

const { validateBody, authenticate, upload } = require('../../middleWares')
const {
  registerSchema,
  loginSchema,
  loginEmailSchema,
} = require('../../schemas')

router.post('/register', validateBody(registerSchema), ctrl.register)

router.get('/verify/:verificationCode', ctrl.verify)

router.post('/verify', validateBody(loginEmailSchema), ctrl.resendVerifyEmail)

router.post('/login', validateBody(loginSchema), ctrl.login)

router.get('/current', authenticate, ctrl.getCurrent)

router.post('/logout', authenticate, ctrl.logout)

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar,
)

module.exports = router
