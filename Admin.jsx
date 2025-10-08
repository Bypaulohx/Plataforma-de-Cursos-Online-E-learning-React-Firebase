import React from 'react'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

// Simple demo seeding
const demoData = {
  course: {
    title: 'React + Firebase do Zero',
    description: 'Construa uma plataforma E-learning completa.',
    cover: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop'
  },
  lessons: [
    {
      id: 'introducao',
      title: 'Introdução e Setup',
      position: 1,
      summary: 'Apresentação do projeto e ferramentas.',
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      free: true
    },
    {
      id: 'react-basico',
      title: 'React Básico',
      position: 2,
      summary: 'Componentes, estado e props.',
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      free: true
    }
  ],
}

export default function Admin() {
  const seed = async () => {
    const courseId = 'react-firebase'
    await setDoc(doc(collection(db, 'courses'), courseId), demoData.course)
    for (const l of demoData.lessons) {
      await setDoc(doc(collection(db, 'courses', courseId, 'lessons'), l.id), l)
    }
    alert('Dados de exemplo criados! Vá para /courses.')
  }
  return (
    <div className="card space-y-3">
      <h1 className="text-xl font-semibold">Admin (demo)</h1>
      <p>Crie dados de demonstração em um clique.</p>
      <button className="btn" onClick={seed}>Criar dados de exemplo</button>
    </div>
  )
}
