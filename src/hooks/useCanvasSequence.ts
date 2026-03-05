import { useRef, useCallback } from 'react'

const TOTAL_FRAMES = 84

export function useCanvasSequence() {
  const images = useRef<HTMLImageElement[]>([])
  const loadedCount = useRef(0)
  // This ref is attached directly to the <canvas> element in the component
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const currentFrameRef = useRef(0)

  /** Pad number to 4 digits */
  const framePath = (index: number) =>
    `/frames/frame-${String(index).padStart(4, '0')}.jpg`

  /** Resize canvas to fill window at device pixel ratio */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
  }, [])

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const img = images.current[index]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = canvas.width / dpr
    const h = canvas.height / dpr

    // Cover-fit: fill the canvas while preserving image aspect ratio
    const imgAspect = img.naturalWidth / img.naturalHeight
    const canvasAspect = w / h
    let drawW: number, drawH: number, offsetX: number, offsetY: number

    if (imgAspect > canvasAspect) {
      drawH = h
      drawW = h * imgAspect
      offsetX = (w - drawW) / 2
      offsetY = 0
    } else {
      drawW = w
      drawH = w / imgAspect
      offsetX = 0
      offsetY = (h - drawH) / 2
    }

    ctx.fillStyle = '#060606'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.filter = 'contrast(1.08) saturate(1.12) brightness(1.02)'
    ctx.drawImage(img, offsetX * dpr, offsetY * dpr, drawW * dpr, drawH * dpr)
    ctx.filter = 'none'

    currentFrameRef.current = index
  }, [])

  const preloadAll = useCallback((
    onProgress?: (loaded: number, total: number) => void,
    onComplete?: () => void
  ) => {
    images.current = []
    loadedCount.current = 0

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = framePath(i)
      img.onload = () => {
        loadedCount.current++
        onProgress?.(loadedCount.current, TOTAL_FRAMES)
        if (loadedCount.current === TOTAL_FRAMES) {
          onComplete?.()
        }
      }
      img.onerror = () => {
        loadedCount.current++
        if (loadedCount.current === TOTAL_FRAMES) {
          onComplete?.()
        }
      }
      images.current[i - 1] = img
    }
  }, [])

  const getFrameIndex = useCallback((progress: number) => {
    // Clamp so last frame is always reachable at 100% scroll
    return Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES))
  }, [])

  return {
    canvasRef,      // attach as ref={canvasRef} on the <canvas> element
    images,
    currentFrameRef,
    preloadAll,
    drawFrame,
    resizeCanvas,
    getFrameIndex,
    totalFrames: TOTAL_FRAMES,
  }
}
