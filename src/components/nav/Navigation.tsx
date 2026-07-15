import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Work',         href: '/work' },
  { label: 'Testimonials', href: '/testimonials' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const loc = useLocation()

  // Is this the home page (dark hero)?
  const isHome = loc.pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => { setOpen(false) }, [loc.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // On home: white when not scrolled (over dark hero), dark when scrolled
  // On other pages: always dark (light page bg)
  const textColor   = isHome && !scrolled ? '#ffffff' : '#0f172a'
  const mutedColor  = isHome && !scrolled ? 'rgba(255,255,255,0.75)' : '#64748b'
  const barColor    = open ? '#ffffff' : textColor
  const headerBg    = scrolled || !isHome
    ? 'rgba(255,255,255,0.96)'
    : 'transparent'
  const headerBlur  = scrolled || !isHome ? 'blur(20px)' : 'none'
  const headerBorder = scrolled || !isHome ? '1px solid rgba(37,99,235,0.1)' : '1px solid transparent'

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0"
        style={{
          zIndex: 9100,
          background: headerBg,
          backdropFilter: headerBlur,
          borderBottom: headerBorder,
          transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="wrap flex items-center justify-between" style={{ height: '64px' }}>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 bg-blue rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-syne font-bold text-white text-sm">AG</span>
            </div>
            <span className="font-syne font-semibold text-[15px]"
              style={{ color: textColor, letterSpacing: '-0.01em', transition: 'color 0.3s' }}>
              Arnav Gupta
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => {
              const active = loc.pathname === l.href
              return (
                <Link key={l.href} to={l.href} className="no-underline">
                  <span className="block px-4 py-2 rounded-lg font-outfit font-medium text-[14px] transition-all duration-200"
                    style={{
                      color:      active ? '#2563eb' : mutedColor,
                      background: active ? '#eef1ff'  : 'transparent',
                    }}>
                    {l.label}
                  </span>
                </Link>
              )
            })}
            <Link to="/contact" className="no-underline ml-2">
              <motion.div className="btn-blue" style={{ padding: '9px 22px', fontSize: '13px' }}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                Hire Me
              </motion.div>
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden relative flex flex-col items-center justify-center gap-[5px]"
            style={{ width: '40px', height: '40px', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, zIndex: 9200, flexShrink: 0 }}
            onClick={() => setOpen(prev => !prev)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <motion.span style={{ display: 'block', height: '2px', width: '22px', borderRadius: '2px', background: barColor }}
              animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} transition={{ duration: 0.28 }} />
            <motion.span style={{ display: 'block', height: '2px', width: '15px', borderRadius: '2px', background: barColor, alignSelf: 'flex-start' }}
              animate={{ opacity: open ? 0 : 1, x: open ? -8 : 0 }} transition={{ duration: 0.22 }} />
            <motion.span style={{ display: 'block', height: '2px', width: '22px', borderRadius: '2px', background: barColor }}
              animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} transition={{ duration: 0.28 }} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 flex flex-col justify-center"
            style={{ zIndex: 9050, background: '#0f172a', padding: '0 clamp(24px,6vw,48px)' }}
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="absolute top-1/4 right-0 w-72 h-72 rounded-full pointer-events-none opacity-20"
              style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)', transform: 'translateX(30%)' }} />
            <nav className="flex flex-col gap-0 relative z-10">
              {[...links, { label: 'Contact', href: '/contact' }].map((l, i) => (
                <motion.div key={l.href}
                  initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.4 }}>
                  <Link to={l.href} className="block no-underline py-3"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <span className="font-syne font-bold"
                      style={{ fontSize: 'clamp(2rem,9vw,3.5rem)', letterSpacing: '-0.025em', color: loc.pathname === l.href ? '#60a5fa' : '#ffffff', lineHeight: 1.2 }}>
                      {l.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div className="absolute bottom-8 left-0 right-0 px-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}>
              <span className="font-outfit text-[11px] tracking-[0.18em] uppercase text-faint">Open to Projects</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
