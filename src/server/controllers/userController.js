import { idSchema } from "../utils/validation.js"
import userModel from '../models/user.js'

const getAllTrackersOfUser = async (req, res) => {
  try {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      if (value.id !== req.user.id) {
        return res.status(403).json({ error: 'You dont have the required permissions to access that resource' })
      }
      const result = await userModel.getAllTrackersOfUser(value.id)
      if (!result) {
        return res.status(404).json({ error: 'Failed to get trackers' })
      }
      if (result.length === 0) {
        return res.status(204).json({ error: 'There are no trackers to view' })
      }
      return res.status(200).json(result)
    }
  }
  catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

export { getAllTrackersOfUser }