import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import Features from './components/sections/Features'
import Services from './components/sections/Services'
import Stats from './components/sections/Stats'
import About from './components/sections/About'
import CTA from './components/sections/CTA'
import Contact from './components/sections/Contact'

function App() {
  return (
    <Layout>
      <Hero />
      <Features />
      <Services />
      <Stats />
      <About />
      <CTA />
      <Contact />
    </Layout>
  )
}

export default App
