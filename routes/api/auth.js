const express = require('express')

const ctrl = require('../../controllers/auth')

const router = express.Router()

const { validateBody, authenticate } = require('../../middleWares')
const { registerSchema, loginSchema } = require('../../schemas')

router.post('/register', validateBody(registerSchema), ctrl.register)

router.post('/login', validateBody(loginSchema), ctrl.login)

router.get('/current', authenticate, ctrl.getCurrent)

router.post('/logout', authenticate, ctrl.logout)

module.exports = router
