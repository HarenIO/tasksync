import { createListSchema, idSchema } from "../utils/validation.js"
import listsModel from '../models/lists.js'
import trackersModel from "../models/trackers.js"
import userModel from "../models/user.js"



const createList = async (req, res) => {
  try {
    const { error, value } = createListSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const trackerInfo = {
        id: value.tracker_id,
        user_id: req.user.id
      }
      const trackerUsers = await trackersModel.getUsersOfTracker(trackerInfo)
      if (!trackerUsers) {
        return res.status(404).json({ error: 'Failed to get users' })
      }
      if (trackerUsers.length === 0) {
        return res.status(404).json({ error: 'You dont have the required permission to create that list' })
      }
      const result = await listsModel.createList(value)
      if (result.affectedRows === 0) {
        return res.status(400).json({ error: 'Failed to create list' })
      }
      return res.status(200).json({ success: 'List created!' })
    }
  } catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  }
}


//Kollar alla trackers som req.user är med i
const checkTrackerPermissions = async (user, listId) => {
  const trackers = await userModel.getAllTrackersOfUser(user)
  const list = await listsModel.getListById(listId)
  if(!list) return false
  return trackers.some(tracker => tracker.tracker_id === list.tracker_id)
}


const getListById = async (req, res) => {
  try {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const authorized = await checkTrackerPermissions(req.user.id, value.id)
      if(!authorized){
        return res.status(400).json({ error: 'You dont have permission to view that list' })
      }
      const result = await listsModel.getListById(value.id)
      if(!result || result.length === 0){
        return res.status(400).json({ error: 'List not found' })
      }
      return res.status(400).json(result)
    }
  } catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  }
}

export { createList, getListById }