import HeroCanvas from '../components/HeroCanvas'
import AircraftSpecs from '../components/AircraftSpecs'
import InteractiveGallery from '../components/InteractiveGallery'
import HistorySection from '../components/HistorySection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <HeroCanvas />
      <AircraftSpecs />
      <InteractiveGallery />
      <HistorySection />
      <Footer />
    </main>
  )
}
