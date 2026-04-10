import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CoursesPage from './pages/CoursesPage'
import MentoringPage from './pages/MentoringPage'
import ArticlesPage from './pages/ArticlesPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import AiChatPage from './pages/AiChatPage'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  return (
    <LanguageProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/aixiomeducation" element={<MentoringPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
          <Route path="/ai-chat" element={<AiChatPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
