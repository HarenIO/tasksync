import { registerSchema } from '../utils/validation.js'
import authModel from '../models/auth.js'
import argon2 from 'argon2'

const register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      res.status(400).json({ error: errorMessage })
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
const login = (req, res) => {
  res.send('login')
}


const logout = (req, res) => {
  res.send('logout')
}


export { login, register, logout }