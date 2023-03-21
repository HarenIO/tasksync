import { registerSchema, loginSchema } from '../utils/validation.js'
import authModel from '../models/auth.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: './src/server/config/.env' })

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS, { expiresIn: '1h' })
}


const register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const { username, password } = value
      const userExists = await authModel.checkUserExists(username)
      if (userExists) {
        return res.status(409).json({ error: 'Username taken' })
      }

      const hashedPassword = await argon2.hash(password)
      await authModel.registerUser({ username, hashedPassword })
      return res.status(201).json({ success: 'User successfully registered' })
    }
  }
  catch (err) {
    return res.status(500).json({ error: err })
  }
}


const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const { username, password } = value
      const userExists = await authModel.checkUserExists(username)
      if (!userExists) {
        return res.status(401).json({ error: 'Login failed; Invalid username or password.' })
      }
      const userDetails = await authModel.loginUser(value)
      //Exkluderar password från objektet med ESNext syntax
      const user = (({ password, ...userDetails }) => userDetails)(userDetails)
      if (await argon2.verify(userDetails.password, password)) {
        const accessToken = generateAccessToken(user)

        return res.cookie('authToken', accessToken, {
          httpOnly: true,
          secure: true,
          domain: 'tasksync.onrender.com',
          sameSite: 'lax'
        }).status(200).json(user)
        
      } else {
        return res.status(401).json({ error: 'Login failed; Invalid username or password.' })
      }

    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}


const logout = (req, res) => {
  try {
    if (!req.cookies.authToken) {
      return res.status(400).json({ error: 'User is already logged out' })
    }
    res.clearCookie('authToken').status(200).json({ success: 'User logged out successfully' })
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const checkUser = async (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({ user: req.user })
    } else {
      return res.status(401).json({ error: 'User is not authenticated' })
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }
};




export { login, register, logout, checkUser }