import { SectionHeader } from '../components/SectionHeader'

export function ServicesSection({ services }) {
  return (
    <section className="section section--light" id="services">
      <div className="container">
        <SectionHeader
          eyebrow="What We Do"
          title="Our Services"
          description={services.intro}
          centered
        />
        <div className="card-grid card-grid--three">
          {services.items.map((item) => (
            <article key={item.title} className="service-card">
              <span className="service-card__pill">Turnkey</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
