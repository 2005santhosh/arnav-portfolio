import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'

// const WA_NUMBER = '919991118709' // +91 9991118709
const WA_NUMBER = '917330985017'
const contactLinks = [
  // { l: 'Email',     v: 'hello@arnavgupta.in',   h: 'mailto:hello@arnavgupta.in',      icon: '✉' },
  // { l: 'Instagram', v: '@arnav.motion',          h: 'https://instagram.com',            icon: '◈' },
  // { l: 'LinkedIn',  v: 'linkedin.com/in/arnav', h: 'https://linkedin.com',             icon: '◇' },
  // { l: 'WhatsApp',  v: '+91 9991118709',         h: `https://wa.me/${WA_NUMBER}`,       icon: '◉' },
]

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

export default function ContactPage() {
  const [form, setForm]   = useState({ name: '', email: '', type: '', message: '' })
  const [sending, setSend] = useState(false)
  const btnRef             = useRef<HTMLButtonElement>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSend(true)
    // Build WhatsApp message
    const msg = [
      `*New Project Enquiry*`,
      ``,
      `*Name:* ${form.name}`,
      `*Email:* ${form.email}`,
      `*Project Type:* ${form.type || 'Not specified'}`,
      `*Message:* ${form.message}`,
    ].join('\n')
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
    setSend(false)
  }

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return
    const r = btnRef.current.getBoundingClientRect()
    gsap.to(btnRef.current, {
      x: (e.clientX - (r.left + r.width  / 2)) * 0.25,
      y: (e.clientY - (r.top  + r.height / 2)) * 0.25,
      duration: 0.35, ease: 'power2.out',
    })
  }
  const onMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' })
  }

  const fieldCls   = "w-full bg-transparent border-0 font-outfit text-[14px] text-navy outline-none py-3"
  const fieldStyle = { borderBottom: '1.5px solid rgba(37,99,235,0.2)' } as React.CSSProperties

  return (
    <div className="min-h-screen bg-ice" style={{ paddingTop: '64px' }}>

      {/* Navy header */}
      <div className="bg-navy relative overflow-hidden py-14 md:py-20">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)', transform: 'translate(-30%,30%)' }} />
        <div className="wrap relative z-10">
          <p className="label label-light mb-6">Get in Touch</p>
          {["Let's create", 'something', 'unforgettable.'].map((line, i) => (
            <div key={i} className="overflow-hidden" style={{ lineHeight: '1.04' }}>
              <motion.div className="font-syne font-extrabold"
                style={{ fontSize: 'clamp(2.4rem,6.5vw,5.8rem)', letterSpacing: '-0.03em', color: i === 1 ? '#60a5fa' : '#ffffff' }}
                initial={{ y: '108%' }} animate={{ y: '0%' }}
                transition={{ duration: 0.85, delay: 0.07 * i, ease: [0.23, 1, 0.32, 1] }}>
                {line}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Form + links */}
      <div className="wrap py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Form */}
          <motion.div className="lg:col-span-7"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.75 }}>
            <div className="bg-white rounded-2xl p-7 md:p-10"
              style={{ border: '1px solid rgba(37,99,235,0.1)', boxShadow: '0 8px 40px rgba(37,99,235,0.08)' }}>
              <form onSubmit={onSubmit} className="space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <div>
                    <label className="font-outfit text-[10px] tracking-[0.18em] uppercase text-faint block mb-2">Name</label>
                    <input name="name" type="text" placeholder="Your full name"
                      className={fieldCls} style={fieldStyle} value={form.name} onChange={onChange} required
                      onFocus={e => { e.target.style.borderBottomColor = '#2563eb' }}
                      onBlur={e  => { e.target.style.borderBottomColor = 'rgba(37,99,235,0.2)' }} />
                  </div>
                  <div>
                    <label className="font-outfit text-[10px] tracking-[0.18em] uppercase text-faint block mb-2">Email</label>
                    <input name="email" type="email" placeholder="hello@brand.com"
                      className={fieldCls} style={fieldStyle} value={form.email} onChange={onChange} required
                      onFocus={e => { e.target.style.borderBottomColor = '#2563eb' }}
                      onBlur={e  => { e.target.style.borderBottomColor = 'rgba(37,99,235,0.2)' }} />
                  </div>
                </div>
                <div>
                  <label className="font-outfit text-[10px] tracking-[0.18em] uppercase text-faint block mb-2">Project Type</label>
                  <select name="type" className={`${fieldCls} cursor-pointer`} style={fieldStyle}
                    value={form.type} onChange={onChange}
                    onFocus={e => { e.target.style.borderBottomColor = '#2563eb' }}
                    onBlur={e  => { e.target.style.borderBottomColor = 'rgba(37,99,235,0.2)' }}>
                    <option value="">Select type...</option>
                    {['Motion Graphics','3D Rendering','3D Animation','Brand Film','Other'].map(o => (
                      <option key={o} value={o.toLowerCase()}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-outfit text-[10px] tracking-[0.18em] uppercase text-faint block mb-2">Your Vision</label>
                  <textarea name="message" rows={4} placeholder="Describe your project, goals, timeline..."
                    className={`${fieldCls} resize-none`} style={fieldStyle}
                    value={form.message} onChange={onChange}
                    onFocus={e => { e.target.style.borderBottomColor = '#2563eb' }}
                    onBlur={e  => { e.target.style.borderBottomColor = 'rgba(37,99,235,0.2)' }} />
                </div>
                <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                  <span className="font-outfit text-[12px] text-faint">Opens WhatsApp with your message</span>
                  <motion.button ref={btnRef} type="submit" className="btn-blue"
                    style={{ padding: '13px 32px' }}
                    onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
                    whileTap={{ scale: 0.97 }}>
                    {sending ? (
                      <>
                        <motion.div className="w-4 h-4 rounded-full"
                          style={{ border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#ffffff' }}
                          animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                        Opening...
                      </>
                    ) : 'Send Message →'}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Right: info + links */}
          <motion.div className="lg:col-span-5 flex flex-col gap-4"
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.48, duration: 0.75 }}>

            <div className="bg-blue rounded-2xl p-6 md:p-7">
              <p className="font-outfit text-[10px] tracking-[0.18em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.55)' }}>Response Time</p>
              <div className="font-syne font-extrabold text-white mb-2" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', lineHeight: 1 }}>&lt; 24 hours</div>
              <p className="font-outfit text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
                No bots, no templates. Every message gets a personal reply.
              </p>
            </div>

            <p className="font-outfit text-[10px] tracking-[0.18em] uppercase text-faint px-1">Direct Contact</p>

            {contactLinks.map((lk, i) => (
              <motion.a key={lk.l} href={lk.h} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between bg-white rounded-xl p-4 no-underline"
                style={{ border: '1px solid rgba(37,99,235,0.1)', textDecoration: 'none' }}
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.58 + i * 0.07, duration: 0.45 }}
                whileHover={{ x: 4, borderColor: 'rgba(37,99,235,0.3)', boxShadow: '0 4px 20px rgba(37,99,235,0.1)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-dim flex items-center justify-center text-blue text-sm flex-shrink-0">
                    {lk.icon}
                  </div>
                  <div>
                    <div className="font-outfit text-[10px] tracking-[0.14em] uppercase text-faint mb-0.5">{lk.l}</div>
                    <div className="font-outfit text-[13px] font-medium" style={{ color: '#334155' }}>{lk.v}</div>
                  </div>
                </div>
                <svg width="12" height="12" fill="none" stroke="#94a3b8" strokeWidth="1.6" viewBox="0 0 12 12">
                  <path d="M1 11L11 1M11 1H3M11 1v8"/>
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
