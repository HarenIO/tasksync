import express from 'express'
import authRoute from './routes/authRoute.js'
import apiRoute from './routes/apiRoute.js'
import checkAuth from './middleware/checkAuth.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())


app.use('/auth', authRoute)
app.use('/api', checkAuth, apiRoute)



app.listen(5050, () => console.log('Running on port 5050'))