import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const timeline = [
  {
    year: '1977',
    label: 'Sukhoi OKB Origins',
    heading: 'Design Bureau',
    description:
      'The Sukhoi Design Bureau, founded by Pavel Sukhoi, begins work on a next-generation air superiority fighter to counter Western developments. The T-10 prototype lays the groundwork for what will become the legendary Su-27 family.',
    tag: 'GENESIS',
  },
  {
    year: '1989',
    label: 'Su-30 Development',
    heading: 'Multirole Evolution',
    description:
      'The Su-30 emerges as a two-seat, combat-capable trainer derivative of the Su-27. Extended range, tandem seating, and air-to-ground capability transform it into a true multirole platform suited for complex strike missions.',
    tag: 'EVOLUTION',
  },
  {
    year: '1996',
    label: 'IAF Contract',
    heading: 'India Selects the Flanker',
    description:
      'Indian Air Force signs a landmark agreement with Russia for 50 Su-30K aircraft, beginning the relationship that will culminate in the Su-30MKI — a uniquely customised variant incorporating Israeli, French, and Indian avionics.',
    tag: 'INDUCTION',
  },
  {
    year: '2002',
    label: 'MKI Enters Service',
    heading: 'Operational Debut',
    description:
      'The Su-30MKI (Modernizirovanny Kommercheskiy Indiiskiy) achieves Initial Operational Capability with the Indian Air Force. Its thrust-vector control engines and BARS phased-array radar redefine the regional air power balance.',
    tag: 'OPERATIONAL',
  },
  {
    year: '2004',
    label: 'Licensed Production',
    heading: 'HAL Manufactures in India',
    description:
      'Hindustan Aeronautics Limited begins licensed production at Nashik, fulfilling vision of indigenous manufacturing. By 2020, HAL-built Su-30MKIs form the backbone of IAF with over 260 aircraft delivered.',
    tag: 'INDIGENOUS',
  },
  {
    year: '2024',
    label: 'Super-30 Upgrade',
    heading: 'Next-Gen Avionics',
    description:
      'India launches the Super Su-30MKI upgrade program: new AESA radar, extended-range BVR missiles, IRST sensors, and enhanced electronic warfare suites. The programme ensures relevance beyond 2040.',
    tag: 'FUTURE',
  },
]

export default function HistorySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-10% 0px' })

  return (
    <section
      ref={sectionRef}
      id="history"
      className="relative section-padding bg-jetBlack overflow-hidden"
    >
      {/* Decorative side line */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-warningRed/30 to-transparent pointer-events-none" />

      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="hud-line w-12" />
            <span className="font-mono text-warningRed text-xs tracking-[0.3em] uppercase">
              Development Chronicle
            </span>
          </div>
          <h2 className="font-display text-jetWhite text-4xl md:text-6xl font-bold leading-tight">
            Legacy of the
            <br />
            <span className="text-gradient">Flanker</span>
          </h2>
          <p className="font-sans text-aircraftGrey mt-4 max-w-xl leading-relaxed">
            Five decades of engineering evolution — from Soviet design bureaus to
            Indian assembly lines, the Su-30MKI story is one of technological ambition.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[88px] md:left-[110px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-warningRed/60 via-warningRed/20 to-transparent" />

          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.7, ease: 'easeOut' }}
                className="relative flex gap-6 md:gap-10 pb-12 last:pb-0 group"
              >
                {/* Year column */}
                <div className="flex flex-col items-end min-w-[72px] md:min-w-[90px] pt-1">
                  <span className="font-display text-warningRed font-bold text-lg md:text-xl">
                    {item.year}
                  </span>
                  <span className="font-mono text-[8px] text-warningRed/40 tracking-widest mt-0.5">
                    {item.tag}
                  </span>
                </div>

                {/* Node */}
                <div className="relative flex-shrink-0">
                  <div className="w-3 h-3 rounded-full border-2 border-warningRed bg-jetBlack mt-1.5 group-hover:bg-warningRed transition-colors duration-300" />
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border border-warningRed/30 scale-0 group-hover:scale-100 transition-transform duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="font-mono text-aircraftGrey/60 text-[10px] tracking-[0.25em] uppercase mb-1">
                    {item.label}
                  </div>
                  <h3 className="font-display text-jetWhite text-xl md:text-2xl font-bold mb-3">
                    {item.heading}
                  </h3>
                  <p className="font-sans text-aircraftGrey leading-relaxed text-sm md:text-base max-w-2xl">
                    {item.description}
                  </p>

                  {/* Decorative bottom line */}
                  <div className="mt-4 hud-line w-16 opacity-20 group-hover:opacity-60 group-hover:w-32 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 glass-panel p-8 md:p-12 relative"
        >
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="font-mono text-warningRed text-[10px] tracking-[0.3em] mb-3">
                STRATEGIC SIGNIFICANCE
              </div>
              <p className="font-display text-jetWhite text-xl md:text-3xl font-bold leading-tight">
                "The Su-30MKI remains India's most capable combat aircraft, forming the
                backbone of the Indian Air Force's offensive capability."
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                ['272+', 'Aircraft in IAF service'],
                ['2040+', 'Service life projection'],
                ['#1', 'IAF primary strike jet'],
              ].map(([val, label]) => (
                <div key={label} className="border-l-2 border-warningRed pl-4">
                  <div className="font-display text-jetWhite text-2xl font-bold">{val}</div>
                  <div className="font-mono text-aircraftGrey text-[10px] tracking-widest">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
