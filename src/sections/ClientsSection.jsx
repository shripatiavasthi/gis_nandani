import { SectionHeader } from '../components/SectionHeader'

export function ClientsSection({ clients }) {
  return (
    <section className="section" id="clients">
      <div className="container">
        <SectionHeader
          eyebrow="Trusted By"
          title="Our Clients"
          description="The existing site showcases a broad mix of business and institutional clients. The logos below are pulled directly from the current brand set."
          centered
        />
        <div className="client-grid">
          {clients.map((client) => (
            <article key={client.name} className="client-card">
              <img src={client.logo} alt={client.name} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
