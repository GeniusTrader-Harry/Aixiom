import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CoursesPage from './pages/CoursesPage'
import CourseCategoryPage from './pages/CourseCategoryPage'
import MentoringPage from './pages/MentoringPage'
import ArticlesPage from './pages/ArticlesPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import AiChatPage from './pages/AiChatPage'
import ResourcesPage from './pages/ResourcesPage'
import DashboardPage from './pages/DashboardPage'
import TeacherPage from './pages/TeacherPage'
import { LanguageProvider } from './context/LanguageContext'
import { CurrencyProvider } from './context/CurrencyContext'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <LanguageProvider>
    <CurrencyProvider>
    <AuthProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:category" element={<CourseCategoryPage />} />
          <Route path="/aixiomeducation" element={<MentoringPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/ai-chat" element={<AiChatPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </AuthProvider>
    </CurrencyProvider>
    </LanguageProvider>
  )
}

export default App
