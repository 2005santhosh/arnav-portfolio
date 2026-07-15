import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { projects, Project } from '@/data/projects'

type ValidCat = 'motion' | 'render' | 'animation'
const CAT_LABEL: Record<ValidCat, string> = {
  motion: 'Motion Graphics',
  render: '3D Rendering',
  animation: '3D Animation',
}

const W: React.CSSProperties = { maxWidth: '960px', margin: '0 auto', padding: '0 20px' }

/* ── Full-screen video player ─────────────────── */
function Player({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', fn) }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.88)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '900px', background: '#000', borderRadius: '8px', overflow: 'hidden' }}
      >
        {p.videoUrl
          ? <video src={p.videoUrl} style={{ width: '100%', display: 'block', aspectRatio: '16/9' }} controls autoPlay playsInline preload="auto" />
          : <div style={{ aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '13px' }}>No video available</div>
        }
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0a0a0a' }}>
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#ddd' }}>{p.title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '12px', padding: '4px' }}>
            ESC to close
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Video thumbnail card ──────────────────────── */
function VideoCard({ p, onClick }: { p: Project; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const vRef    = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(false)
  const [ready,  setReady]  = useState(false)
  const [hov,    setHov]    = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { rootMargin: '300px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const v = vRef.current
    if (!v || !inView) return
    const fn = () => { v.currentTime = 0; setReady(true) }
    v.addEventListener('loadedmetadata', fn, { once: true })
    if (v.readyState >= 1) fn()
  }, [inView])

  const onEnter = () => { setHov(true); vRef.current?.play().catch(() => {}) }
  const onLeave = () => { setHov(false); if (vRef.current) { vRef.current.pause(); vRef.current.currentTime = 0 } }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        borderRadius: '6px', overflow: 'hidden', cursor: 'pointer',
        border: '1px solid #e0e0e0',
        background: '#f8f8f8',
        transition: 'border-color 0.18s, box-shadow 0.18s',
        boxShadow: hov ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
        borderColor: hov ? '#bbb' : '#e0e0e0',
      }}
    >
      {/* Video / thumbnail */}
      <div style={{ position: 'relative', aspectRatio: '16/10', background: '#111', overflow: 'hidden' }}>

        {inView && p.videoUrl ? (
          <video
            ref={vRef}
            src={p.videoUrl}
            muted loop playsInline
            preload="metadata"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              opacity: ready ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          />
        ) : null}

        {/* Spinner while loading */}
        {inView && p.videoUrl && !ready && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #333', borderTopColor: '#888', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        )}

        {/* Static placeholder (off-screen or no video) */}
        {(!inView || !p.videoUrl) && (
          <div style={{ position: 'absolute', inset: 0, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2">
              <path d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>

      {/* No title — video only */}
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
    <div>
      <div style={{ ...W, padding: '28px 20px 60px' }}>

        {/* Back + heading */}
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '12px', color: '#666', padding: '0 0 12px 0',
            }}
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
              <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <h1 style={{ fontSize: '18px', fontWeight: 500, color: '#111', letterSpacing: '-0.01em', marginBottom: '2px' }}>{label}</h1>
          <p style={{ fontSize: '12px', color: '#999' }}>{filtered.length} project{filtered.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '10px',
          }}>
            {filtered.map(p => (
              <VideoCard key={p.id} p={p} onClick={() => setSel(p)} />
            ))}
          </div>
        ) : (
          <p style={{ color: '#aaa', fontSize: '13px', paddingTop: '40px' }}>No projects yet.</p>
        )}
      </div>

      {sel && <Player p={sel} onClose={() => setSel(null)} />}
      <Footer />
    </div>
  )
}
