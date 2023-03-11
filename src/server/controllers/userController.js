import { idSchema } from "../utils/validation.js"
import userModel from '../models/user.js'

const getUser = async (req, res) => {
  try {
    //0. Validera id parameter
    //todo: lägg till kontroll av auth
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const userId = value.id
      const user = await userModel.getUserById(userId)
      return res.status(200).json(user)
    }

  } catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  }
}

export { getUser }