import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Specifications', path: '/specifications' },
  { label: 'History', path: '/history' },
  { label: 'Contact', path: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-panel py-3' : 'py-5'
      }`}
    >
      {/* Top micro-line */}
      <div className="hud-line absolute top-0 left-0 right-0" />

      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-jetWhite font-bold text-lg tracking-[0.2em]">
            SU-30MKI
          </span>
          <span className="font-mono text-warningRed text-[10px] tracking-[0.3em] uppercase mt-0.5">
            Flanker-H
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, path }) => {
            const isActive = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`relative font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-300 group ${
                  isActive ? 'text-warningRed' : 'text-aircraftGrey hover:text-jetWhite'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-warningRed transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/specifications" className="btn-primary text-xs">
            <span className="inline-block w-1.5 h-1.5 bg-warningRed rounded-full animate-hudPulse" />
            Explore Aircraft
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-jetWhite focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span className={`hud-line transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
            <span className={`hud-line transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`hud-line transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-panel border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="font-mono text-xs tracking-[0.15em] uppercase text-aircraftGrey hover:text-warningRed transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom micro-line */}
      <div className="hud-line absolute bottom-0 left-0 right-0 opacity-30" />
    </motion.header>
  )
}
