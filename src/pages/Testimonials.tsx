import { testimonials } from '@/data/projects'
import { Link } from 'react-router-dom'

const W: React.CSSProperties = { maxWidth: '960px', margin: '0 auto', padding: '0 20px' }

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span style={{ fontSize: '11px', color: '#f59e0b', letterSpacing: '1px' }}>
      {'★'.repeat(n)}
    </span>
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

export default function Testimonials() {
  // All testimonials — show written only
  const all = testimonials

  return (
    <div>
      <div style={{ ...W, padding: '28px 20px 60px' }}>

        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 500, color: '#111', letterSpacing: '-0.01em', marginBottom: '4px' }}>Testimonials</h1>
          <p style={{ fontSize: '12px', color: '#999' }}>What clients say.</p>
        </div>

        {/* All reviews as a simple list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '1px solid #e5e5e5', borderRadius: '6px', overflow: 'hidden', marginBottom: '36px' }}>
          {all.map((t, i) => (
            <div key={t.id} style={{ padding: '16px', background: '#fff', borderTop: i > 0 ? '1px solid #f0f0f0' : 'none' }}>
              <Stars n={t.rating} />
              <p style={{ fontSize: '13px', color: '#333', lineHeight: 1.65, margin: '6px 0 8px' }}>"{t.text}"</p>
              <p style={{ fontSize: '12px', fontWeight: 500, color: '#111' }}>{t.name}</p>
            </div>
          ))}
        </div>

        {/* Clients */}
        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '24px', marginBottom: '32px' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: '12px' }}>Clients</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Flow IQ','Cred','Parcel','Crizpo','VMG Digital','Schedule IQ','Prospect IQ','AI Cadence'].map(b => (
              <span key={b} style={{ padding: '4px 10px', border: '1px solid #e5e5e5', borderRadius: '4px', fontSize: '12px', color: '#666' }}>{b}</span>
            ))}
          </div>
        </div>

        <Link to="/contact" style={{ fontSize: '13px', color: '#333', borderBottom: '1px solid #ddd', paddingBottom: '1px' }}>
          Work with me →
        </Link>
      </div>

      <Footer />
    </div>
  )
}
