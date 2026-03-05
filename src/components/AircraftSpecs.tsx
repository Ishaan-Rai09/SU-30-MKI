import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const specs = [
  {
    label: 'Maximum Speed',
    raw: 2120,
    display: '2,122',
    unit: 'km/h',
    sub: 'Mach 2.0 at altitude',
    icon: '▶',
  },
  {
    label: 'Combat Range',
    raw: 3000,
    display: '3,000',
    unit: 'km',
    sub: 'Internal fuel only',
    icon: '⊕',
  },
  {
    label: 'Service Ceiling',
    raw: 17300,
    display: '17,300',
    unit: 'm',
    sub: '56,760 ft altitude',
    icon: '△',
  },
  {
    label: 'Engine Thrust',
    raw: 246,
    display: '246',
    unit: 'kN',
    sub: 'AL-31FP combined',
    icon: '◉',
  },
  {
    label: 'Wing Area',
    raw: 62,
    display: '62.0',
    unit: 'm²',
    sub: 'Delta-wing planform',
    icon: '◈',
  },
  {
    label: 'Max Takeoff Weight',
    raw: 34000,
    display: '34,000',
    unit: 'kg',
    sub: 'Full weapon load',
    icon: '▽',
  },
]

const additionalSpecs = [
  ['Engines', '2× Saturn AL-31FP turbofan'],
  ['Thrust (each)', '122.6 kN with afterburner'],
  ['Radar', 'Bars / NIIP N011M BARS'],
  ['Crew', '2 (pilot + weapon system officer)'],
  ['Length', '21.9 m (71 ft 10 in)'],
  ['Wingspan', '14.7 m (48 ft 3 in)'],
  ['Hardpoints', '12 external stores stations'],
  ['Armament', 'R-77, R-73, Kh-31, Kh-59ME, bombs'],
  ['G-Limit', '+9g / −3g structural limit'],
  ['Users', 'Indian Air Force (272+ aircraft)'],
]

function AnimatedCounter({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  useEffect(() => {
    if (!inView) return
    let start: number | null = null
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return <span ref={ref}>{value.toLocaleString()}</span>
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
}

export default function AircraftSpecs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-15% 0px' })

  return (
    <section
      ref={sectionRef}
      id="specifications"
      className="relative section-padding bg-jetBlack overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(191,199,213,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(191,199,213,0.8) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-screen-xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="hud-line w-12" />
            <span className="font-mono text-warningRed text-xs tracking-[0.3em] uppercase">
              Technical Specifications
            </span>
          </div>
          <h2 className="font-display text-jetWhite text-4xl md:text-6xl font-bold tracking-tight">
            Performance
            <br />
            <span className="text-gradient-red">Data</span>
          </h2>
          <p className="font-sans text-aircraftGrey mt-4 max-w-lg leading-relaxed">
            The Su-30MKI represents the pinnacle of multirole fighter aviation —
            combining supermaneuverability with beyond-visual-range strike capability.
          </p>
        </motion.div>

        {/* Primary stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5 mb-px">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="relative bg-jetBlack p-6 md:p-8 flex flex-col gap-2 group hover:bg-white/[0.02] transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-warningRed text-[10px] tracking-[0.25em] uppercase">
                  {spec.label}
                </span>
                <span className="text-warningRed/30 text-xl">{spec.icon}</span>
              </div>

              <div className="font-display text-jetWhite font-bold leading-none"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
              >
                <AnimatedCounter target={spec.raw} />
                <span className="font-mono text-aircraftGrey text-sm md:text-base ml-2 font-normal">
                  {spec.unit}
                </span>
              </div>

              <p className="font-mono text-aircraftGrey/60 text-[11px] tracking-widest">
                {spec.sub}
              </p>

              {/* bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-warningRed scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="hud-line my-16 opacity-20" />

        {/* Secondary specs table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="hud-line w-8" />
            <span className="font-mono text-warningRed text-xs tracking-[0.3em] uppercase">
              Full Datasheet
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/5">
            {additionalSpecs.map(([key, val], i) => (
              <motion.div
                key={key}
                custom={i}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp}
                className="bg-jetBlack flex items-start gap-4 p-4 md:p-5 group hover:bg-white/[0.02] transition-colors duration-200"
              >
                <span className="font-mono text-warningRed text-[10px] tracking-[0.2em] uppercase min-w-[140px] md:min-w-[180px] pt-0.5">
                  {key}
                </span>
                <span className="font-sans text-jetWhite text-sm leading-relaxed">
                  {val}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
