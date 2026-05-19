import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Stats from './components/Stats'
import Stack from './components/Stack'
import Experience from './components/Experience'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        {/* Full-viewport hero with Three.js neural network */}
        <Hero />

        {/* Tech marquee */}
        <Marquee />

        {/* Stats */}
        <Stats />

        {/* Tech stack grid */}
        <Stack />

        {/* Experience timeline */}
        <Experience />

        {/* Projects grid with real images */}
        <Projects />

        {/* About + facts */}
        <About />

        {/* Contact CTA */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
