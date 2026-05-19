import styles from './Marquee.module.css'

const ITEMS = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'Three.js',
  'Svelte', 'Gatsby', 'Tailwind CSS', 'Storybook', 'MongoDB',
  'Jest', 'Express', 'Heroku', 'Clean Architecture', 'Design Systems',
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot}>◆</span> {item}
          </span>
        ))}
      </div>
    </div>
  )
}
