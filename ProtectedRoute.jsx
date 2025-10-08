import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider.jsx'

export default function ProtectedRoute({ children, admin = false }) {
  const { user, loading } = useAuth()
  if (loading) return <div>Carregando...</div>
  if (!user) return <Navigate to="/login" replace />
  // Admin flag via custom claims could be checked with a callable function. For demo, allow all.
  return children
}
