import mongoose from 'mongoose'

const donorProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    age: { type: Number, required: true, min: 18 },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
    },
    mobileNumber: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    lastDonationDate: { type: Date },
    isAvailable: { type: Boolean, default: true },
    profilePhoto: { type: String, default: '' },
  },
  { timestamps: true },
)

const DonorProfile = mongoose.model('DonorProfile', donorProfileSchema)
export default DonorProfile
