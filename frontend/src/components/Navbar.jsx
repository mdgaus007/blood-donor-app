import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Droplet, Menu, X, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setIsOpen(false)
  }

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Droplet className="text-red-500 h-8 w-8" />
              <span className="font-bold text-xl text-slate-800 tracking-tight">
                HemoAid
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/search"
              className="text-slate-600 hover:text-red-500 transition-colors"
            >
              Find Blood
            </Link>
            <Link
              to="/emergency"
              className="text-slate-600 hover:text-red-500 transition-colors"
            >
              Emergency
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg">
                  <User className="w-4 h-4 text-red-500" />
                  <span className="text-slate-700 font-medium">{user.name}</span>
                </div>
                <Link
                  to="/dashboard"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors shadow-sm shadow-red-200"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-slate-600 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-red-500 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors shadow-sm shadow-red-200"
                >
                  Donate Now
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/search"
              className="block px-3 py-2 text-slate-600 font-medium hover:text-red-500 hover:bg-slate-50 rounded-md"
            >
              Find Blood
            </Link>
            <Link
              to="/emergency"
              className="block px-3 py-2 text-slate-600 font-medium hover:text-red-500 hover:bg-slate-50 rounded-md"
            >
              Emergency
            </Link>
            {user ? (
              <>
                <div className="block px-3 py-2 text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-red-500" />
                    {user.name}
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-red-500 font-medium hover:bg-red-50 rounded-md"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 text-slate-600 font-medium hover:text-red-500 hover:bg-slate-50 rounded-md flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-slate-600 font-medium hover:text-red-500 hover:bg-slate-50 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-red-500 font-medium hover:bg-red-50 rounded-md"
                >
                  Donate Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
