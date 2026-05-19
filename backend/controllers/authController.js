import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    console.log('REGISTER BODY:', req.body)
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({
      name,
      email,
      password,
    })

    if (user) {
      generateToken(res, user._id)
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    console.error('REGISTER ERROR:', error)
    console.error(error.stack)
    res.status(500).json({ message: error.message })
  }
}

// // @desc    Auth user & get token
// // @route   POST /api/auth/login
// // @access  Public
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body

//     const user = await User.findOne({ email })

//     if (user && (await user.matchPassword(password))) {
//       generateToken(res, user._id)
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       })
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' })
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    console.log("LOGIN BODY:", req.body)

    const user = await User.findOne({ email })

    console.log("USER FOUND:", user)

    if (user) {
      const isMatch = await user.matchPassword(password)
      console.log("PASSWORD MATCH:", isMatch)

      if (isMatch) {
        generateToken(res, user._id)

        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        })
      }
    }

    res.status(401).json({ message: 'Invalid email or password' })

  } catch (error) {
    console.error('LOGIN ERROR:', error)
    console.error(error.stack)
    res.status(500).json({ message: error.message })
  }
}





// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'Logged out successfully' })
}

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
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
