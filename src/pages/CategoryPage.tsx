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

/* ── Video player modal ──────────────────────── */
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
      background: 'rgba(0,0,0,0.9)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(12px,4vw,24px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: '960px',
        background: '#000', borderRadius: '8px', overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
      }}>
        {p.videoUrl
          ? <video
              src={p.videoUrl}
              style={{ width: '100%', display: 'block', aspectRatio: '16/9', background: '#000' }}
              controls autoPlay playsInline
              preload="auto"
            />
          : <div style={{ aspectRatio: '16/9', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '13px' }}>
              No video available
            </div>
        }
        <div style={{ padding: '10px 14px', background: '#0a0a0a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#ccc' }}>{p.title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '12px', padding: '4px 8px' }}>
            ✕ Close
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Video thumbnail card ─────────────────────
   Strategy:
   1. IntersectionObserver — don't even mount the video element until card
      is within 400px of the viewport (saves bandwidth for off-screen cards).
   2. preload="metadata" — once mounted, browser fetches only the first few
      KB (moov atom) needed to decode and paint the first frame.
   3. onLoadedMetadata — seek to t=0, mark ready → first frame paints.
   4. Hover → play(); leave → pause + seek to 0 (shows thumbnail again).
   ──────────────────────────────────────────── */
function VideoCard({ p, onClick }: { p: Project; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const vRef    = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(false)
  const [ready,  setReady]  = useState(false)
  const [hov,    setHov]    = useState(false)

  /* Mount video only when near viewport */
  useEffect(() => {
    const el = cardRef.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { rootMargin: '400px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* Seek to 0 once metadata arrives so first frame is the thumbnail */
  useEffect(() => {
    const v = vRef.current; if (!v || !inView) return
    const fn = () => { v.currentTime = 0; setReady(true) }
    if (v.readyState >= 1) { fn(); return }
    v.addEventListener('loadedmetadata', fn, { once: true })
    return () => v.removeEventListener('loadedmetadata', fn)
  }, [inView])

  const onEnter = useCallback(() => {
    setHov(true)
    vRef.current?.play().catch(() => {})
  }, [])

  const onLeave = useCallback(() => {
    setHov(false)
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
        borderRadius: '6px', overflow: 'hidden', cursor: 'pointer',
        border: `1px solid ${hov ? '#bbb' : '#e0e0e0'}`,
        background: '#f0f0f0',
        transition: 'border-color 0.15s, transform 0.18s, box-shadow 0.18s',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? '0 4px 16px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/10', background: '#1a1a1a', overflow: 'hidden' }}>

        {/* Video element — preload="metadata" fetches only first-frame data */}
        {inView && p.videoUrl && (
          <video
            ref={vRef}
            src={p.videoUrl}
            muted loop playsInline
            preload="metadata"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              opacity: ready ? 1 : 0,
              transition: 'opacity 0.2s ease',
            }}
          />
        )}

        {/* Spinner while metadata loads */}
        {inView && p.videoUrl && !ready && (
          <div style={{
            position: 'absolute', inset: 0,
            background: '#111',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '20px', height: '20px', borderRadius: '50%',
              border: '2px solid #333', borderTopColor: '#888',
              animation: 'spin 0.7s linear infinite',
            }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        )}

        {/* Dark static placeholder before mounting */}
        {(!inView || !p.videoUrl) && (
          <div style={{ position: 'absolute', inset: 0, background: '#1a1a1a' }} />
        )}

        {/* Play icon overlay on hover */}
        {hov && ready && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.7)',
              background: 'rgba(0,0,0,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 0, height: 0, borderLeft: '10px solid #fff', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', marginLeft: '2px' }} />
            </div>
          </div>
        )}
      </div>
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

        {/* Header */}
        <div style={{ padding: 'clamp(24px,4vw,40px) 0 clamp(16px,3vw,24px)' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '12px', color: '#666', padding: '0 0 12px 0',
            }}
          >
            ← Back
          </button>
          <h1 style={{ fontSize: 'clamp(1.4rem,3.5vw,2rem)', fontWeight: 600, color: '#111', letterSpacing: '-0.02em', marginBottom: '3px' }}>
            {label}
          </h1>
          <p style={{ fontSize: '12px', color: '#999' }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} · Hover to preview · Click to watch
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 'clamp(10px,2vw,16px)',
            paddingBottom: 'clamp(40px,7vw,70px)',
          }}>
            {filtered.map(p => (
              <VideoCard key={p.id} p={p} onClick={() => setSel(p)} />
            ))}
          </div>
        ) : (
          <p style={{ color: '#aaa', fontSize: '13px', padding: '40px 0 80px' }}>No projects yet.</p>
        )}
      </div>

      {sel && <Player p={sel} onClose={() => setSel(null)} />}
      <Footer />
    </div>
  )
}
