import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const q = query(collection(db, 'courses'), orderBy('title'))
        const snap = await getDocs(q)
        setCourses(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  if (loading) return <div>Carregando cursos...</div>

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {courses.map(c => (
        <Link key={c.id} to={`/courses/${c.id}`} className="card hover:shadow-md transition">
          <img src={c.cover || 'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop'} alt="" className="rounded-xl mb-3 h-36 w-full object-cover" />
          <h3 className="font-semibold">{c.title}</h3>
          <p className="text-sm text-slate-600 line-clamp-2">{c.description}</p>
        </Link>
      ))}
      {courses.length === 0 && (
        <div className="col-span-full text-slate-600">
          Nenhum curso cadastrado. Visite /admin para criar dados de exemplo.
        </div>
      )}
    </div>
  )
}
