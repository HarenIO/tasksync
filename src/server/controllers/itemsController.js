import { createItemSchema, idSchema, editItemSchema } from "../utils/validation.js"
import listsModel from '../models/lists.js'
import itemsModel from "../models/items.js"
import userModel from "../models/user.js"


//Kollar alla trackers som req.user är med i
const checkTrackerPermissions = async (user, listId) => {
  const trackers = await userModel.getAllTrackersOfUser(user)
  const list = await listsModel.getListById(listId)
  if (!list) return null
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

      if (!hasPermission) {
        return res.status(400).json({ error: 'You dont have the required permissions to create that item' })
      }

      const result = await itemsModel.createItem(value)
      if (result.affectedRows === 0) {
        return res.status(500).json({ error: 'Failed to create item' })
      }
      return res.status(200).json({ success: 'Item created!' })
    }
  } catch (error) {
    return res.status(503).json({ error: `Error: ${error.message}` })
  }
}

const getItemById = async (req, res) => {
  try {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {

      const listResult = await itemsModel.getListId(value.id)

      if (!listResult) {
        return res.status(400).json({ error: 'You dont have the required permissions to access that item' });
      }
      const { list_id } = listResult

      const hasPermission = await checkTrackerPermissions(req.user.id, list_id)
      if (!hasPermission) {
        return res.status(400).json({ error: 'You dont have the required permissions to view that item' })
      }
      const result = await itemsModel.getItemById(value.id)
      if (!result) {
        return res.status(404).json({ error: 'Failed to get item' });
      }
      return res.status(200).json(result)
    }
  } catch (error) {
    return res.status(503).json({ error: `Error: ${error.message}` })
  }
}

const editItem = async (req, res) => {
  try {
    const { error, value } = editItemSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const listResult = await itemsModel.getListId(value.id)
      if (!listResult) {
        return res.status(400).json({ error: 'You dont have the required permissions to edit that item' });
      }
      const { list_id } = listResult
      const hasPermission = await checkTrackerPermissions(req.user.id, list_id)
      if (!hasPermission) {
        return res.status(400).json({ error: 'You dont have the required permissions to view that item' })
      }
      const result = await itemsModel.editItem(value)
      if (result.changedRows === 0) {
        return res.status(404).json({ error: 'Item remains unchanged or not found' });
      }
      return res.status(200).json({ success: 'Item has been updated' })
    }
  } catch (error) {
    return res.status(503).json({ error: `Error: ${error.message}` })
  }
}

const deleteItem = async (req, res) => {
  try {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {

      const listResult = await itemsModel.getListId(value.id)

      if (!listResult) {
        return res.status(400).json({ error: 'You dont have the required permissions to delete that item' });
      }
      const { list_id } = listResult

      const hasPermission = await checkTrackerPermissions(req.user.id, list_id)
      if (!hasPermission) {
        return res.status(400).json({ error: 'You dont have the required permissions to delete that item' })
      }

      const result = await itemsModel.deleteItem(value.id)

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Failed to delete item' })
      }
      return res.status(200).json({ success: 'Item deleted' })
    }
  } catch (error) {
    return res.status(503).json({ error: `Error: ${error.message}` })
  }
}


export { createItem, getItemById, editItem, deleteItem }