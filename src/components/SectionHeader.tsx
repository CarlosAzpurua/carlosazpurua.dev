import styles from './SectionHeader.module.css'

interface Props {
  num: string
  title: string
  subtitle?: string
}

export default function SectionHeader({ num, title, subtitle }: Props) {
  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <span className={styles.num}>{num}</span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {subtitle && <p className={styles.sub}>{subtitle}</p>}
    </div>
  )
}
