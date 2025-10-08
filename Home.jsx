import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Aprenda online com cursos em vídeo</h1>
        <p>Plataforma de E-learning construída com React + Firebase, incluindo aulas em vídeo, quizzes e certificados automáticos.</p>
        <div className="flex gap-3">
          <Link className="btn" to="/courses">Explorar cursos</Link>
          <a className="btn-outline" href="https://firebase.google.com/" target="_blank" rel="noreferrer">Firebase</a>
        </div>
      </div>
      <div className="card">
        <h2 className="font-semibold mb-2">Como funciona?</h2>
        <ol className="list-decimal ml-6 space-y-1">
          <li>Faça login (Google ou email/senha).</li>
          <li>Escolha um curso e assista às aulas.</li>
          <li>Responda ao quiz para validar seu aprendizado.</li>
          <li>Baixe seu certificado em PDF ao concluir.</li>
        </ol>
      </div>
    </div>
  )
}
