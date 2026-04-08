import Hero from '../components/sections/Hero'
import Academy from '../components/sections/Academy'
import Features from '../components/sections/Features'
import Services from '../components/sections/Services'
import About from '../components/sections/About'
import CTA from '../components/sections/CTA'
import Contact from '../components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Academy />
      <Services />
      <Features />
      <CTA />
      <Contact />
    </>
  )
}
