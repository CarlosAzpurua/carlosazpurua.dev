import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionHeader from './SectionHeader'
import { IMG_IMPROVE } from '../assets/images'
import styles from './About.module.css'

const FACTS = [
  { label: 'Education', value: 'Higher Technician, Industrial Engineering', sub: 'Universidad Tecnológica del Centro (UNITEC)' },
  { label: 'Certificate', value: 'Data Science & Engineering', sub: 'Acámica' },
  { label: 'Languages', value: 'English (Fluent) · Spanish (Native)' },
  { label: 'Focus', value: 'Web UI · Clean Architecture · Design Systems · Team Leadership · AI Products' },
  { label: 'Passions', value: 'Technology · Physics · Anime' },
]

export default function About() {
  const { ref: textRef, visible: textVisible } = useScrollReveal()
  const { ref: sideRef, visible: sideVisible } = useScrollReveal()

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader num="04" title="About" />

        <div className={styles.grid}>
          <div
            ref={textRef as React.RefObject<HTMLDivElement>}
            className={`${styles.textCol} ${textVisible ? styles.visible : ''}`}
          >
            <p className={styles.bigText}>
              I'm a Senior Software Engineer who grew from building
              esports apps to leading teams at global companies.
            </p>
            <p className={styles.bigText}>
              Along the way, a mentor changed{' '}
              <em>how I think about code</em> — not just making things work,
              but making them clean, scalable, and honest.
            </p>
            <p className={styles.bigText}>
              I care about architecture, developer experience,
              and the kind of decisions that compound over time.{' '}
              <em>That's what I bring to a team.</em>
            </p>

            <div className={styles.imgBlock}>
              <img src={IMG_IMPROVE} height={400} alt="Improving" className={styles.img} />
              <div className={styles.imgCaption}>
                <span className={styles.captionLine} />
                Always improving, always learning
              </div>
            </div>
          </div>

          <div
            ref={sideRef as React.RefObject<HTMLDivElement>}
            className={`${styles.sideCol} ${sideVisible ? styles.visible : ''}`}
          >
            {FACTS.map((f, i) => (
              <div
                key={f.label}
                className={styles.fact}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <span className={styles.factLabel}>{f.label}</span>
                <span className={styles.factValue}>{f.value}</span>
                {f.sub && <span className={styles.factSub}>{f.sub}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
