import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import connectDB from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import donorRoutes from './routes/donorRoutes.js'
import requestRoutes from './routes/requestRoutes.js'

dotenv.config()

// Connect Database
connectDB()

const app = express()

// Proper CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://blood-donor-app-nine.vercel.app'
    ],
    credentials: true,
  })
)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/donors', donorRoutes)
app.use('/api/requests', requestRoutes)

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...')
})

// Server
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})