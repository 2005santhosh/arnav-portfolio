import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/data/projects'

const catLabel = (c: string) =>
  c === 'render' ? '3D Rendering' : c === 'motion' ? 'Motion Graphics' : '3D Animation'

export function ProjectModal({ project: p, onClose }: { project: Project | null; onClose: () => void }) {
  const vRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    document.body.style.overflow = p ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [p])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <AnimatePresence>
      {p && (
        <motion.div className="fixed inset-0 z-[8000] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          {/* Backdrop */}
          <motion.div className="absolute inset-0"
            style={{ background: 'rgba(15,23,42,0.82)', backdropFilter: 'blur(18px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} />

          {/* Panel */}
          <motion.div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 rounded-2xl bg-white shadow-2xl"
            style={{ border: '1px solid rgba(37,99,235,0.12)', boxShadow: '0 40px 100px rgba(37,99,235,0.2)' }}
            initial={{ y: 50, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}>

            {/* Close button */}
            <button onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ border: '1px solid rgba(37,99,235,0.15)', background: '#ffffff', color: '#64748b', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 11 11">
                <path d="M1 1l9 9M10 1L1 10"/>
              </svg>
            </button>

            {/* Video */}
            <div className="relative rounded-t-2xl overflow-hidden bg-navy" style={{ aspectRatio: '16/9' }}>
              <video ref={vRef} src={p.videoUrl} className="w-full h-full object-cover" loop controls playsInline />
              <div className="absolute top-4 left-4 pointer-events-none">
                <span className="tag font-outfit" style={{ fontSize: '11px' }}>{catLabel(p.category)}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="md:col-span-2">
                  <motion.h2 className="font-syne font-bold text-navy mb-3"
                    style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', letterSpacing: '-0.02em' }}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    {p.title}
                  </motion.h2>
                  <motion.p className="font-outfit text-muted text-[14px] leading-relaxed mb-5"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    {p.description}
                  </motion.p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => <span key={t} className="tag font-outfit">{t}</span>)}
                  </div>
                </div>

                <motion.div className="space-y-5 pt-5 md:pt-0 md:pl-6"
                  style={{ borderTop: '1px solid rgba(37,99,235,0.1)' }}
                  initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                  {[['Client', p.client], ['Year', String(p.year)]].map(([l, v]) => (
                    <div key={l}>
                      <div className="font-outfit text-[10px] tracking-[0.18em] uppercase text-faint mb-1">{l}</div>
                      <div className="font-outfit text-[14px] text-navy-3">{v}</div>
                    </div>
                  ))}
                  <div>
                    <div className="font-outfit text-[10px] tracking-[0.18em] uppercase text-faint mb-2">Software</div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.software.map(s => <span key={s} className="tag font-outfit" style={{ fontSize: '10px' }}>{s}</span>)}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
