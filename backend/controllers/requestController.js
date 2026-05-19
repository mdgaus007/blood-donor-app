import BloodRequest from '../models/BloodRequest.js'

// @desc    Create a new blood request
// @route   POST /api/requests
// @access  Private
export const createRequest = async (req, res) => {
  try {
    const {
      patientName,
      bloodGroupRequired,
      unitsRequired,
      urgency,
      hospitalName,
      hospitalAddress,
      city,
      state,
      contactNumber,
    } = req.body

    // Automatically set expiration to 48 hours from now
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000)

    const request = await BloodRequest.create({
      user: req.user._id,
      patientName,
      bloodGroupRequired,
      unitsRequired,
      urgency,
      hospitalName,
      hospitalAddress,
      city,
      state,
      contactNumber,
      expiresAt,
    })

    res.status(201).json(request)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get all active emergency requests
// @route   GET /api/requests
// @access  Public
export const getRequests = async (req, res) => {
  try {
    // Fetch only pending requests that haven't expired
    const requests = await BloodRequest.find({
      status: 'Pending',
      expiresAt: { $gt: new Date() },
    })
      .populate('user', 'name')
      .sort({ createdAt: -1 })

    res.json(requests)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
