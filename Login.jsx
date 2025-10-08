import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider.jsx'

export default function Login() {
  const { signInGoogle, signInEmail, signUpEmail } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleGoogle = async () => {
    try { await signInGoogle(); navigate('/courses') } catch(e){ setError(e.message) }
  }
  const handleEmail = async (e) => {
    e.preventDefault()
    try {
      if (isRegister) {
        await signUpEmail(name, email, password)
      } else {
        await signInEmail(email, password)
      }
      navigate('/courses')
    } catch(e){ setError(e.message) }
  }

  return (
    <div className="max-w-md mx-auto card space-y-4">
      <h1 className="text-xl font-semibold">{isRegister ? 'Criar conta' : 'Entrar'}</h1>
      <button className="btn w-full" onClick={handleGoogle}>Continuar com Google</button>
      <div className="text-center text-sm text-slate-500">ou</div>
      <form onSubmit={handleEmail} className="space-y-3">
        {isRegister && (
          <input className="w-full border rounded-xl p-2" placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} />
        )}
        <input className="w-full border rounded-xl p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full border rounded-xl p-2" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="btn w-full" type="submit">{isRegister ? 'Cadastrar' : 'Entrar'}</button>
      </form>
      <button className="btn-outline w-full" onClick={()=>setIsRegister(!isRegister)}>
        {isRegister ? 'Já tem conta? Entrar' : 'Novo aqui? Cadastre-se'}
      </button>
    </div>
  )
}
