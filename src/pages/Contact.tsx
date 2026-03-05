import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Footer from '../components/Footer'

const inquiryTypes = [
  'Technical Specifications',
  'Media & Photography',
  'Educational Partnership',
  'General Inquiry',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="pt-20 bg-jetBlack min-h-screen">
      {/* Page header */}
      <div className="relative overflow-hidden py-20 px-6 md:px-12 border-b border-white/5">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(230,57,70,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-screen-xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="hud-line w-12" />
            <span className="font-mono text-warningRed text-xs tracking-[0.3em] uppercase">
              Communications
            </span>
          </div>
          <h1 className="font-display text-jetWhite text-5xl md:text-7xl font-bold">
            Contact
          </h1>
          <p className="font-sans text-aircraftGrey mt-4 max-w-lg">
            Engage with our team for technical queries, media partnerships,
            or educational programs related to the Su-30MKI programme.
          </p>
        </motion.div>
      </div>

      {/* Contact section */}
      <section ref={sectionRef} className="section-padding">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Info column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-10"
            >
              <div>
                <div className="font-mono text-warningRed text-[10px] tracking-[0.3em] mb-4">
                  CONTACT CHANNELS
                </div>
                <div className="flex flex-col gap-6">
                  {[
                    {
                      label: 'Technical Division',
                      value: 'tech@su30mki.in',
                      detail: 'Specifications & performance data',
                    },
                    {
                      label: 'Media Relations',
                      value: 'media@su30mki.in',
                      detail: 'Photography & documentary requests',
                    },
                    {
                      label: 'Education Wing',
                      value: 'edu@su30mki.in',
                      detail: 'School & university programmes',
                    },
                  ].map(({ label, value, detail }) => (
                    <div
                      key={label}
                      className="glass-panel p-5 relative group hover:border-warningRed/30 transition-colors duration-300"
                    >
                      <div className="hud-corner hud-corner-tl" />
                      <div className="hud-corner hud-corner-br" />
                      <div className="font-mono text-aircraftGrey/50 text-[9px] tracking-[0.25em] mb-1">
                        {label}
                      </div>
                      <div className="font-display text-jetWhite text-sm font-semibold">
                        {value}
                      </div>
                      <div className="font-mono text-aircraftGrey/60 text-[10px] tracking-widest mt-1">
                        {detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coordinates block */}
              <div className="glass-panel p-6 relative">
                <div className="hud-corner hud-corner-tl" />
                <div className="hud-corner hud-corner-tr" />
                <div className="hud-corner hud-corner-bl" />
                <div className="hud-corner hud-corner-br" />
                <div className="font-mono text-warningRed text-[9px] tracking-[0.3em] mb-3">
                  OPERATIONAL HQ
                </div>
                <p className="font-mono text-aircraftGrey text-sm leading-relaxed">
                  Vayu Bhavan, New Delhi<br />
                  110 011, India<br />
                  <span className="text-[10px] opacity-60">28°37'02"N / 77°12'28"E</span>
                </p>
              </div>
            </motion.div>

            {/* Form column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {submitted ? (
                <div className="glass-panel p-10 text-center relative">
                  <div className="hud-corner hud-corner-tl" />
                  <div className="hud-corner hud-corner-tr" />
                  <div className="hud-corner hud-corner-bl" />
                  <div className="hud-corner hud-corner-br" />
                  <div className="w-2 h-2 rounded-full bg-warningRed animate-hudPulse mx-auto mb-4" />
                  <div className="font-display text-jetWhite text-2xl font-bold mb-2">
                    Transmission Received
                  </div>
                  <div className="font-mono text-aircraftGrey text-sm tracking-wider">
                    Your message has been relayed to the relevant division.
                    Expect a response within 48 flight hours.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-warningRed text-[10px] tracking-[0.25em]">
                      DESIGNATION
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bg-transparent border border-white/10 px-4 py-3 font-sans text-jetWhite text-sm placeholder:text-aircraftGrey/30 focus:outline-none focus:border-warningRed/60 transition-colors duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-warningRed text-[10px] tracking-[0.25em]">
                      SIGNAL FREQUENCY (EMAIL)
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="bg-transparent border border-white/10 px-4 py-3 font-sans text-jetWhite text-sm placeholder:text-aircraftGrey/30 focus:outline-none focus:border-warningRed/60 transition-colors duration-200"
                    />
                  </div>

                  {/* Inquiry type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-warningRed text-[10px] tracking-[0.25em]">
                      INQUIRY CLASSIFICATION
                    </label>
                    <select
                      required
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="bg-jetBlack border border-white/10 px-4 py-3 font-sans text-jetWhite text-sm focus:outline-none focus:border-warningRed/60 transition-colors duration-200 appearance-none"
                    >
                      <option value="" disabled>Select inquiry type</option>
                      {inquiryTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-warningRed text-[10px] tracking-[0.25em]">
                      TRANSMISSION
                    </label>
                    <textarea
                      placeholder="Your message..."
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="bg-transparent border border-white/10 px-4 py-3 font-sans text-jetWhite text-sm placeholder:text-aircraftGrey/30 focus:outline-none focus:border-warningRed/60 transition-colors duration-200 resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary self-start mt-2 pointer-events-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    Send Transmission
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
