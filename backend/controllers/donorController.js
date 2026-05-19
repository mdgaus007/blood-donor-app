import DonorProfile from '../models/DonorProfile.js'

// @desc    Create or update donor profile
// @route   POST /api/donors/profile
// @access  Private
export const setupDonorProfile = async (req, res) => {
  try {
    const {
      fullName,
      gender,
      age,
      bloodGroup,
      mobileNumber,
      city,
      state,
      address,
      lastDonationDate,
      isAvailable,
    } = req.body

    let profile = await DonorProfile.findOne({ user: req.user._id })

    if (profile) {
      // Update
      profile = await DonorProfile.findOneAndUpdate(
        { user: req.user._id },
        { $set: req.body },
        { new: true },
      )
    } else {
      // Create
      profile = await DonorProfile.create({
        user: req.user._id,
        fullName,
        gender,
        age,
        bloodGroup,
        mobileNumber,
        city,
        state,
        address,
        lastDonationDate,
        isAvailable,
      })
    }

    res.status(200).json(profile)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get user donor profile
// @route   GET /api/donors/profile
// @access  Private
export const getDonorProfile = async (req, res) => {
  try {
    const profile = await DonorProfile.findOne({ user: req.user._id })
    if (profile) {
      res.json(profile)
    } else {
      res.status(404).json({ message: 'Donor profile not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get all active donors (for search)
// @route   GET /api/donors
// @access  Public
export const getDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query
    let query = { isAvailable: true }

    if (bloodGroup) query.bloodGroup = bloodGroup
    if (city) query.city = { $regex: city, $options: 'i' }

    const donors = await DonorProfile.find(query).populate('user', 'name email')
    res.json(donors)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
