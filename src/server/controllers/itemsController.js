import { createItemSchema, idSchema } from "../utils/validation.js"
import listsModel from '../models/lists.js'
import itemsModel from "../models/items.js"
import userModel from "../models/user.js"


//Kollar alla trackers som req.user är med i
const checkTrackerPermissions = async (user, listId) => {
  const trackers = await userModel.getAllTrackersOfUser(user)
  const list = await listsModel.getListById(listId)
  if(!list) return null
  const hasPermission = trackers.some(tracker => tracker.tracker_id === list.tracker_id)
  return hasPermission ? list : null
}

const createItem = async (req, res) => {
  try {
    const { error, value } = createItemSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      
      const hasPermission = await checkTrackerPermissions(req.user.id, value.list_id) 
      
      if(!hasPermission){
        return res.status(400).json({ error: 'You dont have the required permissions to create that item' })
      }

      const result = await itemsModel.createItem(value)
      if (result.affectedRows === 0) {
        return res.status(400).json({ error: 'Failed to create item' })
      }
      return res.status(200).json({ success: 'Item created!' })
    }
  } catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  }
}





const getListById = async (req, res) => {
  /* try {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const result = await checkTrackerPermissions(req.user.id, value.id)
      if(!result){
        return res.status(400).json({ error: 'You dont have the required permissions to view that list' })
      }
      return res.status(200).json(result)
    }
  } catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  } */
}

const editList = async (req, res) => {
  /* try {
    const { error, value } = editListSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const hasPermission = await checkTrackerPermissions(req.user.id, value.list_id)
      
      if(!hasPermission){
        return res.status(400).json({ error: 'You dont have the required permissions to edit that list' })
      }

      const result = await listsModel.editList(value)
      if (result.changedRows === 0) {
        return res.status(400).json({ error: 'List remains unchanged' })
      }

      return res.status(200).json({ success: 'List has been updated' })
    }
  } catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  } */
}

const deleteList = async (req, res) => {
  /* try {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      
      const hasPermission = await checkTrackerPermissions(req.user.id, value.id)
      
      if(!hasPermission){
        return res.status(400).json({ error: 'You dont have the required permissions to edit that list' })
      }

      const result = await listsModel.deleteList(value.id)
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Failed to delete tracker' })
      }
      return res.status(200).json({ success: 'List deleted' })
    }
  } catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  } */
}


export { createItem }