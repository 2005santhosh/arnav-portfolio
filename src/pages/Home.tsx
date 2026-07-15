import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroPng from '@/assets/hero.png'
import { testimonials } from '@/data/projects'

const REEL = '/videos/AI Cadence.mp4'

const W: React.CSSProperties = { maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(16px,4vw,32px)' }
const SEC = 'clamp(52px,8vw,80px)'

function Footer() {
  return (
    <footer style={{ background: 'rgba(255,255,255,0.6)', borderTop: '1px solid rgba(37,99,235,0.1)', padding: '28px 0' }}>
      <div style={{ ...W, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ fontSize: '14px', color: '#6b7280' }}>Arnav Gupta</span>
        <span style={{ fontSize: '13px', color: '#9ca3af' }}>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}

export default function Home() {
  const [muted, setMuted] = useState(true)
  const vRef = useRef<HTMLVideoElement>(null)

  return (
    <div style={{ paddingTop: '62px', background: 'transparent', minHeight: '100vh' }}>

      {/* ── HERO ──────────────────────────────────────── */}
      <section style={{ padding: `${SEC} 0` }}>
        <div style={W}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(32px,6vw,64px)', alignItems: 'center' }}>
            {/* Text side */}
            <div>
              <span style={{ display: 'inline-block', padding: '4px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '100px', fontSize: '12px', fontWeight: 500, color: '#2563eb', letterSpacing: '0.04em', marginBottom: '18px' }}>
                Video Editor · Motion Designer
              </span>
              <h1 style={{ fontSize: 'clamp(1.9rem,5vw,3.1rem)', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.18, color: '#0f172a', marginBottom: '16px' }}>
                Crafting stories<br />that <span style={{ color: '#2563eb' }}>move people.</span>
              </h1>
              <p style={{ fontSize: 'clamp(14px,1.6vw,15px)', color: '#6b7280', lineHeight: 1.78, maxWidth: '400px', marginBottom: '28px' }}>
                6+ years turning raw footage into cinematic work for global brands. Every cut is intentional.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link to="/work" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '11px 24px', borderRadius: '9px', background: '#2563eb', color: '#fff', fontSize: '14px', fontWeight: 500, textDecoration: 'none', boxShadow: '0 2px 12px rgba(37,99,235,0.25)', transition: 'all 0.2s' }}>
                  View Work →
                </Link>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '11px 24px', borderRadius: '9px', background: '#ffffff', color: '#374151', fontSize: '14px', fontWeight: 500, textDecoration: 'none', border: '1px solid #e2e8f0', transition: 'all 0.2s' }}>
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Photo */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ borderRadius: '14px', overflow: 'hidden', width: '100%', maxWidth: '380px', aspectRatio: '3/4', boxShadow: '0 8px 40px rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.08)' }}>
                <img src={heroPng} alt="Arnav Gupta"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOWREEL ──────────────────────────────────── */}
      <section style={{ background: 'rgba(255,255,255,0.55)', borderTop: '1px solid rgba(37,99,235,0.08)', borderBottom: '1px solid rgba(37,99,235,0.08)', padding: `${SEC} 0` }}>
        <div style={W}>
          <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#93c5fd', marginBottom: '14px' }}>Showreel</p>
          <h2 style={{ fontSize: 'clamp(1.2rem,2.8vw,1.7rem)', fontWeight: 600, letterSpacing: '-0.015em', color: '#0f172a', marginBottom: '20px' }}>See the work in motion.</h2>
          <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.08)' }}>
            <video ref={vRef} src={REEL} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} autoPlay muted loop playsInline />
            <button
              onClick={() => { if (vRef.current) { vRef.current.muted = !muted; setMuted(!muted) } }}
              style={{ position: 'absolute', bottom: '14px', right: '14px', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.35)', background: 'rgba(0,0,0,0.45)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-label="Toggle mute"
            >
              {muted
                ? <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                : <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              }
            </button>
          </div>
        </div>
      </section>

      {/* ── EXPLORE MY WORKS CARD ─────────────────────── */}
      <section style={{ padding: `${SEC} 0` }}>
        <div style={W}>
          <Link to="/work" style={{ textDecoration: 'none', display: 'block' }}>
            <div
              style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', height: 'clamp(180px,28vw,280px)', cursor: 'pointer', boxShadow: '0 4px 24px rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.1)', transition: 'transform 0.25s, box-shadow 0.25s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 12px 40px rgba(37,99,235,0.2)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 4px 24px rgba(37,99,235,0.12)' }}
            >
              <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1400&q=80" alt="" aria-hidden
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.38)' }} />
              {/* Blue gradient overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(37,99,235,0.6) 0%, rgba(15,23,42,0.5) 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '20px', textAlign: 'center' }}>
                <h2 style={{ fontSize: 'clamp(1.3rem,3.5vw,2rem)', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.01em', margin: 0 }}>
                  Explore My Works
                </h2>
                <p style={{ fontSize: 'clamp(13px,1.5vw,15px)', color: 'rgba(255,255,255,0.72)', margin: 0 }}>
                  Motion graphics · 3D rendering · 3D animation
                </p>
                <span style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 20px', borderRadius: '8px', background: '#ffffff', color: '#1e40af', fontSize: '14px', fontWeight: 600 }}>
                  View All Work →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────── */}
      <section style={{ background: 'rgba(255,255,255,0.55)', borderTop: '1px solid rgba(37,99,235,0.08)', borderBottom: '1px solid rgba(37,99,235,0.08)', padding: `${SEC} 0` }}>
        <div style={W}>
          <div style={{ maxWidth: '640px' }}>
            <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#93c5fd', marginBottom: '12px' }}>About</p>
            <h2 style={{ fontSize: 'clamp(1.2rem,3vw,1.75rem)', fontWeight: 600, letterSpacing: '-0.015em', color: '#0f172a', marginBottom: '14px' }}>
              I don't just edit footage — I engineer emotion.
            </h2>
            <p style={{ fontSize: 'clamp(14px,1.5vw,15px)', color: '#6b7280', lineHeight: 1.78, marginBottom: '20px' }}>
              Six years building visual narratives for brands across the globe.
              From motion graphics to 3D animation, every project starts with one question: what should the viewer <em>feel</em>?
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['After Effects', 'Cinema 4D', 'Blender', 'Unreal Engine', 'DaVinci Resolve', 'Premiere Pro'].map(t => (
                <span key={t} style={{ display: 'inline-block', padding: '5px 13px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '100px', fontSize: '12px', color: '#2563eb', fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS PREVIEW ──────────────────────── */}
      <section style={{ padding: `${SEC} 0` }}>
        <div style={W}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#93c5fd', marginBottom: '6px' }}>Testimonials</p>
              <h2 style={{ fontSize: 'clamp(1.2rem,2.8vw,1.6rem)', fontWeight: 600, letterSpacing: '-0.01em', color: '#0f172a', margin: 0 }}>What clients say</h2>
            </div>
            <Link to="/testimonials" style={{ fontSize: '14px', color: '#2563eb', fontWeight: 500, textDecoration: 'none' }}>All reviews →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
            {testimonials.slice(0, 3).map(t => (
              <div key={t.id} style={{ padding: '20px', background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(37,99,235,0.1)', borderRadius: '12px', backdropFilter: 'blur(8px)' }}>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '10px' }}>
                  {[...Array(5)].map((_,i) => <svg key={i} width="11" height="11" viewBox="0 0 10 10" fill="#f59e0b"><path d="M5 0l1.12 3.45H9.51L6.7 5.59l1.07 3.41L5 7.09l-2.77 1.91 1.07-3.41L.49 3.45H3.88z"/></svg>)}
                </div>
                <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.72, marginBottom: '12px' }}>"{t.text}"</p>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e40af' }}>{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)', padding: `${SEC} 0` }}>
        <div style={{ ...W, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,3.5vw,1.9rem)', fontWeight: 600, letterSpacing: '-0.01em', color: '#ffffff', marginBottom: '12px' }}>
            Have a project in mind?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', marginBottom: '24px' }}>Let's create something together.</p>
          <Link to="/contact" style={{ display: 'inline-flex', padding: '11px 28px', borderRadius: '9px', background: '#ffffff', color: '#1e40af', fontSize: '14px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
            Start a Project →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
