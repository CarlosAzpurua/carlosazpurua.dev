import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionHeader from './SectionHeader'
import {
  IMG_LOGO_FIVERR,
  IMG_DR_CONTACT_LENS,
  IMG_FALABELLA,
  IMG_HIVEMAPPER,
  IMG_REDSEA_GLOBAL,
  IMG_GOOD_VETS
} from '../assets/images'
import styles from './Projects.module.css'

interface Project {
  index: string
  name: string
  url: string
  company: string
  desc: string
  img: string
  tags: string[]
  accent: string
}

const PROJECTS: Project[] = [
  {
    index: '01',
    name: 'Falabella',
    url: 'falabella.com',
    company: 'Smartjob',
    desc: 'E-commerce and fast shipping platform for one of Latin America\'s largest retail companies. Full ownership of the visual product and frontend architecture.',
    img: IMG_FALABELLA,
    tags: ['E-commerce', 'React', 'TypeScript'],
    accent: '#C9F14E',
  },
  {
    index: '02',
    name: 'Red Sea Global',
    url: 'redseaglobal.com',
    company: 'Globant',
    desc: 'Security-critical platform for a major Saudi enterprise. Led frontend engineering, Storybook adoption and proprietary component library development.',
    img: IMG_REDSEA_GLOBAL,
    tags: ['Design System', 'Storybook', 'Leadership'],
    accent: '#7B6FFF',
  },
  {
    index: '03',
    name: 'Hivemapper',
    url: 'hivemapper.com',
    company: 'Genium',
    desc: 'Decentralized mapping network merging crypto currency with geolocation. Built the base architecture with Gatsby for a Web3 mapping ecosystem.',
    img: IMG_HIVEMAPPER,
    tags: ['Web3', 'Gatsby', 'Crypto'],
    accent: '#00D4FF',
  },
  {
    index: '04',
    name: 'Fiverr',
    url: 'fiverr.com',
    company: 'Genium',
    desc: 'Contributed to the product foundation with a high-standard component library built alongside industry leaders. Set the bar for code quality across teams.',
    img: IMG_LOGO_FIVERR,
    tags: ['Component Library', 'Design System', 'Scale'],
    accent: '#FF4D8D',
  },
  {
    index: '05',
    name: 'GoodVets',
    url: 'goodvets.com',
    company: 'Genium',
    desc: 'Large US veterinary healthcare platform. First project as tech lead — coordinated a team of 5 developers, managed delivery and architectural decisions in English.',
    img: IMG_GOOD_VETS,
    tags: ['Healthcare', 'Leadership', 'Team ×5'],
    accent: '#83CD29',
  },
  {
    index: '06',
    name: 'Dr. Contact Lens',
    url: 'drcontactlens.com',
    company: 'Asamblo',
    desc: 'US healthcare e-commerce platform where a senior mentor changed how I think about code — the clean architecture principles that still guide every project.',
    img: IMG_DR_CONTACT_LENS,
    tags: ['Healthcare', 'Clean Architecture', 'Mentorship'],
    accent: '#FF6B4A',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useScrollReveal(0.08)
  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`${styles.card} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: `${(index % 3) * 0.08}s` }}
    >
      <a href={`https://${project.url}`} target="_blank" rel="noopener noreferrer" className={styles.link}>

        <div className={styles.imgWrap}>
          <img src={project.img} alt={project.name} className={styles.img} />
          <div className={styles.imgOverlay} style={{ background: `${project.accent}18` }} />
          <span className={styles.idx}>{project.index}</span>
        </div>

        <div className={styles.body}>
          <div className={styles.meta}>
            <span className={styles.company}>{project.company}</span>
            <span
              className={styles.urlBadge}
              style={{ color: project.accent, borderColor: `${project.accent}30` }}
            >
              {project.url}
            </span>
          </div>

          <h3 className={styles.name}>{project.name}</h3>
          <p className={styles.desc}>{project.desc}</p>

          <div className={styles.tags}>
            {project.tags.map(t => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        </div>

        <div
          className={styles.accentLine}
          style={{ background: project.accent }}
        />
      </a>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          num="03"
          title="Selected Projects"
          subtitle="11 projects delivered across 6 companies. Here are the most defining ones."
        />
        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
