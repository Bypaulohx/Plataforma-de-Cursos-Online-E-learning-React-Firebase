import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

export default function CourseDetail() {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])

  useEffect(() => {
    const load = async () => {
      const d = await getDoc(doc(db, 'courses', courseId))
      setCourse({ id: d.id, ...d.data() })
      const q = query(collection(db, 'courses', courseId, 'lessons'), orderBy('position'))
      const l = await getDocs(q)
      setLessons(l.docs.map(x => ({ id: x.id, ...x.data() })))
    }
    load()
  }, [courseId])

  if (!course) return <div>Carregando...</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <img src={course.cover || 'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop'} className="w-28 h-28 object-cover rounded-xl" />
        <div>
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-slate-600">{course.description}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {lessons.map(lesson => (
          <Link key={lesson.id} to={`lessons/${lesson.id}`} className="card">
            <div className="font-medium">{lesson.title}</div>
            <div className="text-sm text-slate-600">{lesson.duration || '10:00'} • {lesson.free ? 'Gratis' : 'Para inscritos'}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
