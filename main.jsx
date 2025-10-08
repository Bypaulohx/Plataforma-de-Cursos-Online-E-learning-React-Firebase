import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './providers/AuthProvider.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Courses from './pages/Courses.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import Lesson from './pages/Lesson.jsx'
import Quiz from './pages/Quiz.jsx'
import Profile from './pages/Profile.jsx'
import Admin from './pages/Admin.jsx'
import Certificate from './pages/Certificate.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'courses', element: <Courses /> },
      { path: 'courses/:courseId', element: <CourseDetail /> },
      { path: 'courses/:courseId/lessons/:lessonId', element: (
        <ProtectedRoute>
          <Lesson />
        </ProtectedRoute>
      ) },
      { path: 'courses/:courseId/lessons/:lessonId/quiz', element: (
        <ProtectedRoute>
          <Quiz />
        </ProtectedRoute>
      ) },
      { path: 'certificate/:courseId/:lessonId', element: (
        <ProtectedRoute>
          <Certificate />
        </ProtectedRoute>
      ) },
      { path: 'profile', element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ) },
      { path: 'admin', element: (
        <ProtectedRoute admin>
          <Admin />
        </ProtectedRoute>
      ) },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
