import { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { projects, Project } from '@/data/projects'

type ValidCat = 'motion' | 'render' | 'animation'
const CAT_LABEL: Record<ValidCat, string> = {
  motion: 'Motion Graphics',
  render: '3D Rendering',
  animation: '3D Animation',
}
const W: React.CSSProperties = {
  maxWidth: '960px', margin: '0 auto', padding: '0 clamp(16px,4vw,32px)',
}

/* ── Full-screen player ─────────────────────── */
function Player({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', fn) }
  }, [onClose])

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'rgba(0,0,0,0.92)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(10px,3vw,24px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: '960px',
        background: '#000', borderRadius: '6px', overflow: 'hidden',
      }}>
        {p.videoUrl
          ? <video src={p.videoUrl} poster={p.poster}
              style={{ width: '100%', display: 'block', aspectRatio: '16/9' }}
              controls autoPlay playsInline preload="auto" />
          : <div style={{ aspectRatio: '16/9', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '13px' }}>
              No video
            </div>
        }
        <div style={{ padding: '8px 14px', background: '#0a0a0a', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '12px' }}>
            ✕ Close
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Video card ─────────────────────────────────
   - Shows Cloudinary poster <img> immediately (fast CDN JPEG ~20KB)
   - No spinner, no metadata wait
   - On hover: swap poster for playing video
   - On leave: show poster again
   ─────────────────────────────────────────────── */
function VideoCard({ p, onClick }: { p: Project; onClick: () => void }) {
  const cardRef  = useRef<HTMLDivElement>(null)
  const vRef     = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(false)
  const [hov,    setHov]    = useState(false)
  const [playing, setPlaying] = useState(false)

  /* Mount video element when card enters viewport (saves resources) */
  useEffect(() => {
    const el = cardRef.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { rootMargin: '400px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const onEnter = useCallback(() => {
    setHov(true)
    const v = vRef.current; if (!v) return
    const play = () => { v.play().then(() => setPlaying(true)).catch(() => {}) }
    if (v.readyState >= 2) { play() }
    else { v.load(); v.oncanplay = play }
  }, [])

  const onLeave = useCallback(() => {
    setHov(false)
    setPlaying(false)
    const v = vRef.current; if (!v) return
    v.pause(); v.currentTime = 0
  }, [])

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        aspectRatio: '16/10',
        borderRadius: '5px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#111',
        border: `1px solid ${hov ? '#bbb' : '#e0e0e0'}`,
        transition: 'border-color 0.15s, transform 0.18s',
        transform: hov ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Poster image — loads instantly from Cloudinary CDN */}
      {p.poster && (
        <img
          src={p.poster}
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: playing ? 0 : 1,
            transition: 'opacity 0.2s',
          }}
        />
      )}

      {/* Video — only mounted when in viewport, plays on hover */}
      {inView && p.videoUrl && (
        <video
          ref={vRef}
          src={p.videoUrl}
          muted loop playsInline
          preload="none"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: playing ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        />
      )}

      {/* Play icon — shown when hovered but not yet playing */}
      {hov && !playing && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.15)',
          pointerEvents: 'none',
        }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.8)',
            background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 0, height: 0, borderLeft: '11px solid #fff', borderTop: '7px solid transparent', borderBottom: '7px solid transparent', marginLeft: '2px' }} />
          </div>
        </div>
      )}
    </div>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e5e5e5', padding: '20px', marginTop: '40px' }}>
      <div style={{ ...W, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: '#aaa' }}>Arnav Gupta</span>
        <span style={{ fontSize: '12px', color: '#ccc' }}>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  const navigate     = useNavigate()
  const [sel, setSel] = useState<Project | null>(null)

  const cat      = (category as ValidCat) || 'motion'
  const label    = CAT_LABEL[cat] || cat
  const filtered = projects.filter(p => p.category === cat)

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <div style={W}>
        <div style={{ padding: 'clamp(20px,4vw,36px) 0 clamp(14px,3vw,22px)' }}>
          <button onClick={() => navigate('/')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '12px', color: '#888', padding: '0 0 10px 0', display: 'block',
          }}>
            ← Back
          </button>
          <h1 style={{ fontSize: 'clamp(1.2rem,3vw,1.8rem)', fontWeight: 600, color: '#111', letterSpacing: '-0.02em' }}>
            {label}
          </h1>
        </div>

        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 'clamp(8px,2vw,14px)',
            paddingBottom: 'clamp(36px,6vw,64px)',
          }}>
            {filtered.map(p => (
              <VideoCard key={p.id} p={p} onClick={() => setSel(p)} />
            ))}
          </div>
        ) : (
          <p style={{ color: '#aaa', fontSize: '13px', padding: '40px 0' }}>No projects yet.</p>
        )}
      </div>

      {sel && <Player p={sel} onClose={() => setSel(null)} />}
      <Footer />
    </div>
  )
}
