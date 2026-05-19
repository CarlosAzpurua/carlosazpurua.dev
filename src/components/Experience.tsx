import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionHeader from './SectionHeader'
import styles from './Experience.module.css'

interface ExpItem {
  company: string
  period: string
  role: string
  desc: string
  tags: string[]
  badge?: { label: string; type: 'current' | 'lead' | 'mentor' | 'first' }
}

const EXPERIENCE: ExpItem[] = [
  {
    company: 'Smartjob',
    period: 'Current',
    role: 'Sr. Fullstack Engineer',
    desc: 'Building the full visual product and fast shipping system for Falabella — one of Latin America\'s largest retail groups. End-to-end ownership of the e-commerce frontend architecture.',
    tags: ['React', 'TypeScript', 'E-commerce', 'Fast Shipping'],
    badge: { label: 'Active', type: 'current' },
  },
  {
    company: 'Globant',
    period: 'Previous',
    role: 'Sr. Fullstack Engineer — Tech Lead',
    desc: 'Led the security codebase for Red Sea Global. Drove Storybook adoption and internal component library creation to support the system architect and unify design system standards across teams.',
    tags: ['React', 'Storybook', 'Design Systems', 'Leadership'],
    badge: { label: 'Tech Lead', type: 'lead' },
  },
  {
    company: 'AImpact',
    period: 'Previous',
    role: 'Sr. Fullstack Engineer',
    desc: 'Developed an AI-powered educational assistance system using a proprietary framework. Contributed to architecture decisions and grew both the product and the framework\'s core codebase.',
    tags: ['AI', 'Education Tech', 'Architecture', 'Framework Dev'],
  },
  {
    company: 'Genium',
    period: 'Previous',
    role: 'Fullstack Engineer → Tech Lead',
    desc: 'Led base architecture for Hivemapper (crypto + maps with Gatsby). First tech lead role guiding 5 engineers on GoodVets — a US enterprise veterinary platform. Co-built Fiverr\'s component library alongside industry leaders.',
    tags: ['Gatsby', 'Crypto', 'Component Libraries', 'Team Lead ×5'],
    badge: { label: 'First Lead', type: 'first' },
  },
  {
    company: 'Asamblo',
    period: 'Earlier',
    role: 'Frontend Developer',
    desc: 'Worked on drcontactlens.com, a US healthcare e-commerce platform. Met my engineering mentor here — the defining experience that shaped my approach to clean code and clean architecture.',
    tags: ['React', 'Clean Code', 'Clean Architecture', 'Healthcare'],
    badge: { label: 'Mentorship', type: 'mentor' },
  },
  {
    company: 'Hype Interativo',
    period: 'First Role',
    role: 'Web UI Developer',
    desc: 'Built a local gaming app connecting players through an esports tournament and competition system. The project that kicked everything off.',
    tags: ['JavaScript', 'Gaming', 'Esports', 'Tournaments'],
    badge: { label: 'Origin', type: 'first' },
  },
]

function ExpRow({ item, index }: { item: ExpItem; index: number }) {
  const { ref, visible } = useScrollReveal(0.1)
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${styles.row} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <div className={styles.left}>
        <span className={styles.company}>{item.company}</span>
        <span className={styles.period}>{item.period}</span>
        {item.badge && (
          <span className={`${styles.badge} ${styles[`badge_${item.badge.type}`]}`}>
            {item.badge.label}
          </span>
        )}
      </div>

      <div className={styles.connector}>
        <div className={styles.dot} />
        <div className={styles.line} />
      </div>

      <div className={styles.right}>
        <h3 className={styles.role}>{item.role}</h3>
        <p className={styles.desc}>{item.desc}</p>
        <div className={styles.tags}>
          {item.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader num="02" title="Experience" />
        <div className={styles.list}>
          {EXPERIENCE.map((item, i) => (
            <ExpRow key={item.company} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
