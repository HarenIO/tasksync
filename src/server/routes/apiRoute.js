import express from 'express'
import { getAllTrackersOfUser } from '../controllers/userController.js'
import { createTracker, editTracker, deleteTracker, getTrackerById, addUserToTracker, getUsersOfTracker, removeUserFromTracker, getAllListsOfTracker } from '../controllers/trackersController.js'
import { createList, getListById, editList, deleteList, getAllItemsOfList } from '../controllers/listsController.js'
import { createItem, getItemById, editItem, deleteItem } from '../controllers/itemsController.js'

const apiRoute = express.Router()


//Users
apiRoute.get('/users/:id?/trackers', getAllTrackersOfUser)


//Trackers
apiRoute.post('/trackers', createTracker)
apiRoute.patch('/trackers', editTracker)
apiRoute.delete('/trackers/:id?', deleteTracker)
apiRoute.get('/trackers/:id?', getTrackerById)
apiRoute.post('/trackers/users', addUserToTracker)
apiRoute.get('/trackers/:id?/users', getUsersOfTracker)
apiRoute.delete('/trackers/:id?/users/:userId?', removeUserFromTracker)
apiRoute.get('/trackers/:id?/lists', getAllListsOfTracker)


//Lists
apiRoute.post('/lists', createList)
apiRoute.get('/lists/:id?', getListById)
apiRoute.patch('/lists', editList)
apiRoute.delete('/lists/:id?', deleteList)
apiRoute.get('/lists/:id?/items', getAllItemsOfList)


//Items
apiRoute.post('/items', createItem)
apiRoute.get('/items/:id?', getItemById)
apiRoute.patch('/items', editItem)
apiRoute.delete('/items/:id?', deleteItem)

export default apiRoute