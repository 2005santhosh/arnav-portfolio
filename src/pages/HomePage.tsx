import { useRef, useState, useEffect, useCallback } from 'react'
import heroPng from '@/assets/hero.png'
import hero1Png from '@/assets/hero1.png'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, testimonials } from '@/data/projects'
import { ScrollMarquee } from '@/components/ui/ScrollMarquee'
gsap.registerPlugin(ScrollTrigger)

const REEL_VIDEO = '/videos/AI Cadence.mp4'

/* ══════════════════════════════════════════════════════
   HERO IMAGE
   hero.png always fully visible.
   On hover → hero1.png fades in ONLY in a soft radial
   zone around the cursor. Outside the zone it stays hidden.
══════════════════════════════════════════════════════ */
function HeroImage() {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current
    const bt = bottomRef.current
    if (!el || !bt) return
    const rect = el.getBoundingClientRect()
    const xPct = ((e.clientX - rect.left) / rect.width  * 100).toFixed(2)
    const yPct = ((e.clientY - rect.top)  / rect.height * 100).toFixed(2)
    // Soft radial mask on the bottom layer:
    // opaque at cursor center, fades to transparent at edges → only visible near cursor
    const mask = `radial-gradient(circle 130px at ${xPct}% ${yPct}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 100%)`
    bt.style.maskImage = mask
    ;(bt.style as any).webkitMaskImage = mask
  }, [])

  const handleEnter = () => {
    setHovered(true)
    const bt = bottomRef.current
    if (bt) bt.style.opacity = '1'
  }

  const handleLeave = () => {
    setHovered(false)
    const bt = bottomRef.current
    if (!bt) return
    bt.style.opacity = '0'
    bt.style.maskImage = ''
    ;(bt.style as any).webkitMaskImage = ''
  }

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden rounded-2xl shadow-2xl select-none"
      style={{ width: '100%', height: 'min(calc(100vh - 220px), 520px)' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* ── Top (always visible): hero.png ── */}
      <img
        src={heroPng}
        alt="Arnav Gupta"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
        style={{ filter: 'saturate(0.82) contrast(1.06)' }}
      />

      {/* ── Bottom (hidden by default, revealed by mask on hover): hero1.png ── */}
      <div
        ref={bottomRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0, transition: 'opacity 0.25s ease' }}
      >
        <img
          src={hero1Png}
          alt=""
          aria-hidden
          draggable={false}
          className="w-full h-full object-cover object-top"
          style={{ filter: 'saturate(0.88) contrast(1.06)', display: 'block' }}
        />
      </div>

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ boxShadow: hovered ? 'inset 0 0 0 1.5px rgba(96,165,250,0.3)' : 'inset 0 0 0 1px rgba(255,255,255,0.07)' }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}

function Hero() {
  const headRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headRef.current) return
    const words = headRef.current.querySelectorAll<HTMLElement>('.hero-word')
    gsap.fromTo(words,
      { y: '110%' },
      { y: '0%', duration: 1.0, stagger: 0.09, ease: 'power4.out', delay: 0.15 }
    )
  }, [])

  return (
    <section className="relative h-screen flex flex-col bg-navy overflow-hidden pt-16">
      {/* Glow orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-25"
        style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)', transform: 'translate(30%,-20%)' }} />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)', transform: 'translate(-30%,20%)' }} />

      <div className="wrap flex-1 flex flex-col py-4 md:py-5 relative z-10 overflow-hidden">
        {/* Top bar — availability only, no location */}
        <motion.div className="flex items-center justify-end pb-4 mb-4 md:mb-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-2">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="font-outfit text-[10px] tracking-[0.16em] uppercase text-faint">Open to projects</span>
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center min-h-0">
          {/* Left: text */}
          <div>
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
              style={{ background: 'rgba(37,99,235,0.18)', border: '1px solid rgba(37,99,235,0.35)' }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-light" />
              <span className="font-outfit text-[11px] font-medium text-blue-light tracking-wide">Award-winning Video Editor</span>
            </motion.div>

            <div ref={headRef} className="mb-4">
              {[
                { t: 'Crafting',  c: 'text-white'      },
                { t: 'Stories',   c: 'text-blue-light'  },
                { t: 'That Move', c: 'text-white'       },
                { t: 'People.',   c: 'text-white'       },
              ].map((l, i) => (
                <div key={i} className="overflow-hidden" style={{ lineHeight: '1.06' }}>
                  <span className={`hero-word font-syne inline-block font-extrabold ${l.c}`}
                    style={{ fontSize: 'clamp(2rem,4.8vw,4.5rem)', letterSpacing: '-0.03em', transform: 'translateY(110%)' }}>
                    {l.t}
                  </span>
                </div>
              ))}
            </div>

            <motion.p className="font-outfit text-faint max-w-md mb-5 hidden md:block"
              style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
              6+ years. 200+ projects. 40+ global brands. I transform raw footage into
              cinematic experiences that stop the scroll and start conversations.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }}>
              <Link to="/work"><div className="btn-blue" style={{ padding: '10px 22px', fontSize: '13px' }}>View My Work →</div></Link>
              <Link to="/contact"><div className="btn-ghost-white" style={{ padding: '10px 22px', fontSize: '13px' }}>Let's Talk</div></Link>
            </motion.div>
          </div>

          {/* Right: dual-image hover reveal */}
          <motion.div className="relative hidden lg:flex items-center justify-center h-full"
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.23, 1, 0.32, 1] }}>
            <HeroImage />
          </motion.div>
        </div>

        {/* NO stats row */}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   TOOL MARQUEE
