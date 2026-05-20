import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Contact.module.css'

export default function Contact() {
  const { ref, visible } = useScrollReveal(0.1)

  return (
    <section id="contact" className={styles.section}>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`${styles.inner} ${visible ? styles.visible : ''}`}
      >
        <span className={styles.eyebrow}>Available for new projects</span>

        <h2 className={styles.headline}>
          Let's build<br />
          something<br />
          <em>great</em>
          <span className={styles.acc}>.</span>
        </h2>

        <p className={styles.sub}>
          Open to senior roles, tech lead opportunities, and challenging product
          challenges. Fluent in English and Spanish.
        </p>

        <div className={styles.actions}>
          <a href="mailto:hello@charlietech.dev" className={styles.btnPrimary}>
            Get in touch ↗
          </a>
          <a
            href="https://www.linkedin.com/in/carlosazpurua"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnGhost}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/CarlosAzpurua"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnGhost}
          >
            GitHub
          </a>
        </div>

        <div className={styles.taglineWrap}>
          <span className={styles.taglineLine} />
          <span className={styles.tagline}>Think Twice, Code Once</span>
          <span className={styles.taglineLine} />
        </div>
      </div>
    </section>
  )
}
