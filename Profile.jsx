import React from 'react'
import { useAuth } from '../providers/AuthProvider.jsx'

export default function Profile() {
  const { user } = useAuth()
  if (!user) return null
  return (
    <div className="card">
      <h1 className="text-xl font-semibold mb-2">Perfil</h1>
      <div>Email: {user.email}</div>
      <div>Nome: {user.displayName || '-'}</div>
      <img className="w-24 h-24 rounded-full mt-3" src={user.photoURL || 'https://ui-avatars.com/api/?name=User'} />
    </div>
  )
}
