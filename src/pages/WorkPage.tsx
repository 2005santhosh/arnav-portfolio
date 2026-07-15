import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, Project } from '@/data/projects'
import { ProjectModal } from '@/components/sections/ProjectModal'
import { Link } from 'react-router-dom'

type Cat = 'all' | 'motion' | 'render' | 'animation'
const CATS = [
  { k: 'all'       as Cat, l: 'All Work',       d: 'Every project, in one place.' },
  { k: 'motion'    as Cat, l: 'Motion Graphics', d: 'Energy. Rhythm. Kinetic type.' },
  { k: 'render'    as Cat, l: '3D Rendering',    d: 'Precision. Luxury. Photoreal.' },
  { k: 'animation' as Cat, l: '3D Animation',    d: 'Immersion. Space. Camera poetry.' },
]
const catLabel: Record<string, string> = { motion: 'Motion', render: '3D Render', animation: '3D Anim.' }

function WorkCard({ p, i, onOpen }: { p: Project; i: number; onOpen: (p: Project) => void }) {
  const vRef = useRef<HTMLVideoElement>(null)
  const [hov, setHov] = useState(false)
  const hasVideo = !!p.videoUrl

  return (
    <motion.article
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: '#1e293b', border: '1px solid rgba(37,99,235,0.1)' }}
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14, scale: 0.97 }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      layout
      onMouseEnter={() => { setHov(true); if (hasVideo) vRef.current?.play().catch(() => {}) }}
      onMouseLeave={() => { setHov(false); if (vRef.current) { vRef.current.pause(); vRef.current.currentTime = 0 } }}
      onClick={() => onOpen(p)}
      whileHover={{ y: -5, borderColor: 'rgba(37,99,235,0.4)', boxShadow: '0 20px 56px rgba(37,99,235,0.16)' }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {/* Thumbnail always visible */}
        <motion.img src={p.thumbnail} alt={p.title}
          className="w-full h-full object-cover"
          style={{ filter: 'saturate(0.7) brightness(0.85)' }}
          animate={{ scale: hov ? 1.06 : 1 }}
          transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
          loading="lazy" />

        {/* Video overlay — only for motion projects that have a video */}
        {hasVideo && (
          <motion.video ref={vRef} src={p.videoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            muted loop playsInline
            animate={{ opacity: hov ? 0.9 : 0 }} transition={{ duration: 0.35 }} />
        )}

        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.88) 0%, transparent 55%)' }} />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="tag tag-dark font-outfit" style={{ fontSize: '10px' }}>{catLabel[p.category]}</span>
        </div>
        <span className="absolute top-3 right-3 font-outfit text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{p.year}</span>

        {/* Arrow on hover */}
        <motion.div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-blue flex items-center justify-center"
          animate={{ opacity: hov ? 1 : 0, scale: hov ? 1 : 0.5 }} transition={{ duration: 0.2 }}>
          <svg width="9" height="9" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 10 10">
            <path d="M1 9L9 1M9 1H2M9 1v7"/>
          </svg>
        </motion.div>
      </div>

      {/* Card footer */}
      <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="font-syne font-semibold text-white mb-1" style={{ fontSize: 'clamp(13px,1.4vw,15px)', letterSpacing: '-0.01em' }}>
          {p.title}
        </div>
        <div className="font-outfit text-[12px] text-faint">{p.client}</div>
      </div>
    </motion.article>
  )
}

function Footer() {
  return (
    <footer className="bg-navy py-10" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="wrap flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue rounded-lg flex items-center justify-center">
            <span className="font-syne font-bold text-white text-[12px]">AG</span>
          </div>
          <span className="font-outfit text-[13px] text-muted">Arnav Gupta</span>
        </div>
        <div className="font-outfit text-[12px] text-faint">© {new Date().getFullYear()} · All rights reserved</div>
        <Link to="/contact"><div className="btn-blue" style={{ padding: '9px 20px', fontSize: '12px' }}>Hire Me</div></Link>
      </div>
    </footer>
  )
}

export default function WorkPage() {
  const [cat, setCat] = useState<Cat>('all')
  const [sel, setSel] = useState<Project | null>(null)
  const filtered = cat === 'all' ? projects : projects.filter(p => p.category === cat)
  const active   = CATS.find(c => c.k === cat)!

  return (
    <div className="min-h-screen bg-ice" style={{ paddingTop: '64px' }}>

      {/* Page header — navy bg */}
      <div className="bg-navy relative overflow-hidden py-14 md:py-20">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
        <div className="wrap relative z-10">
          <p className="label label-light mb-4">Portfolio</p>
          <div className="overflow-hidden">
            <motion.h1 className="font-syne font-extrabold text-white"
              style={{ fontSize: 'clamp(3rem,8vw,6.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
              initial={{ y: '100%' }} animate={{ y: '0%' }}
              transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}>
              The Work.
            </motion.h1>
          </div>
          <AnimatePresence mode="wait">
            <motion.p key={cat} className="font-outfit text-faint text-[15px] mt-3"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {active.d}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Sticky filter tabs */}
      <div className="sticky z-50 bg-white/95 backdrop-blur-md" style={{ top: '64px', borderBottom: '1px solid rgba(37,99,235,0.1)' }}>
        <div className="wrap flex items-center overflow-x-auto">
          {CATS.map(c => (
            <button key={c.k} onClick={() => setCat(c.k)}
              className="relative flex-shrink-0 py-4 px-4 font-outfit font-medium text-[13px] bg-transparent border-0"
              style={{ color: cat === c.k ? '#2563eb' : '#334155', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>
              {c.l}
              {cat === c.k && (
                <motion.div layoutId="work-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue rounded-t" />
              )}
            </button>
          ))}
          <div className="ml-auto flex-shrink-0 pl-4 font-outfit text-[12px] py-4" style={{ color: '#94a3b8', whiteSpace: 'nowrap' }}>
            {filtered.length} projects
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="wrap py-10 md:py-12">
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => <WorkCard key={p.id} p={p} i={i} onOpen={setSel} />)}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={sel} onClose={() => setSel(null)} />
      <Footer />
    </div>
  )
}
