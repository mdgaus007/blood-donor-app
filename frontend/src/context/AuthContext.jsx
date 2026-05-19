import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true;

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Make axios include cookies
  // axios.defaults.withCredentials = true

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/auth/profile`,
        )
        setUser(data)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  const login = async (email, password) => {
    const { data } = await axios.post(`${API_URL}/api/auth/profile`, {
      email,
      password,
    })
    setUser(data)
    return data
  }

  const register = async (name, email, password) => {
    const { data } = await axios.post(
      `${API_URL}/api/auth/register`,
      {
        name,
        email,
        password,
      },
    )
    setUser(data)
    return data
  }

  const logout = async () => {
    await axios.post(`${API_URL}/api/auth/logout`)
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
