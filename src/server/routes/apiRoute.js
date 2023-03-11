import express from 'express'
import { getUser, getAllTrackersOfUser } from '../controllers/userController.js'
import { createTracker, editTracker, deleteTracker, getTrackerById, addUserToTracker, getUsersOfTracker, removeUserFromTracker } from '../controllers/trackersController.js'
import { createList, getListById } from '../controllers/listsController.js'

const apiRoute = express.Router()

//Users
apiRoute.get('/users/:id?', getUser)
apiRoute.get('/users/:id?/trackers', getAllTrackersOfUser)


//Trackers
apiRoute.post('/trackers', createTracker)
apiRoute.patch('/trackers', editTracker)
apiRoute.delete('/trackers/:id?', deleteTracker)
apiRoute.get('/trackers/:id?', getTrackerById)
apiRoute.post('/trackers/users', addUserToTracker)
apiRoute.get('/trackers/:id?/users', getUsersOfTracker)
apiRoute.delete('/trackers/:id?/users/:userId?', removeUserFromTracker)


//Lists
apiRoute.post('/lists', createList)
apiRoute.get('/lists/:id?', getListById)


//Items

export default apiRoute