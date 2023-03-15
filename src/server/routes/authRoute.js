import {login, register, logout, checkUser} from '../controllers/authController.js'
import checkAuth from '../middleware/checkAuth.js'
import express from 'express'

const authRoute = express.Router()

authRoute.post('/login', login)
authRoute.post('/register', register)
authRoute.post('/logout', logout)
authRoute.get('/check', checkAuth, checkUser)

export default authRoute