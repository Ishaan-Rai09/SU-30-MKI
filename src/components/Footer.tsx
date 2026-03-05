import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const footerLinks = {
  Aircraft: [
    { label: 'Overview', path: '/' },
    { label: 'Specifications', path: '/specifications' },
    { label: 'Gallery', path: '/gallery' },
  ],
  Program: [
    { label: 'History', path: '/history' },
    { label: 'IAF Induction', path: '/history' },
    { label: 'HAL Production', path: '/history' },
  ],
  Contact: [
    { label: 'Get in Touch', path: '/contact' },
    { label: 'Media Requests', path: '/contact' },
    { label: 'Technical Queries', path: '/contact' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-jetBlack overflow-hidden">
      {/* Top HUD line */}
      <div className="hud-line opacity-30" />

      {/* Massive background typography */}
      <div className="relative">
        <div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-center overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-display text-jetWhite font-black leading-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(5rem, 18vw, 20rem)',
              opacity: 0.04,
              letterSpacing: '-0.04em',
              transform: 'translateY(15%)',
            }}
          >
            SU-30MKI
          </span>
        </div>

        <div className="relative z-10 section-padding pb-8">
          <div className="max-w-screen-xl mx-auto">
            {/* Top section */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Brand */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="font-display text-jetWhite font-bold text-2xl tracking-[0.2em] mb-2">
                    SU-30MKI
                  </div>
                  <div className="font-mono text-warningRed text-[10px] tracking-[0.35em] mb-6">
                    SUKHOI / HAL FLANKER-H
                  </div>
                  <p className="font-sans text-aircraftGrey text-sm leading-relaxed max-w-sm">
                    The Sukhoi Su-30MKI is India's premier multirole combat aircraft —
                    a legacy of collaborative engineering between Russia and India,
                    defining air power in the 21st century.
                  </p>

                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-warningRed animate-hudPulse" />
                    <span className="font-mono text-warningRed text-[10px] tracking-[0.25em]">
                      IAF SERVICE ACTIVE
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-3 gap-8">
                {Object.entries(footerLinks).map(([category, links], ci) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.1, duration: 0.6 }}
                  >
                    <div className="font-mono text-warningRed text-[10px] tracking-[0.25em] uppercase mb-4">
                      {category}
                    </div>
                    <ul className="flex flex-col gap-2.5">
                      {links.map(({ label, path }) => (
                        <li key={label}>
                          <Link
                            to={path}
                            className="font-sans text-aircraftGrey text-sm hover:text-jetWhite transition-colors duration-200"
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hud-line opacity-10 mb-8" />

            {/* Bottom bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="font-mono text-aircraftGrey/40 text-[10px] tracking-[0.2em]">
                © {year} SU-30MKI INTERACTIVE. EDUCATIONAL USE ONLY.
              </div>
              <div className="flex items-center gap-6">
                <span className="font-mono text-aircraftGrey/40 text-[10px] tracking-[0.2em]">
                  BUILT WITH REACT + GSAP
                </span>
                <div className="w-1 h-1 rounded-full bg-warningRed/40" />
                <span className="font-mono text-aircraftGrey/40 text-[10px] tracking-[0.2em]">
                  DEPLOYED ON NETLIFY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
