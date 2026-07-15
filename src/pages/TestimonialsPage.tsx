import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/data/projects'
import { ScrollMarquee } from '@/components/ui/ScrollMarquee'
import { Link } from 'react-router-dom'

function Stars() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 10 10" fill="#2563eb">
          <path d="M5 0l1.12 3.45H9.51L6.7 5.59l1.07 3.41L5 7.09l-2.77 1.91 1.07-3.41L.49 3.45H3.88z" />
        </svg>
      ))}
    </div>
  )
}

function VideoCard({ t, i }: { t: typeof testimonials[0]; i: number }) {
  const [open, setOpen] = useState(false)
  const vRef = useRef<HTMLVideoElement>(null)
  const doOpen  = () => { setOpen(true);  setTimeout(() => vRef.current?.play().catch(() => {}), 300) }
  const doClose = () => { setOpen(false); vRef.current?.pause() }

  return (
    <>
      <motion.div onClick={doOpen}
        className="relative overflow-hidden rounded-2xl cursor-pointer bg-navy"
        style={{ aspectRatio: '2/3' }}
        initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: i * 0.12 }}
        whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(37,99,235,0.28)' }}>

        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover"
          style={{ filter: 'saturate(0.4) brightness(0.65)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(37,99,235,0.06) 55%, transparent 100%)' }} />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ border: '2px solid rgba(96,165,250,0.55)', background: 'rgba(37,99,235,0.18)', backdropFilter: 'blur(8px)' }}
            whileHover={{ scale: 1.12, borderColor: '#60a5fa', background: 'rgba(37,99,235,0.4)' }}>
            <div style={{ width: 0, height: 0, borderLeft: '14px solid #60a5fa', borderTop: '9px solid transparent', borderBottom: '9px solid transparent', marginLeft: '4px' }} />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <Stars />
          <div className="font-syne font-semibold text-white mt-2.5 text-[16px]">{t.name}</div>
        </div>

        {/* Hover border */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
          style={{ border: '1px solid rgba(37,99,235,0.15)' }} />
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[9500] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0"
              style={{ background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(20px)' }}
              onClick={doClose} />
            <motion.div className="relative z-10 w-full max-w-3xl"
              initial={{ scale: 0.88, y: 40 }} animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 40 }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}>
              <div className="rounded-2xl overflow-hidden bg-navy shadow-2xl" style={{ aspectRatio: '16/9' }}>
                <video ref={vRef} src={t.videoUrl} className="w-full h-full" controls playsInline />
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <div className="font-syne font-semibold text-white text-[15px]">{t.name}</div>
                <button onClick={doClose}
                  className="font-outfit text-[12px] tracking-[0.14em] uppercase bg-transparent border-0 cursor-pointer"
                  style={{ color: '#475569' }}>
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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

export default function TestimonialsPage() {
  const vids = testimonials.filter(t => t.isVideo)
  const txts = testimonials.filter(t => !t.isVideo)

  return (
    <div className="min-h-screen bg-ice" style={{ paddingTop: '64px' }}>

      {/* Header */}
      <div className="bg-navy relative overflow-hidden py-14 md:py-20">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
        <div className="wrap relative z-10">
          <p className="label label-light mb-4">Client Voices</p>
          <div className="overflow-hidden">
            <motion.h1 className="font-syne font-extrabold text-white"
              style={{ fontSize: 'clamp(3rem,8vw,6.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
              initial={{ y: '100%' }} animate={{ y: '0%' }}
              transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}>
              Voices.
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="font-outfit text-muted text-[15px] mt-3 max-w-md">
            The work speaks. But so do the people who commissioned it.
          </motion.p>
        </div>
      </div>

      {/* Video testimonials */}
      <div className="wrap py-14 md:py-20">
        <p className="label mb-8">Video Testimonials — Click to Watch</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {vids.map((t, i) => <VideoCard key={t.id} t={t} i={i} />)}
        </div>
      </div>

      {/* Quote marquee */}
      <div className="bg-white overflow-hidden py-5" style={{ borderTop: '1px solid rgba(37,99,235,0.1)', borderBottom: '1px solid rgba(37,99,235,0.1)' }}>
        <ScrollMarquee
          items={['"Pure cinematic mastery."', '"Engineers emotion."', '"Changed how we think."', '"Absolutely spiritual."', '"Best in class."']}
          className="font-syne font-semibold italic text-lg text-faint"
          speed={20}
        />
      </div>

      {/* Written reviews */}
      <section className="bg-white py-16 md:py-24">
        <div className="wrap">
          <p className="label mb-10">Written Reviews</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {txts.map((t, i) => (
              <motion.div key={t.id} className="card p-6"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}>
                <Stars />
                <p className="font-outfit text-muted text-[14px] leading-relaxed my-4">"{t.text}"</p>
                <div className="pt-4" style={{ borderTop: '1px solid rgba(37,99,235,0.08)' }}>
                  <div className="font-syne font-semibold text-navy text-[13px]">{t.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="bg-blue-dim py-12 md:py-16" style={{ borderTop: '1px solid rgba(37,99,235,0.1)' }}>
        <div className="wrap">
          <p className="font-outfit text-[11px] tracking-[0.22em] uppercase text-faint text-center mb-8">Trusted By</p>
          <div className="overflow-hidden">
            <ScrollMarquee
              items={['Flow IQ', 'Cred', 'Parcel', 'Crizpo', 'VMG Digital', 'Schedule IQ', 'Prospect IQ', 'AI Cadence']}
              className="font-syne font-semibold tracking-[0.15em] uppercase text-[13px] text-faint"
              speed={20} sep="·"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue py-16 md:py-20">
        <div className="wrap flex flex-col items-center text-center gap-5">
          <motion.h2 className="font-syne font-extrabold text-white"
            style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: '-0.025em' }}
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Ready for your own success story?
          </motion.h2>
          <p className="font-outfit text-[15px]" style={{ color: 'rgba(255,255,255,0.68)' }}>
            Join 40+ global brands who trusted their vision to Arnav.
          </p>
          <Link to="/contact"><div className="btn-white-solid">Start a Project →</div></Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
