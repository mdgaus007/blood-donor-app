import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from '../backend/config/db.js'
import User from '../backend/models/User.js'
import DonorProfile from '../backend/models/DonorProfile.js'
import BloodRequest from '../backend/models/BloodRequest.js'

dotenv.config({ path: '../backend/.env' })

connectDB()

const importData = async () => {
  try {
    await DonorProfile.deleteMany()
    await BloodRequest.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@bloodlife.com',
        password: 'password123',
        role: 'admin',
      },
      { name: 'John Doe', email: 'john@example.com', password: 'password123' },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
      },
      {
        name: 'Sarah Lee',
        email: 'sarah@example.com',
        password: 'password123',
      },
    ])

    const adminUser = createdUsers[0]._id
    const user1 = createdUsers[1]._id
    const user2 = createdUsers[2]._id
    const user3 = createdUsers[3]._id

    await DonorProfile.insertMany([
      {
        user: user1,
        fullName: 'John Doe',
        gender: 'Male',
        age: 28,
        bloodGroup: 'O+',
        mobileNumber: '9876543210',
        city: 'Mumbai',
        state: 'MH',
        address: '123 Andheri W',
        isAvailable: true,
      },
      {
        user: user2,
        fullName: 'Jane Smith',
        gender: 'Female',
        age: 32,
        bloodGroup: 'A-',
        mobileNumber: '8765432109',
        city: 'Delhi',
        state: 'DL',
        address: '45 Connaught Place',
        isAvailable: true,
      },
      {
        user: user3,
        fullName: 'Sarah Lee',
        gender: 'Female',
        age: 25,
        bloodGroup: 'B+',
        mobileNumber: '7654321098',
        city: 'Mumbai',
        state: 'MH',
        address: 'Bandra',
        isAvailable: true,
      },
    ])

    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000)

    await BloodRequest.insertMany([
      {
        user: user1,
        patientName: 'Michael Scott',
        bloodGroupRequired: 'AB+',
        unitsRequired: 2,
        urgency: 'Critical',
        hospitalName: 'Lilavati Hospital',
        hospitalAddress: 'Bandra West',
        city: 'Mumbai',
        state: 'MH',
        contactNumber: '9998887776',
        status: 'Pending',
        expiresAt,
      },
      {
        user: adminUser,
        patientName: 'Emily Clarke',
        bloodGroupRequired: 'O-',
        unitsRequired: 1,
        urgency: 'High',
        hospitalName: 'Apollo Hospital',
        hospitalAddress: 'New Delhi',
        city: 'Delhi',
        state: 'DL',
        contactNumber: '8887776665',
        status: 'Pending',
        expiresAt,
      },
    ])

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`Error: ${error}`)
    process.exit(1)
  }
}

importData()
