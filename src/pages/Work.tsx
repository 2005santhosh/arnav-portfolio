import { useNavigate } from 'react-router-dom'

const W: React.CSSProperties = { maxWidth: '960px', margin: '0 auto', padding: '0 20px' }

const CATS = [
  {
    key: 'motion',
    label: 'Motion Graphics',
    bg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMUYgXfOl1XUSJIDjVeSM4WZ_W0m1GmKvdO5MJ0ei87Q-J1h5nQdjH-OIg&s=10',
  },
  {
    key: 'animation',
    label: '3D Animation',
    bg: 'https://www.toolbox-studio.com/blog/wp-content/uploads/2022/11/3d-animation-production.jpg',
  },
]

export default function Work() {
  const navigate = useNavigate()

  return (
    <div style={{ ...W, padding: '36px 20px 60px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 500, color: '#111', letterSpacing: '-0.02em', marginBottom: '4px' }}>
          Arnav Gupta
        </h1>
        
      </div>

      {/* 3 category cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '12px',
      }}>
        {CATS.map(c => (
          <button
            key={c.key}
            onClick={() => navigate(`/work/${c.key}`)}
            style={{
              position: 'relative', overflow: 'hidden',
              borderRadius: '8px', aspectRatio: '4/3',
              border: '1px solid #e0e0e0',
              cursor: 'pointer', padding: 0, background: 'none', display: 'block', width: '100%',
              transition: 'border-color 0.18s, box-shadow 0.18s',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#aaa'; el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#e0e0e0'; el.style.boxShadow = 'none' }}
          >
            <img
              src={c.bg}
              alt={c.label}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }}
            />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: '14px' }}>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#fff' }}>{c.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
