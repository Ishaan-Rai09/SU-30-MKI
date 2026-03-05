import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// â”€â”€ Capability cards â€” no images, pure HUD data panels â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const capabilities = [
  {
    id: 'bvr',
    tag: 'WEAPONS SYSTEM',
    title: 'Beyond Visual Range',
    metric: 'R-77',
    metricSub: 'Active radar BVR missile',
    description:
      'Fire-and-forget capability with the R-77 allows engagement of multiple airborne threats simultaneously at ranges exceeding 80 km, well beyond pilot visual range.',
    stats: [{ label: 'Range', val: '80 km' }, { label: 'Warhead', val: '22 kg' }, { label: 'Seekers', val: 'Active Radar' }],
    color: '#E63946',
  },
  {
    id: 'radar',
    tag: 'AVIONICS',
    title: 'BARS Phased-Array Radar',
    metric: 'N011M',
    metricSub: 'NIIP BARS multi-mode radar',
    description:
      'The passive electronically scanned BARS radar tracks up to 15 targets simultaneously and engages 4 at once, providing 360Â° situational awareness in all weather.',
    stats: [{ label: 'Detection', val: '400 km' }, { label: 'Track', val: '15 targets' }, { label: 'Modes', val: 'A2A + A2G' }],
    color: '#BFC7D5',
  },
  {
    id: 'engine',
    tag: 'PROPULSION',
    title: 'Thrust-Vector Control',
    metric: 'AL-31FP',
    metricSub: 'Saturn turbofan with TVC nozzles',
    description:
      'Each AL-31FP engine delivers 122.6 kN of thrust with Â±15Â° pitch vector control, enabling the legendary Pugachev\'s Cobra and Kulbit post-stall manoeuvres.',
    stats: [{ label: 'Thrust', val: '122.6 kN' }, { label: 'TVC', val: 'Â±15Â°' }, { label: 'SFC', val: '0.068 kg/Nh' }],
    color: '#E63946',
  },
  {
    id: 'range',
    tag: 'ENDURANCE',
    title: 'Extended Combat Radius',
    metric: '3,000',
    metricSub: 'km internal fuel range',
    description:
      'With conformal fuel tanks and in-flight refuelling probe, the Su-30MKI achieves strategic-range strike capability from standoff bases, reaching any point in the subcontinent.',
    stats: [{ label: 'Ferry', val: '3,000 km' }, { label: 'AAR', val: 'Capable' }, { label: 'Endurance', val: '4.5 hr' }],
    color: '#BFC7D5',
  },
  {
    id: 'manoeuvre',
    tag: 'AGILITY',
    title: 'Supermaneuverability',
    metric: '+9g',
    metricSub: 'Structural G-limit',
    description:
      'Combining relaxed static stability, fly-by-wire control laws, and TVC nozzles, the Su-30MKI operates in regimes physically impossible for conventional fighters.',
    stats: [{ label: 'G-limit', val: '+9g / âˆ’3g' }, { label: 'Roll', val: '270Â°/s' }, { label: 'AoA', val: '120Â°' }],
    color: '#E63946',
  },
  {
    id: 'payload',
    tag: 'STRIKE',
    title: 'Precision Ground Attack',
    metric: '8,000',
    metricSub: 'kg max external payload',
    description:
      'Twelve hardpoints carry precision-guided munitions including the BrahMos cruise missile, Kh-59ME stand-off weapon, and KAB-1500KR electro-optical bombs.',
    stats: [{ label: 'Payload', val: '8,000 kg' }, { label: 'Hardpoints', val: '12' }, { label: 'BrahMos', val: 'Capable' }],
    color: '#BFC7D5',
  },
]

// â”€â”€ Radar-ring visual (pure CSS/SVG, zero images) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function RadarRing({ color }: { color: string }) {
  return (
    <div className="absolute top-4 right-4 w-20 h-20 pointer-events-none">
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full opacity-20">
        <circle cx="40" cy="40" r="36" stroke={color} strokeWidth="0.5" />
        <circle cx="40" cy="40" r="24" stroke={color} strokeWidth="0.5" />
        <circle cx="40" cy="40" r="12" stroke={color} strokeWidth="0.5" />
        <line x1="4" y1="40" x2="76" y2="40" stroke={color} strokeWidth="0.5" />
        <line x1="40" y1="4" x2="40" y2="76" stroke={color} strokeWidth="0.5" />
        <motion.line
          x1="40" y1="40" x2="76" y2="40"
          stroke={color} strokeWidth="1"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '40px', originY: '40px', transformBox: 'fill-box' }}
        />
      </svg>
    </div>
  )
}