══════════════════════════════════════════════════════ */
function ToolStrip() {
  return (
    <div className="bg-blue-dim divider-light overflow-hidden py-4" style={{ borderTop: '1px solid rgba(37,99,235,0.1)', borderBottom: '1px solid rgba(37,99,235,0.1)' }}>
      <ScrollMarquee
        items={['After Effects','Cinema 4D','Blender','Unreal Engine','DaVinci Resolve','Premiere Pro','Octane Render','Redshift','Houdini']}
        className="font-syne font-semibold tracking-widest uppercase text-blue text-[11px]"
        speed={30} sep="/"
      />
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   FEATURED REEL
══════════════════════════════════════════════════════ */
function Reel() {
  const [muted, setMuted] = useState(true)
  const vRef = useRef<HTMLVideoElement>(null)

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="wrap">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="label mb-3">Showreel 2024</p>
            <h2 className="font-syne font-bold text-navy" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: '-0.025em' }}>
              See the work <span className="text-blue">in motion.</span>
            </h2>
          </div>
          <Link to="/work"><div className="btn-outline" style={{ padding: '10px 22px', fontSize: '13px' }}>All Projects</div></Link>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ boxShadow: '0 24px 80px rgba(37,99,235,0.18)' }}>
          <video ref={vRef} src={REEL_VIDEO}
            className="w-full block" style={{ aspectRatio: '16/9', objectFit: 'cover' }}
            autoPlay muted loop playsInline />
          {/* Bottom overlay */}
          <div className="absolute inset-0 flex items-end p-6 md:p-8"
            style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.75) 0%, transparent 55%)' }}>
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="font-outfit text-[11px] tracking-[0.2em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Featured</p>
                <h3 className="font-syne font-bold text-white" style={{ fontSize: 'clamp(1rem,2vw,1.4rem)' }}>Arnav Gupta — Showreel</h3>
              </div>
              <button
                onClick={() => { if (vRef.current) { vRef.current.muted = !muted; setMuted(!muted) } }}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{ border: '1.5px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.8)', cursor: 'pointer' }}>
                {muted
                  ? <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                  : <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════════════════════ */
function ProjectCard({ p, large = false }: { p: typeof projects[0]; large?: boolean }) {
  const vRef = useRef<HTMLVideoElement>(null)
  const [hov, setHov] = useState(false)
  const catMap: Record<string, string> = { motion: 'Motion', render: '3D Render', animation: '3D Anim.' }
  const aspect = large ? 'aspect-[4/3]' : 'aspect-video'

  return (
    <Link to="/work" className="block h-full group">
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-navy-2 h-full cursor-pointer"
        style={{ border: '1px solid rgba(37,99,235,0.12)' }}
        onMouseEnter={() => { setHov(true); vRef.current?.play().catch(() => {}) }}
        onMouseLeave={() => { setHov(false); if (vRef.current) { vRef.current.pause(); vRef.current.currentTime = 0 } }}
        whileHover={{ y: -5, borderColor: 'rgba(37,99,235,0.4)', boxShadow: '0 24px 60px rgba(37,99,235,0.18)' }}
        transition={{ duration: 0.35 }}
      >
        <div className={`relative overflow-hidden ${aspect}`}>
          <motion.img src={p.thumbnail} alt={p.title}
            className="w-full h-full object-cover"
            style={{ filter: 'saturate(0.7) brightness(0.85)' }}
            animate={{ scale: hov ? 1.07 : 1 }} transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }} />
          <motion.video ref={vRef} src={p.videoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            muted loop playsInline
            animate={{ opacity: hov ? 0.85 : 0 }} transition={{ duration: 0.35 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.88) 0%, transparent 55%)' }} />
          <div className="absolute top-3 left-3">
            <span className="tag tag-dark font-outfit" style={{ fontSize: '10px' }}>{catMap[p.category]}</span>
          </div>
          <span className="absolute top-3 right-3 font-outfit text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{p.year}</span>
          <motion.div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-blue flex items-center justify-center"
            animate={{ opacity: hov ? 1 : 0, scale: hov ? 1 : 0.5 }} transition={{ duration: 0.22 }}>
            <svg width="9" height="9" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 10 10"><path d="M1 9L9 1M9 1H2M9 1v7"/></svg>
          </motion.div>
        </div>
        <div className="px-5 py-4">
          <div className="font-syne font-semibold text-white mb-1" style={{ fontSize: 'clamp(13px,1.4vw,15px)', letterSpacing: '-0.01em' }}>{p.title}</div>
          <div className="flex items-center justify-between">
            <span className="font-outfit text-[12px] text-faint">{p.client}</span>
            <span className="font-outfit text-[12px] text-faint">{p.year}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

/* ══════════════════════════════════════════════════════
   SELECTED WORK
══════════════════════════════════════════════════════ */
function SelectedWork() {
  const featured = projects.filter(p => p.featured).slice(0, 5)
  return (
    <section className="bg-ice py-20 md:py-28">
      <div className="wrap">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="label mb-3">Selected Work</p>
            <h2 className="font-syne font-bold text-navy" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: '-0.025em' }}>
              Recent <span className="text-blue">projects.</span>
            </h2>
          </div>
          <Link to="/work"><div className="btn-outline" style={{ padding: '10px 22px', fontSize: '13px' }}>View All Work →</div></Link>
        </div>

        {/* Bento layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-7">{featured[0] && <ProjectCard p={featured[0]} large />}</div>
          <div className="md:col-span-5 flex flex-col gap-4">
            {featured[1] && <ProjectCard p={featured[1]} />}
            {featured[2] && <ProjectCard p={featured[2]} />}
          </div>
          <div className="md:col-span-5">{featured[3] && <ProjectCard p={featured[3]} />}</div>
          <div className="md:col-span-7">{featured[4] && <ProjectCard p={featured[4]} large />}</div>
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link to="/work"><div className="btn-outline">View All Work →</div></Link>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   ABOUT TEASER
══════════════════════════════════════════════════════ */
function AboutTeaser() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="label mb-5">About Arnav</p>
            <h2 className="font-syne font-bold text-navy mb-5" style={{ fontSize: 'clamp(1.7rem,3.8vw,3rem)', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
              "I don't just cut footage —<br />
              I <span className="text-blue">engineer emotion.</span>"
            </h2>
            <p className="font-outfit text-muted leading-relaxed mb-8 max-w-md" style={{ fontSize: 'clamp(14px,1.5vw,16px)', lineHeight: 1.8 }}>
              Six years crafting visual narratives for the world's top brands.
              Every project starts with one question: what should the viewer <em>feel</em>?
            </p>
            <div className="flex flex-wrap gap-2">
              {['After Effects', 'Cinema 4D', 'Blender', 'Unreal Engine', 'DaVinci Resolve'].map(s => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </motion.div>

          <motion.div className="relative"
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.85 }}>
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/5', boxShadow: '0 32px 80px rgba(37,99,235,0.14)' }}>
              <img src={hero1Png} alt="Arnav at work" className="w-full h-full object-cover"
                style={{ filter: 'saturate(0.8) contrast(1.04)' }} />
              <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, transparent 60%)' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   TESTIMONIALS PREVIEW
══════════════════════════════════════════════════════ */
function TestimonialsPreview() {
  return (
    <section className="bg-navy py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
      <div className="wrap relative z-10">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="label label-light mb-3">Client Voices</p>
            <h2 className="font-syne font-bold text-white" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: '-0.025em' }}>
              What they <span className="text-blue-light">say.</span>
            </h2>
          </div>
          <Link to="/testimonials"><div className="btn-ghost-white" style={{ padding: '10px 22px', fontSize: '13px' }}>All Reviews</div></Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div key={t.id} className="card-dark p-6"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <svg key={j} width="10" height="10" viewBox="0 0 10 10" fill="#60a5fa"><path d="M5 0l1.12 3.45H9.51L6.7 5.59l1.07 3.41L5 7.09l-2.77 1.91 1.07-3.41L.49 3.45H3.88z"/></svg>)}
              </div>
              <p className="font-outfit text-faint text-[14px] leading-relaxed mb-5">"{t.text}"</p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '14px' }}>
                <div className="font-syne font-semibold text-white text-[13px]">{t.name}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   CTA BANNER
══════════════════════════════════════════════════════ */
function CTABanner() {
  return (
    <section className="bg-blue relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.07) 0%, transparent 60%)' }} />
      <div className="wrap relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="font-syne font-extrabold text-white mb-3" style={{ fontSize: 'clamp(2rem,5vw,4rem)', letterSpacing: '-0.028em', lineHeight: 1.08 }}>
              Ready to create<br />something unforgettable?
            </h2>
            <p className="font-outfit text-[15px] leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.65)' }}>
              From brand films to 3D animations — let's make something that leaves a mark.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <Link to="/contact"><div className="btn-white-solid">Start a Project →</div></Link>
            <Link to="/work"><div className="btn-ghost-white">View Portfolio</div></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════ */
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
        <div className="font-outfit text-[12px] text-faint">Open to projects</div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolStrip />
      <Reel />
      <SelectedWork />
      <AboutTeaser />
      <TestimonialsPreview />
      <CTABanner />
      <Footer />
    </>
  )
}
