import { useState, useRef } from 'react'
import { gsap } from 'gsap'

const WA = '919991118709'
// const WA = '917330985017'
const W: React.CSSProperties = { maxWidth: '960px', margin: '0 auto', padding: '0 20px' }

const inp: React.CSSProperties = {
  width: '100%', padding: '9px 0',
  background: 'transparent', border: 'none',
  borderBottom: '1px solid #ddd',
  fontSize: '13px', color: '#111',
  outline: 'none', fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.2s',
}
const lbl: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 500,
  letterSpacing: '0.06em', textTransform: 'uppercase',
  color: '#aaa', marginBottom: '4px',
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

export default function Contact() {
  const [form, setForm]    = useState({ name: '', type: '', message: '' })
  const [loading, setLoad] = useState(false)
  const btnRef             = useRef<HTMLButtonElement>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoad(true)
    const msg = [
      `*New Enquiry*`, ``,
      `*Name:* ${form.name}`,
      `*Type:* ${form.type || 'N/A'}`,
      `*Message:* ${form.message}`,
    ].join('\n')
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank')
    setLoad(false)
  }

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return
    const r = btnRef.current.getBoundingClientRect()
    gsap.to(btnRef.current, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.2,
      y: (e.clientY - (r.top + r.height / 2)) * 0.2,
      duration: 0.3, ease: 'power2.out',
    })
  }
  const onLeave = () => gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' })

  return (
    <div>
      <div style={{ ...W, padding: '28px 20px 60px' }}>

        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 500, color: '#111', letterSpacing: '-0.01em', marginBottom: '4px' }}>Contact</h1>
          <p style={{ fontSize: '12px', color: '#999' }}>Send me a message via WhatsApp.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px', alignItems: 'start' }}>

          {/* Form */}
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={lbl}>Name</label>
              <input name="name" type="text" placeholder="Your name"
                style={inp} value={form.name} onChange={onChange} required
                onFocus={e => { e.target.style.borderBottomColor = '#555' }}
                onBlur={e  => { e.target.style.borderBottomColor = '#ddd' }} />
            </div>
            <div>
              <label style={lbl}>Project type</label>
              <select name="type" style={{ ...inp, cursor: 'pointer' }}
                value={form.type} onChange={onChange}
                onFocus={e => { e.target.style.borderBottomColor = '#555' }}
                onBlur={e  => { e.target.style.borderBottomColor = '#ddd' }}>
                <option value="">Select…</option>
                {['Motion Graphics', '3D Rendering', '3D Animation', 'Brand Film', 'Other'].map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={lbl}>Message</label>
              <textarea name="message" rows={4} placeholder="Tell me about your project…"
                style={{ ...inp, resize: 'none' }}
                value={form.message} onChange={onChange}
                onFocus={e => { e.target.style.borderBottomColor = '#555' }}
                onBlur={e  => { e.target.style.borderBottomColor = '#ddd' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', paddingTop: '4px' }}>
              <span style={{ fontSize: '11px', color: '#bbb' }}>Opens WhatsApp</span>
              <button
                ref={btnRef} type="submit"
                onMouseMove={onMove} onMouseLeave={onLeave}
                style={{
                  padding: '8px 20px', borderRadius: '5px',
                  background: '#111', color: '#fff',
                  fontSize: '13px', fontWeight: 500, border: 'none', cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#333' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#111' }}
              >
                {loading ? 'Opening…' : 'Send message →'}
              </button>
            </div>
          </form>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', border: '1px solid #e5e5e5', borderRadius: '6px' }}>
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#aaa', marginBottom: '6px' }}>Response time</p>
              <p style={{ fontSize: '20px', fontWeight: 500, color: '#111', marginBottom: '4px' }}>&lt; 24 hours</p>
              <p style={{ fontSize: '12px', color: '#888' }}>Personal reply, no bots.</p>
            </div>
            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 14px', border: '1px solid #e5e5e5', borderRadius: '6px',
                fontSize: '13px', color: '#333', textDecoration: 'none',
                transition: 'border-color 0.18s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#aaa' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e5e5e5' }}
            >
             
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
