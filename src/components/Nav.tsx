import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'Work',         href: '/' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact',      href: '/contact' },
]

export function Nav() {
  const [open,    setOpen]    = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => { setOpen(false) }, [loc.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  /* active: work page = /, others exact match */
  const isActive = (href: string) =>
    href === '/' ? loc.pathname === '/' || loc.pathname.startsWith('/work')
                 : loc.pathname === href

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: '52px',
        background: '#fff',
        borderBottom: '1px solid #e5e5e5',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          width: '100%', maxWidth: '960px', margin: '0 auto',
          padding: '0 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Name / logo */}
          <Link to="/" style={{ fontWeight: 500, fontSize: '14px', color: '#111', letterSpacing: '-0.01em' }}>
            Arnav Gupta
          </Link>

          {/* Desktop links */}
          {!isMobile && (
            <nav style={{ display: 'flex', gap: '4px' }}>
              {links.map(l => (
                <Link key={l.href} to={l.href} style={{
                  padding: '5px 12px', borderRadius: '6px', fontSize: '13px',
                  fontWeight: isActive(l.href) ? 500 : 400,
                  color: isActive(l.href) ? '#111' : '#666',
                  background: isActive(l.href) ? '#f3f3f3' : 'transparent',
                  transition: 'background 0.15s, color 0.15s',
                }}>
                  {l.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setOpen(o => !o)}
              aria-label="Menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
              <span style={{ display: 'block', width: '18px', height: '1.5px', background: '#333', borderRadius: '2px', transform: open ? 'translateY(5.5px) rotate(45deg)' : 'none', transition: 'transform 0.22s' }} />
              <span style={{ display: 'block', width: '12px', height: '1.5px', background: '#333', borderRadius: '2px', opacity: open ? 0 : 1, transition: 'opacity 0.15s' }} />
              <span style={{ display: 'block', width: '18px', height: '1.5px', background: '#333', borderRadius: '2px', transform: open ? 'translateY(-5.5px) rotate(-45deg)' : 'none', transition: 'transform 0.22s' }} />
            </button>
          )}
        </div>
      </header>

      {/* Mobile dropdown */}
      {isMobile && (
        <div style={{
          position: 'fixed', top: '52px', left: 0, right: 0, zIndex: 99,
          background: '#fff', borderBottom: open ? '1px solid #e5e5e5' : 'none',
          maxHeight: open ? '200px' : '0', overflow: 'hidden',
          transition: 'max-height 0.28s ease',
        }}>
          {links.map(l => (
            <Link key={l.href} to={l.href} style={{
              display: 'block', padding: '13px 20px', fontSize: '15px',
              fontWeight: isActive(l.href) ? 500 : 400,
              color: isActive(l.href) ? '#111' : '#555',
              borderBottom: '1px solid #f5f5f5',
            }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
