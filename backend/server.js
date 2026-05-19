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


const allowedOrigins = [
  'http://localhost:5173',
  'https://blood-donor-app-nine.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean)

// Connect Database
connectDB()

const app = express()

// Enable trust proxy when running behind a proxy (e.g., Render, Heroku)
if (process.env.NODE_ENV === 'production' || process.env.TRUST_PROXY === 'true') {
  app.set('trust proxy', 1)
}

// Proper CORS
app.use(
  cors({
    origin: allowedOrigins,
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