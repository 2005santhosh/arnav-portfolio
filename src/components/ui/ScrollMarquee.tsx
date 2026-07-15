import { useAnimationFrame, useMotionValue, useTransform, motion } from 'framer-motion'

interface Props { items: string[]; direction?: 'left'|'right'; speed?: number; className?: string; sep?: string }

export function ScrollMarquee({ items, direction='left', speed=35, className='', sep='·' }: Props) {
  const x0 = useMotionValue(0)
  const x  = useTransform(x0, v => `${v}%`)
  useAnimationFrame((_, dt) => {
    const mv = direction==='left' ? -speed : speed
    x0.set(x0.get() + (mv * dt) / 10000)
    if (direction==='left'  && x0.get() < -50) x0.set(0)
    if (direction==='right' && x0.get() > 0)   x0.set(-50)
  })
  const all = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', userSelect: 'none' }} className={className}>
      <motion.div style={{ display: 'inline-flex', alignItems: 'center', x }}>
        {all.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', marginRight: '16px' }}>
            <span>{item}</span>
            <span style={{ opacity: 0.3, fontSize: '0.7em' }}>{sep}</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
