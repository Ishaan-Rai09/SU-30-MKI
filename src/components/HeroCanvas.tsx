import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCanvasSequence } from '../hooks/useCanvasSequence'

gsap.registerPlugin(ScrollTrigger)

// Total pinned scroll distance (px) — longer = slower / smoother playback
const SCROLL_DISTANCE = 4000

const hudStats = [
  { label: 'MAX SPEED', value: 'MACH 2.0', unit: '' },
  { label: 'RANGE',     value: '3,000',    unit: 'KM'       },
  { label: 'THRUST',    value: '122',       unit: 'kN×2'     },
  { label: 'ROLE',      value: 'MULTIROLE', unit: 'AIR SUP.' },
]

export default function HeroCanvas() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const overlayRef    = useRef<HTMLDivElement>(null)
  const scrollIndRef  = useRef<HTMLDivElement>(null)

  const [loadProgress, setLoadProgress] = useState(0)
  const [loaded,       setLoaded]       = useState(false)
  const [heroVisible,  setHeroVisible]  = useState(false)

  const { canvasRef, preloadAll, drawFrame, resizeCanvas, getFrameIndex } =
    useCanvasSequence()

  // ── Resize canvas whenever window size changes ──────────────────────────
  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [resizeCanvas])

  // ── Preload ALL frames before showing anything ──────────────────────────
  useEffect(() => {
    preloadAll(
      (n, total) => setLoadProgress(Math.round((n / total) * 100)),
      () => {
        setLoaded(true)
        setHeroVisible(true)
        // Draw frame 0 immediately so canvas isn't blank
        drawFrame(0)
      }
    )
  }, [preloadAll, drawFrame])

  // ── GSAP ScrollTrigger scrub ────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return
    const container = containerRef.current
    if (!container) return

    drawFrame(0)

    const st = ScrollTrigger.create({
      trigger: container,
      start:   'top top',
      end:     `+=${SCROLL_DISTANCE}`,
      pin:     true,
      scrub:   1,            // higher = more lag / smoother
      anticipatePin: 1,
      onUpdate: (self) => {
        // Map scroll progress → frame index and paint it
        const idx = getFrameIndex(self.progress)
        drawFrame(idx)
      },
    })

    // Fade the HUD overlay out over the first 25 % of scroll
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger:  container,
          start:    'top top',
          end:      `+=${SCROLL_DISTANCE * 0.25}`,
          scrub:    true,
        },
      })
    }

    // Fade the scroll indicator out quickly
    if (scrollIndRef.current) {
      gsap.to(scrollIndRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start:   'top top',
          end:     `+=${SCROLL_DISTANCE * 0.08}`,
          scrub:   true,
        },
      })
    }

    return () => st.kill()
  }, [loaded, drawFrame, getFrameIndex])

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay:    i * 0.15 + 0.6,
        duration: 0.9,
        ease:     [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-jetBlack overflow-hidden"
    >
      {/* ── CANVAS  ─ the only source of aircraft imagery in this section ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ display: 'block', width: '100%', height: '100%' }}
      />

      {/* ── Loading screen ──────────────────────────────────────────────── */}
      {!loaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-jetBlack">
          <p className="font-display text-jetWhite text-3xl tracking-[0.3em] mb-10">
            SU-30MKI
          </p>

          {/* Progress bar */}
          <div className="relative w-72 h-[1px] bg-white/10 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-warningRed"
              initial={{ width: 0 }}
              animate={{ width: `${loadProgress}%` }}
              transition={{ duration: 0.15, ease: 'linear' }}
            />
          </div>

          <p className="font-mono text-aircraftGrey text-[11px] mt-5 tracking-[0.25em]">
            PRELOADING FRAME SEQUENCE — {loadProgress}%
          </p>

          {/* Animated corner brackets */}
          <div className="absolute top-8 left-8 w-6 h-6 border-l border-t border-warningRed/40" />
          <div className="absolute top-8 right-8 w-6 h-6 border-r border-t border-warningRed/40" />
          <div className="absolute bottom-8 left-8 w-6 h-6 border-l border-b border-warningRed/40" />
          <div className="absolute bottom-8 right-8 w-6 h-6 border-r border-b border-warningRed/40" />
        </div>
      )}

      {/* ── Dark vignette ───────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(6,6,6,0.85) 100%)',
        }}
      />

      {/* ── Bottom-left text legibility gradient ─────────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(6,6,6,0.92) 0%, rgba(6,6,6,0.60) 20%, transparent 55%)',
        }}
      />

      {/* ── Top legibility gradient (for coordinates) ────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(6,6,6,0.70) 0%, transparent 25%)',
        }}
      />

      {/* ── Scanlines ───────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          opacity: 0.15,
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)',
        }}
      />

      {/* ── HUD grid ────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          opacity: 0.035,
          backgroundImage:
            'linear-gradient(rgba(230,57,70,1) 1px, transparent 1px),linear-gradient(90deg, rgba(230,57,70,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Hero overlay UI (fades out as user scrolls) ──────────────────── */}
      {heroVisible && (
        <div
          ref={overlayRef}
          className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-16 pointer-events-none"
        >
          {/* Top — lat / lon / alt */}
          <div className="flex items-start justify-between pt-20">
            <motion.div
              custom={0} initial="hidden" animate="visible" variants={fadeUp}
              className="flex flex-col gap-1"
            >
              <span className="font-mono text-warningRed text-[10px] tracking-[0.3em]">
                LAT 28°36′50″N
              </span>
              <span className="font-mono text-warningRed text-[10px] tracking-[0.3em]">
                LON 77°12′32″E
              </span>
            </motion.div>

            <motion.div
              custom={1} initial="hidden" animate="visible" variants={fadeUp}
            >
              <span className="font-mono text-aircraftGrey text-[10px] tracking-[0.3em]">
                ALT 18,000 M
              </span>
            </motion.div>
          </div>

          {/* Centre — title block */}
          <div className="flex flex-col items-start gap-4">
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
              <div className="hud-line w-16 mb-5 opacity-70" />
              <h1
                className="font-display text-jetWhite"
                style={{
                  fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                  fontWeight: 900,
                  lineHeight: 0.88,
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.7)',
                }}
              >
                SU-30MKI
              </h1>
            </motion.div>

            <motion.p
              custom={2} initial="hidden" animate="visible" variants={fadeUp}
              className="font-mono text-sm md:text-base tracking-[0.25em] uppercase"
              style={{
                color: '#e8ecf2',
                textShadow: '0 1px 12px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.9)',
              }}
            >
              Air Dominance. Precision Engineering.
            </motion.p>

            <motion.div
              custom={3} initial="hidden" animate="visible" variants={fadeUp}
              className="flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-warningRed animate-hudPulse" />
              <span className="font-mono text-warningRed text-[11px] tracking-[0.3em] uppercase">
                IAF Service Active
              </span>
            </motion.div>
          </div>

          {/* Bottom — HUD stat panels */}
          <div className="flex flex-wrap gap-4 pb-4">
            {hudStats.map(({ label, value, unit }, i) => (
              <motion.div
                key={label}
                custom={i} initial="hidden" animate="visible" variants={fadeUp}
                className="relative glass-panel px-4 py-3 min-w-[120px]"
              >
                <div className="hud-corner hud-corner-tl" />
                <div className="hud-corner hud-corner-tr" />
                <div className="hud-corner hud-corner-bl" />
                <div className="hud-corner hud-corner-br" />
                <p className="font-mono text-warningRed text-[9px] tracking-[0.25em] mb-1">
                  {label}
                </p>
                <p className="font-display text-jetWhite text-lg font-bold leading-none">
                  {value}
                  {unit && (
                    <span className="text-aircraftGrey text-[11px] ml-1 font-mono font-normal">
                      {unit}
                    </span>
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── Scroll cue ──────────────────────────────────────────────────── */}
      {heroVisible && (
        <motion.div
          ref={scrollIndRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-mono text-aircraftGrey/60 text-[9px] tracking-[0.4em] uppercase">
            Scroll to reveal
          </span>
          {/* Animated chevrons */}
          <div className="flex flex-col items-center gap-1 mt-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 border-r border-b border-warningRed rotate-45"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </section>
  )
}

