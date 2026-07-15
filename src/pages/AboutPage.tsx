import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ScrollMarquee } from '@/components/ui/ScrollMarquee'

const timeline = [
  { y: '2018', t: 'The Beginning',       d: 'Started freelancing. First client was a local streetwear brand. Learned more in 3 months than any classroom.' },
  { y: '2019', t: 'Finding Motion',      d: 'Discovered motion graphics. First music video went viral. Editing was just the start.' },
  { y: '2020', t: 'Mastering 3D',        d: 'Deep dive into Cinema 4D and Octane. First national brand film.' },
  { y: '2021', t: 'Going Global',        d: '20+ agency collabs across India and Middle East. First Awwwards nomination.' },
  { y: '2022', t: 'Studio Founded',      d: 'Founded Arnav Studio. Full focus on 3D world-building, VFX, and brand storytelling.' },
  { y: '2023', t: 'World-Class Clients', d: 'Projects for SpaceX, McLaren, Porsche. Work started speaking louder than any bio.' },
  { y: '2024', t: 'Leading Campaigns',   d: 'Leading full visual identity campaigns for tier-1 global brands.' },
]
const tools = [
  { n: 'After Effects', p: 98 }, { n: 'Cinema 4D', p: 95 }, { n: 'Blender', p: 90 },
  { n: 'Unreal Engine', p: 82 }, { n: 'DaVinci Resolve', p: 92 }, { n: 'Octane Render', p: 88 },
  { n: 'Premiere Pro', p: 96 }, { n: 'Houdini', p: 70 },
]
const awards = ['Awwwards Nominee','FWA Featured','Motion Design Award','ADMA Gold','Best Showreel','Behance Featured','D&AD Pencil','Cannes Lions']

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

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: '64px' }}>

      {/* ── Hero ── */}
      <section ref={heroRef} className="bg-navy relative overflow-hidden py-16 md:py-24">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
        <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <div>
            <p className="label label-light mb-6">The Director</p>
            <div className="overflow-hidden mb-1">
              <motion.h1 className="font-syne font-extrabold text-white"
                style={{ fontSize: 'clamp(3rem,8vw,7rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
                initial={{ y: '100%' }} animate={{ y: '0%' }}
                transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}>Arnav</motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1 className="font-syne font-extrabold text-blue-light"
                style={{ fontSize: 'clamp(3rem,8vw,7rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
                initial={{ y: '100%' }} animate={{ y: '0%' }}
                transition={{ duration: 0.85, delay: 0.07, ease: [0.23, 1, 0.32, 1] }}>Gupta.</motion.h1>
            </div>
            <motion.p className="font-outfit text-faint leading-relaxed max-w-md mb-8"
              style={{ fontSize: 'clamp(14px,1.6vw,16px)', lineHeight: 1.8 }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              Motion director and 3D artist. Six years building visual worlds
              for brands that refuse to be ordinary.
            </motion.p>
            <motion.div className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
              <Link to="/contact"><div className="btn-blue">Work With Me →</div></Link>
              <Link to="/work"><div className="btn-ghost-white">See My Work</div></Link>
            </motion.div>
          </div>

          <motion.div className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.85 }}>
            <motion.div className="rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '3/4', y: imgY }}>
              <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&q=85"
                alt="Arnav Gupta" className="w-full h-full object-cover"
                style={{ filter: 'saturate(0.78) contrast(1.04)' }} />
              <div className="absolute inset-0 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, transparent 60%)' }} />
            </motion.div>
            <motion.div className="absolute card bottom-5 left-5 px-4 py-3 shadow-xl"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
              <div className="font-outfit text-[10px] tracking-[0.18em] uppercase text-faint mb-1">Available for</div>
              <div className="font-syne font-semibold text-navy text-[15px]">Global Projects</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="bg-blue-dim overflow-hidden py-4" style={{ borderTop: '1px solid rgba(37,99,235,0.1)', borderBottom: '1px solid rgba(37,99,235,0.1)' }}>
        <ScrollMarquee items={['Motion Director','3D Artist','Visual Storyteller','Brand Filmmaker','CGI Creator','Unreal Engine Dev']}
          className="font-syne font-semibold tracking-widest uppercase text-blue text-[11px]" speed={25} />
      </div>

      {/* ── Philosophy ── */}
      <section className="bg-ice py-16 md:py-24">
        <div className="wrap max-w-3xl">
          <p className="label mb-6">Philosophy</p>
          <blockquote className="font-syne font-bold text-navy mb-5"
            style={{ fontSize: 'clamp(1.5rem,3.5vw,2.6rem)', letterSpacing: '-0.022em', lineHeight: 1.25 }}>
            "A frame that doesn't create <span className="text-blue">feeling</span> has no reason to exist."
          </blockquote>
          <p className="font-outfit text-muted text-[15px] leading-relaxed">
            That principle drives every decision — from the first cut to the final grade.
          </p>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="wrap">
          <p className="label mb-12">The Journey</p>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px hidden md:block"
              style={{ background: 'rgba(37,99,235,0.12)' }} />
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <motion.div key={item.y} className="flex gap-8 md:gap-12 group"
                  initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.06 }}>
                  <div className="flex-shrink-0 w-12 text-right pt-5">
                    <span className="font-outfit text-[10px] tracking-[0.14em] text-faint uppercase">{item.y}</span>
                  </div>
                  <div className="hidden md:flex flex-shrink-0 items-start pt-6">
                    <div className="w-2.5 h-2.5 rounded-full border-2 bg-white transition-colors duration-300"
                      style={{ borderColor: 'rgba(37,99,235,0.3)' }} />
                  </div>
                  <div className="flex-1 py-5" style={{ borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
                    <div className="font-syne font-semibold text-navy text-[14px] mb-1.5">{item.t}</div>
                    <div className="font-outfit text-muted text-[13px] leading-relaxed">{item.d}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Toolbox ── */}
      <section className="bg-ice py-16 md:py-24">
        <div className="wrap">
          <p className="label mb-12">Toolbox</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-7 max-w-3xl">
            {tools.map((t, i) => (
              <motion.div key={t.n} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div className="flex justify-between mb-2">
                  <span className="font-outfit text-[13px] font-medium text-navy-3">{t.n}</span>
                  <span className="font-outfit text-[12px] text-faint">{t.p}%</span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(37,99,235,0.12)' }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: 'linear-gradient(to right, #2563eb, #60a5fa)' }}
                    initial={{ width: 0 }} whileInView={{ width: `${t.p}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="wrap">
          <p className="label mb-12">Recognition</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {awards.map((a, i) => (
              <motion.div key={a} className="card p-5"
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="w-8 h-8 rounded-lg bg-blue-dim flex items-center justify-center mb-3">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="#2563eb">
                    <path d="M5 0l1.12 3.45H9.51L6.7 5.59l1.07 3.41L5 7.09l-2.77 1.91 1.07-3.41L.49 3.45H3.88z"/>
                  </svg>
                </div>
                <div className="font-syne font-semibold text-navy text-[13px]">{a}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
