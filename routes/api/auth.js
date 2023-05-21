const express = require('express')

const ctrl = require('../../controllers/auth')

const router = express.Router()

const { validateBody } = require('../../middleWares')
const { registerSchema, loginSchema } = require('../../schemas')

router.post('/register', validateBody(registerSchema), ctrl.register)

router.post('/login', validateBody(loginSchema), ctrl.login)

module.exports = router
