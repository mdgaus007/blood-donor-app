import jwt from 'jsonwebtoken'

const generateToken = (req, res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  // Determine whether the cookie should be secure.
  // Use secure cookies only when the request is received over HTTPS or in production behind a proxy.
  const isSecureRequest = req.secure || req.headers['x-forwarded-proto'] === 'https' || process.env.NODE_ENV === 'production'

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: isSecureRequest,
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
}

export default generateToken