// â”€â”€ Expandable capability card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CapabilityCard({
  cap,
  index,
  inView,
}: {
  cap: typeof capabilities[0]
  index: number
  inView: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => setOpen(!open)}
      className="relative bg-jetBlack border border-white/[0.07] cursor-pointer group
                 hover:border-warningRed/40 transition-colors duration-300 overflow-hidden"
    >
      {/* Accent line that slides in on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] scale-x-0 group-hover:scale-x-100
                   transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(90deg, ${cap.color}, transparent)` }}
      />

      <RadarRing color={cap.color} />

      <div className="p-6 md:p-8">
        {/* Tag + index */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase"
            style={{ color: cap.color }}>
            {cap.tag}
          </span>
          <span className="font-mono text-white/10 text-xs">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Big metric */}
        <div className="mb-1">
          <span className="font-display text-jetWhite font-bold text-3xl md:text-4xl leading-none">
            {cap.metric}
          </span>
        </div>
        <p className="font-mono text-aircraftGrey/50 text-[10px] tracking-widest mb-4">
          {cap.metricSub}
        </p>

        {/* Title */}
        <h3 className="font-display text-jetWhite text-lg font-semibold mb-3 leading-snug">
          {cap.title}
        </h3>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="font-sans text-aircraftGrey text-sm leading-relaxed mb-5">
                {cap.description}
              </p>

              <div className="grid grid-cols-3 gap-2">
                {cap.stats.map(({ label, val }) => (
                  <div
                    key={label}
                    className="border border-white/[0.06] p-2.5 text-center"
                  >
                    <p className="font-display text-jetWhite text-sm font-bold">{val}</p>
                    <p className="font-mono text-aircraftGrey/50 text-[9px] tracking-widest mt-0.5">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle hint */}
        <div className="mt-4 flex items-center gap-2">
          <div
            className="h-[1px] w-6 transition-all duration-300"
            style={{ background: cap.color, opacity: open ? 1 : 0.3 }}
          />
          <span className="font-mono text-[9px] tracking-[0.25em] transition-colors duration-200"
            style={{ color: open ? cap.color : 'rgba(191,199,213,0.4)' }}>
            {open ? 'COLLAPSE' : 'EXPAND DATA'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// â”€â”€ Main export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-10% 0px' })

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative section-padding bg-[#080808] overflow-hidden"
    >
      {/* Background grid accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.025,
          backgroundImage:
            'linear-gradient(rgba(191,199,213,1) 1px, transparent 1px),linear-gradient(90deg,rgba(191,199,213,1) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="hud-line w-12" />
            <span className="font-mono text-warningRed text-xs tracking-[0.3em] uppercase">
              Combat Systems
            </span>
          </div>
          <h2 className="font-display text-jetWhite text-4xl md:text-6xl font-bold leading-tight">
            Core
            <br />
            <span className="text-gradient">Capabilities</span>
          </h2>
          <p className="font-sans text-aircraftGrey mt-4 max-w-xl leading-relaxed">
            Click any card to expand detailed performance data for each of the
            Su-30MKI's six primary combat system domains.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.id} cap={cap} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom callout bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-px bg-jetBlack border-t border-white/[0.04] p-6 md:p-8
                     flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-warningRed animate-hudPulse" />
            <span className="font-mono text-warningRed text-[10px] tracking-[0.3em]">
              ALL SYSTEMS NOMINAL â€” OPERATIONAL READINESS 100%
            </span>
          </div>
          <span className="font-mono text-aircraftGrey/30 text-[10px] tracking-[0.2em]">
            DATA: HAL / IAF TECHNICAL MANUAL
          </span>
        </motion.div>
      </div>
    </section>
  )
}
