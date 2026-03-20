import { SectionHeader } from '../components/SectionHeader'

export function WhyChooseUsSection({ items }) {
  return (
    <section className="section section--light" id="why-choose-us">
      <div className="container">
        <SectionHeader
          eyebrow="Why GIS"
          title="Why Choose Us"
          description="Choosing Global Infra Solutions means working with a partner that combines creative thinking, technical execution, and delivery accountability."
          centered
        />
        <div className="card-grid card-grid--three">
          {items.map((item) => (
            <article key={item.title} className="reason-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
