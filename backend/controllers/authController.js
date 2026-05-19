import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({ name, email, password })

    if (user) {
      const token = generateToken(req, res, user._id)
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(req, res, user._id)
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      })
    }

    res.status(401).json({ message: 'Invalid email or password' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' })
}

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}