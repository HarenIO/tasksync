import { createListSchema, idSchema, editListSchema } from "../utils/validation.js"
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
        return res.status(403).json({ error: 'You do not have the required permissions for this operation.' })
      }
      const result = await listsModel.createList(value)
      if (result.affectedRows === 0) {
        return res.status(400).json({ error: 'Failed to create list' })
      }
      return res.status(200).json({ success: 'List created!' })
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}


//Kollar alla trackers som req.user är med i
const checkTrackerPermissions = async (user, listId) => {
  const trackers = await userModel.getAllTrackersOfUser(user)
  const list = await listsModel.getListById(listId)
  if (!list) return null
  const hasPermission = trackers.some(tracker => tracker.tracker_id === list.tracker_id)
  return hasPermission ? list : null
}


const getListById = async (req, res) => {
  try {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const result = await checkTrackerPermissions(req.user.id, value.id)
      if (!result) {
        return res.status(403).json({ error: 'You dont have the required permissions to view that list' })
      }
      return res.status(200).json(result)
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const editList = async (req, res) => {
  try {
    const { error, value } = editListSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const hasPermission = await checkTrackerPermissions(req.user.id, value.list_id)

      if (!hasPermission) {
        return res.status(403).json({ error: 'You dont have the required permissions to edit that list' })
      }

      const result = await listsModel.editList(value)
      if (result.changedRows === 0) {
        return res.status(400).json({ error: 'List remains unchanged' })
      }

      return res.status(200).json({ success: 'List has been updated' })
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const deleteList = async (req, res) => {
  try {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {

      const hasPermission = await checkTrackerPermissions(req.user.id, value.id)

      if (!hasPermission) {
        return res.status(403).json({ error: 'You dont have the required permissions to delete that list' })
      }

      const result = await listsModel.deleteList(value.id)
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Failed to delete list' })
      }
      return res.status(200).json({ success: 'List deleted' })
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const getAllItemsOfList = async (req, res) => {
  try {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {

      const hasPermission = await checkTrackerPermissions(req.user.id, value.id)

      if (!hasPermission) {
        return res.status(403).json({ error: 'You dont have the required permissions to view that item' })
      }

      const result = await listsModel.getAllItemsOfList(value.id)

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Failed to get items' })
      }
      return res.status(200).json(result)
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}


export { createList, getListById, editList, deleteList, getAllItemsOfList }