import mongoose from 'mongoose'

const bloodRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    patientName: { type: String, required: true },
    bloodGroupRequired: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
    },
    unitsRequired: { type: Number, required: true },
    urgency: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'High',
    },
    hospitalName: { type: String, required: true },
    hospitalAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    contactNumber: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Fulfilled', 'Expired'],
      default: 'Pending',
    },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
)

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema)
export default BloodRequest
