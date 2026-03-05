import HistorySection from '../components/HistorySection'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

export default function History() {
  return (
    <main className="pt-20 bg-jetBlack min-h-screen">
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
              Development Chronicle
            </span>
          </div>
          <h1 className="font-display text-jetWhite text-5xl md:text-7xl font-bold">
            History
          </h1>
          <p className="font-sans text-aircraftGrey mt-4 max-w-lg">
            Trace the evolution of the Su-30MKI from Soviet design bureau concepts
            to the modern multirole heavyweight of the Indian Air Force.
          </p>
        </motion.div>
      </div>
      <HistorySection />
      <Footer />
    </main>
  )
}
