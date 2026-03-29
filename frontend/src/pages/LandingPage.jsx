import React from 'react'
import Navbar from '../components/HomePage/Navbar'
import Hero from '../components/HomePage/Hero'
import Contact from '../components/HomePage/Contact'
import Pricing from '../components/HomePage/Pricing'
import About from '../components/HomePage/About'
import Features from '../components/HomePage/Features'
import Footer from '../components/HomePage/Footer'

const LandingPage = () => {
  return (
    <div className="bg-black text-white">
      <Navbar />

      <section id="home">
        <Hero/>
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="aboutus">
        <About />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </div>
  )
}

export default LandingPage