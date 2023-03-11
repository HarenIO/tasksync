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

const getAllTrackersOfUser = async (req, res) => {
  try {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      if (value.id !== req.user.id) {
        return res.status(404).json({ error: 'You dont have the required permissions to view that tracker' })
      }
      const result = await userModel.getAllTrackersOfUser(value.id)
      if (!result) {
        return res.status(404).json({ error: 'Failed to get trackers' })
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'You dont have the required permission to view that tracker' })
      }
      return res.status(200).json(result)
    }
  }
  catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  }
}

export { getUser, getAllTrackersOfUser }