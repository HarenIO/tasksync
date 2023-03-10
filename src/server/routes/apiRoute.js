import express from 'express'
import { getUser } from '../controllers/userController.js'
import { createTracker, editTracker, deleteTracker, getTrackerById, addUserToTracker } from '../controllers/trackersController.js'

const apiRoute = express.Router()

//Users
apiRoute.get('/users/:id?', getUser)


//Trackers
apiRoute.post('/trackers', createTracker)
apiRoute.patch('/trackers', editTracker)
apiRoute.delete('/trackers/:id?', deleteTracker)
apiRoute.get('/trackers/:id?', getTrackerById)
apiRoute.post('/trackers/:id?/users', addUserToTracker)


//Lists



//Items

export default apiRoute