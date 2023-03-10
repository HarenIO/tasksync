import { createTrackerSchema, editTrackerSchema, idSchema, addUserToTrackerScheme } from "../utils/validation.js"

import trackersModel from '../models/trackers.js'

const createTracker = async (req, res) => {
  try {
    const { error, value } = createTrackerSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const tracker = {
        ...value,
        user_id: req.user.id
      }
      const result = await trackersModel.createTracker(tracker)
      if(result.affectedRows === 0){
        return res.status(400).json({success: 'Failed to create tracker'})
      }
      return res.status(200).json({success: 'Tracker created!'})
    }
  } catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  }
}

const editTracker = async (req, res) => {
  try {
    const { error, value } = editTrackerSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const tracker = {
        ...value,
        user_id: req.user.id
      }
      const result = await trackersModel.editTracker(tracker)
      if(result.changedRows === 0){
        return res.status(400).json({success: 'Failed to edit tracker'})
      }
      return res.status(200).json({success: 'Tracker edited'})
    }
  } catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  }
}

const deleteTracker = async (req, res) => {
  try {
    const { error, value } = idSchema.validate(req.params)
    // const { error, value } = deleteTrackerSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const {id} = value
      const tracker = {
        id,
        user_id: req.user.id
      }
      const result = await trackersModel.deleteTracker(tracker)
      if(result.affectedRows === 0){
        return res.status(404).json({success: 'Failed to delete tracker'})
      }
      return res.status(200).json({success: 'Tracker deleted'})
    }
  } catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  }
}

const getTrackerById = async (req, res) => {
  try {
    const { error, value } = idSchema.validate(req.params)
    // const { error, value } = deleteTrackerSchema.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const {id} = value
      const tracker = {
        id,
        user_id: req.user.id
      }
      const result = await trackersModel.getTrackerById(tracker)
      if(!result){
        return res.status(404).json({success: 'Failed to get tracker'})
      }
      return res.status(200).json(result)
    }
  } catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  }
}

const addUserToTracker = async (req, res) => {
  try {
    const { error, value } = addUserToTrackerScheme.validate(req.body)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const tracker = {
        ...value,
        owner_id: req.user.id
      }
      const result = await trackersModel.addUserToTracker(tracker)
      if(!result){
        return res.status(404).json({error: 'Failed to add user to tracker'})
      }
      if(result.error){
        return res.status(404).json({error: result.error})
      }
      return res.status(200).json({success: 'User has been added to tracker'})
    }
  } catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  }
}


export { createTracker, editTracker, deleteTracker, getTrackerById, addUserToTracker }