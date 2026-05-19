import { LOGO } from '../assets/images'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <img src={LOGO} alt="Charlie Tech" height={24} className={styles.logo} />
        <span className={styles.copy}>© {new Date().getFullYear()} Charlie Tech</span>
        <span className={styles.built}>Built with React + Three.js</span>
      </div>
    </footer>
  )
}
