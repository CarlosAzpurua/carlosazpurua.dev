import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Stats.module.css'

const STATS = [
  { num: '7+', label: 'Years of\nexperience' },
  { num: '11',  label: 'Projects\ndelivered' },
  { num: '7',  label: 'Max team\nsize led' },
  { num: '6',  label: 'Companies\nworked with' },
]

export default function Stats() {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${styles.row} ${visible ? styles.visible : ''}`}
    >
      {STATS.map((s, i) => (
        <div key={i} className={styles.item} style={{ transitionDelay: `${i * 0.08}s` }}>
          <span className={styles.num}>{s.num}</span>
          <span className={styles.label}>{s.label}</span>
        </div>
      ))}
    </div>
  )
}
