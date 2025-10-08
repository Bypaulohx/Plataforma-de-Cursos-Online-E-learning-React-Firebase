import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from './providers/AuthProvider.jsx'

export default function App() {
  const { user, signOutUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOutUser()
    navigate('/')
  }

  return (
    <div className="min-h-screen">
      <nav className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto p-4 flex gap-3 items-center">
          <Link className="font-bold text-lg text-blue-600" to="/">E-learning</Link>
          <Link to="/courses" className="ml-2">Cursos</Link>
          <div className="flex-1" />
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="text-sm">{user.displayName || user.email}</Link>
              <button className="btn-outline" onClick={handleLogout}>Sair</button>
            </div>
          ) : (
            <Link className="btn" to="/login">Entrar</Link>
          )}
        </div>
      </nav>
      <main className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
      <footer className="text-center text-sm text-slate-500 p-6">
        © {new Date().getFullYear()} E-learning demo • React + Firebase
      </footer>
    </div>
  )
}
