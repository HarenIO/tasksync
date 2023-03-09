import express from 'express'
import { getUser } from '../controllers/userController.js'

const apiRoute = express.Router()

//Users
apiRoute.get('/users/:id?', getUser)


//Trackers



//Lists



//Items

export default apiRoute