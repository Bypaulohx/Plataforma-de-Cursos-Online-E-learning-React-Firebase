import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useAuth } from '../providers/AuthProvider.jsx'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function Certificate() {
  const { user } = useAuth()
  const { courseId, lessonId } = useParams()
  const [params] = useSearchParams()

  useEffect(() => {
    const generate = async () => {
      const cDoc = await getDoc(doc(db, 'courses', courseId))
      const lDoc = await getDoc(doc(db, 'courses', courseId, 'lessons', lessonId))
      const course = cDoc.data()
      const lesson = lDoc.data()
      const name = user?.displayName || user?.email || 'Aluno'
      const score = params.get('score') || '100'
      const date = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
      const docPdf = new jsPDF('landscape', 'pt', 'a4')
      docPdf.setFontSize(26)
      docPdf.text('CERTIFICADO DE CONCLUSÃO', 297, 100, { align: 'center' })
      docPdf.setFontSize(16)
      docPdf.text(`Conferimos a ${name}`, 297, 140, { align: 'center' })
      docPdf.text(`a conclusão da aula "${lesson?.title}" do curso "${course?.title}".`, 297, 165, { align: 'center' })
      docPdf.text(`Aproveitamento: ${score}%  •  Data: ${date}`, 297, 190, { align: 'center' })
      docPdf.setFontSize(10)
      docPdf.text('Plataforma E-learning (React + Firebase)', 297, 530, { align: 'center' })
      docPdf.save(`Certificado-${courseId}-${lessonId}.pdf`)
    }
    generate()
  }, [user, courseId, lessonId, params])

  return <div className="card">Gerando certificado...</div>
}
