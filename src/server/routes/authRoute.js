import {login, register, logout} from '../controllers/authController.js'
import express from 'express'

const authRoute = express.Router()

authRoute.post('/login', login)
authRoute.post('/register', register)
authRoute.post('/logout', logout)

export default authRoute