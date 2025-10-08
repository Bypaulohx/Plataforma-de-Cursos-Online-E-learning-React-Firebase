import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function Quiz() {
  const { courseId, lessonId } = useParams()
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      const d = await getDoc(doc(db, 'courses', courseId, 'lessons', lessonId))
      const qref = await getDoc(doc(db, 'quizzes', `${courseId}__${lessonId}`))
      const lesson = d.data()
      const data = qref.exists() ? qref.data() : {
        title: lesson.title,
        passing: 70,
        questions: [
          { q: 'Exemplo: React é uma biblioteca ou framework?', options: ['Biblioteca', 'Framework', 'Linguagem'], a: 0 },
          { q: 'Exemplo: Qual serviço do Firebase armazena dados NoSQL?', options: ['Realtime DB', 'Firestore', 'Storage'], a: 1 },
          { q: 'Exemplo: Qual extensão de arquivo JSX compila para JS?', options: ['.jsx', '.ts', '.json'], a: 0 },
        ]
      }
      setQuiz(data)
    }
    load()
  }, [courseId, lessonId])

  const submit = (e) => {
    e.preventDefault()
    if (!quiz) return
    let correct = 0
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.a) correct++
    })
    const percent = Math.round((correct / quiz.questions.length) * 100)
    setScore(percent)
  }

  if (!quiz) return <div>Carregando quiz...</div>

  const passed = score !== null && score >= (quiz.passing || 70)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Quiz • {quiz.title}</h1>
      {score === null ? (
        <form onSubmit={submit} className="space-y-3">
          {quiz.questions.map((q, idx) => (
            <div key={idx} className="card">
              <div className="font-medium mb-2">{idx+1}. {q.q}</div>
              <div className="space-y-2">
                {q.options.map((opt, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input type="radio" name={`q${idx}`} onChange={()=>setAnswers({...answers, [idx]: i})} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button className="btn">Enviar</button>
        </form>
      ) : (
        <div className="card space-y-3">
          <div>Sua nota: <b>{score}%</b> • Mínimo para aprovação: {quiz.passing || 70}%</div>
          {passed ? (
            <div className="space-y-2">
              <div className="text-green-700 font-medium">Parabéns, você foi aprovado!</div>
              <button className="btn" onClick={()=>navigate(`/certificate/${courseId}/${lessonId}?score=${score}`)}>Baixar certificado</button>
            </div>
          ) : (
            <div className="text-red-700">Você não atingiu a nota mínima. Tente novamente.</div>
          )}
          <Link className="btn-outline" to={`/courses/${courseId}/lessons/${lessonId}`}>Voltar à aula</Link>
        </div>
      )}
    </div>
  )
}
