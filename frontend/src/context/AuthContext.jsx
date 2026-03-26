import { createContext, useContext, useState, useEffect } from 'react'
import { adminAPI } from '../utils/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('tfm_token')
    const savedUser = localStorage.getItem('tfm_user')
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {}
      // Verify token is still valid
      adminAPI.getMe()
        .then(res => setUser(res.data.user))
        .catch(() => logout())
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await adminAPI.login({ email, password })
    const { token, user } = res.data
    localStorage.setItem('tfm_token', token)
    localStorage.setItem('tfm_user', JSON.stringify(user))
    setUser(user)
    return user
  }

  const logout = () => {
    localStorage.removeItem('tfm_token')
    localStorage.removeItem('tfm_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
