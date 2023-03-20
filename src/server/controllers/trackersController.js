import { createTrackerSchema, editTrackerSchema, idSchema, removeUserSchema, addUserToTrackerScheme } from "../utils/validation.js"

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
      if (result.affectedRows === 0) {
        return res.status(400).json({ error: 'Failed to create tracker' })
      }
      return res.status(200).json({ success: 'Tracker created!' })
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
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
      if (result.changedRows === 0) {
        return res.status(400).json({ error: 'Failed to edit tracker' })
      }
      return res.status(200).json({ success: 'Tracker edited' })
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const deleteTracker = async (req, res) => {
  try {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const { id } = value
      const tracker = {
        id,
        user_id: req.user.id
      }
      const result = await trackersModel.deleteTracker(tracker)
      if (result.affectedRows === 0 || result.error) {
        return res.status(result.status || 404).json({ error: 'Failed to delete tracker' });
      }
      return res.status(200).json({ success: 'Tracker deleted' })
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const getTrackerById = async (req, res) => {
  try {
    const { error, value } = idSchema.validate(req.params)

    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const { id } = value
      const tracker = {
        id,
        authedUser: req.user.id
      }
      const result = await trackersModel.getTrackerById(tracker)
      if (!result) {
        return res.status(404).json({ error: 'Failed to get tracker' })
      }
      return res.status(200).json(result)
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const addUserToTracker = async (req, res) => {
  try {
    const { error, value } = addUserToTrackerScheme.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    } else {
      const tracker = {
        ...value,
        reqUser: req.user.id
      };
      const result = await trackersModel.addUserToTracker(tracker);
      if (!result) {
        return res.status(400).json({ error: 'Failed to add user to tracker' });
      }
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json({ success: 'User has been added to tracker' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

const getUsersOfTracker = async (req, res) => {
  try {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const { id } = value
      const tracker = {
        id,
        user_id: req.user.id
      }
      const result = await trackersModel.getUsersOfTracker(tracker)
      if (!result) {
        return res.status(404).json({ error: 'Failed to get users' })
      }
      if (result.length === 0) {
        return res.status(403).json({ error: 'You dont have the required permission to view that tracker' })
      }
      return res.status(200).json(result)
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const removeUserFromTracker = async (req, res) => {
  try {
    const { error, value } = removeUserSchema.validate(req.params)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      const data = {
        ...value,
        authedUser: req.user.id
      }
      const requestedTracker = await trackersModel.getTrackerById(data)

      if (!requestedTracker) {
        return res.status(403).json({ error: 'You do not have permission to remove users from that tracker' })
      }

      if (requestedTracker.owner_id === value.userId) {
        return res.status(403).json({ error: 'Tracker owner can not be removed.' })
      }

      const result = await trackersModel.removeUserFromTracker(data)
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Failed to remove user from tracker' })
      }
      return res.status(200).json({ success: 'User has been removed from tracker' })
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

const getAllListsOfTracker = async (req, res) => {
  try {
    const { error, value } = idSchema.validate(req.params)
    if (error) {
      const errorMessage = error.details[0].message
      return res.status(400).json({ error: errorMessage })
    }
    else {
      const trackerInfo = {
        ...value,
        user_id: req.user.id
      }
      const trackerUsers = await trackersModel.getUsersOfTracker(trackerInfo)

      if (trackerUsers.length === 0) {
        return res.status(403).json({ error: 'You dont have the required permission to view that tracker' })
      }

      const result = await trackersModel.getListsOfTracker(value.id)
      if (!result) {
        return res.status(404).json({ error: 'Failed to get lists' })
      }
      if (result.length === 0) {
        return res.status(204).json({ error: 'No lists to display' })
      }
      return res.status(200).json(result)
    }
  }
  catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
}


export { createTracker, editTracker, deleteTracker, getTrackerById, addUserToTracker, getUsersOfTracker, removeUserFromTracker, getAllListsOfTracker }