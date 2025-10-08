import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function Lesson() {
  const { courseId, lessonId } = useParams()
  const [lesson, setLesson] = useState(null)

  useEffect(() => {
    const load = async () => {
      const d = await getDoc(doc(db, 'courses', courseId, 'lessons', lessonId))
      setLesson({ id: d.id, ...d.data() })
    }
    load()
  }, [courseId, lessonId])

  if (!lesson) return <div>Carregando...</div>

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{lesson.title}</h1>
      <video className="w-full rounded-2xl" controls src={lesson.videoUrl || 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'} />
      <p className="text-slate-700">{lesson.summary}</p>
      <Link className="btn" to={`quiz`}>Fazer quiz</Link>
    </div>
  )
}
