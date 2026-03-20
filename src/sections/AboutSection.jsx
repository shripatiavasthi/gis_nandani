import { SectionHeader } from '../components/SectionHeader'

export function AboutSection({ about }) {
  return (
    <section className="section section--light" id="about">
      <div className="container about-grid">
        <div>
          <SectionHeader eyebrow="Company Profile" title={about.title} description={about.description} />
        </div>
        <div className="about-media">
          <img src={about.image} alt="About Global Infra Solutions" />
        </div>
      </div>
    </section>
  )
}
