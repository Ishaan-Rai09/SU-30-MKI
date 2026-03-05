import { useEffect, useRef, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import Header from './components/Header'

// Lazy-load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const Specifications = lazy(() => import('./pages/Specifications'))
const History = lazy(() => import('./pages/History'))
const Contact = lazy(() => import('./pages/Contact'))

function PageFallback() {
  return (
    <div className="min-h-screen bg-jetBlack flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-warningRed border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-aircraftGrey text-xs tracking-[0.25em]">LOADING...</span>
      </div>
    </div>
  )
}

function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafRef.current)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <Header />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/specifications" element={<Specifications />} />
            <Route path="/history" element={<History />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </LenisProvider>
    </BrowserRouter>
  )
}

export default App

