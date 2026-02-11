import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import MentoringPage from './pages/MentoringPage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/mentoring" element={<MentoringPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
