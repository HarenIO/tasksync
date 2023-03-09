import express from 'express'
import authRoute from './routes/authRoute.js'

const app = express()
app.use(express.json())

app.use('/auth', authRoute)



app.listen(5050, () => console.log('Running on port 5050'))