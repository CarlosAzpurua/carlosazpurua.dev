import NeuralCanvas from './NeuralCanvas'
import { IMG_DEV } from '../assets/images'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <NeuralCanvas />

      {/* Gradient vignette bottom */}
      <div className={styles.vignette} />

      <div className={styles.inner}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          Available for new projects
        </div>

        <h1 className={styles.title}>
          <span className={styles.line1}>Charlie</span>
          <span className={styles.line2}>Tech<span className={styles.accent}>.</span></span>
        </h1>

        <p className={styles.sub}>
          Sr. Software Engineer &amp; Web UI Developer
        </p>
        <p className={styles.tagline}>Think Twice, Code Once</p>

        <div className={styles.actions}>
          <a href="#projects" className={styles.btnPrimary}>View Projects ↓</a>
          <a href="#contact" className={styles.btnGhost}>Get in touch</a>
        </div>

        <div className={styles.scroll}>
          <span className={styles.scrollLine} />
          <span className={styles.scrollText}>scroll</span>
        </div>
      </div>

      {/* Developer image — right side */}
      <div className={styles.imageWrap}>
        <div className={styles.imageGlow} />
        <img src={IMG_DEV} alt="Developer" className={styles.devImage} />
        <div className={styles.imageBorder} />
      </div>
    </section>
  )
}
