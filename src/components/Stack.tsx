import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionHeader from './SectionHeader'
import styles from './Stack.module.css'

interface StackItem {
  name: string
  type: string
  featured?: boolean
  color?: string
}

const ITEMS: StackItem[] = [
  { name: 'TypeScript',    type: 'Language',       featured: true,  color: '#3178C6' },
  { name: 'React',         type: 'UI Framework',   featured: true,  color: '#61DAFB' },
  { name: 'Next.js',       type: 'Full-stack',     featured: true,  color: '#FFFFFF' },
  { name: 'Node.js',       type: 'Runtime',        featured: true,  color: '#83CD29' },
  { name: 'Three.js',      type: '3D / WebGL',     color: '#049EF4' },
  { name: 'Svelte',        type: 'UI Framework',   color: '#FF3E00' },
  { name: 'Gatsby',        type: 'Static Sites',   color: '#663399' },
  { name: 'Tailwind CSS',  type: 'Styling',        color: '#38BDF8' },
  { name: 'Storybook',     type: 'Design Systems', color: '#FF4785' },
  { name: 'Express',       type: 'Backend',        color: '#868686' },
  { name: 'MongoDB',       type: 'Database',       color: '#47A248' },
  { name: 'Jest',          type: 'Testing',        color: '#C21325' },
  { name: 'Heroku',        type: 'Deployment',     color: '#430098' },
  { name: 'AI / LLMs',     type: 'Emerging Tech',  color: '#7B6FFF' },
]

export default function Stack() {
  const { ref, visible } = useScrollReveal()

  return (
    <section id="stack" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader num="01" title="Tech Stack" />
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`${styles.grid} ${visible ? styles.visible : ''}`}
        >
          {ITEMS.map((item, i) => (
            <div
              key={item.name}
              className={`${styles.card} ${item.featured ? styles.featured : ''}`}
              style={{ transitionDelay: `${i * 0.04}s` }}
            >
              <span
                className={styles.indicator}
                style={{ background: item.color ?? 'var(--violet)' }}
              />
              <span className={styles.name}>{item.name}</span>
              <span className={styles.type}>{item.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
