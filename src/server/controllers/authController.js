import { registerSchema, loginSchema } from '../utils/validation.js'
import authModel from '../models/auth.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: '../config/.env' })

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS, { expiresIn: '20m' })
}

const register = async (req, res) => {
  try {
    //0. Validera input
    const { error, value } = registerSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const { username, password } = value

      //1. Kolla ifall användarnamnet är upptaget
      const userExists = await authModel.checkUserExists(username)

      if (userExists) {
        return res.status(409).json({ error: 'Username taken' })
      }

      //2. Hasha lösenordet & Skapa användare
      const hashedPassword = await argon2.hash(password)
      authModel.registerUser({ username, hashedPassword })
      return res.status(201).json({ success: 'User successfully registered' })
    }
  }
  catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  }
}


const login = async (req, res) => {
  try {
    //0. Validera input
    const { error, value } = loginSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const { username, password } = value

      //1. Kolla ifall användaren finns i databasen
      const userExists = await authModel.checkUserExists(username)
      if (!userExists) {
        return res.status(409).json({ error: 'Incorrect login details' })
      }

      //2. Jämför lösenorden
      const userDetails = await authModel.loginUser(value)
      //Exkluderar password från objektet med ESNext syntax
      const user = (({ password, ...userDetails }) => userDetails)(userDetails)


      if (await argon2.verify(userDetails.password, password)) {
        const token = generateAccessToken(user)
        return res.cookie('authToken', token, {
          httpOnly: true,
          sameSite: 'none'
        }).status(200).json({ message: 'Successful login' })
      } else {
        return res.status(409).json({ error: 'Incorrect login details' })
      }

    }
  } catch (err) {
    return res.status(503).json({ error: 'Something went wrong' })
  }
}


const logout = (req, res) => {
  res.send('logout')
}


export { login, register, logout }