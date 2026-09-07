import { Link, useLocation } from 'react-router-dom'
import { PublicSiteFooter, PublicSiteHeader, WhatsAppBubble } from '../components/PublicSiteChrome'
import { services } from '../data/services'

export default function ServicePage() {
  const { pathname } = useLocation()
  const service = services.find((item) => item.path === pathname.replace(/\/+$/, ''))
  if (!service) return null
  return (
    <div className="site-shell">
      <PublicSiteHeader />
      <main>
        <section className="projects-hero">
          <div className="container">
            <h1>{service.heading}</h1>
            <p className="hero-copy narrow">{service.intro}</p>
            <Link className="hero-cta" to="/contact">Discuss Your Project</Link>
          </div>
        </section>
        <section className="section">
          <div className="container about-page__blocks">
            {service.sections.map(([title, copy]) => (
              <article className="about-page__panel" key={title}>
                <h2>{title}</h2><p>{copy}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="section soft-section">
          <div className="container">
            <h2>Explore Our Work and Services</h2>
            <p><Link to="/projects">View our interior and construction project portfolio</Link></p>
            <ul>{services.filter((item) => item.path !== service.path).map((item) => (
              <li key={item.path}><Link to={item.path}>{item.label}</Link></li>
            ))}</ul>
          </div>
        </section>
      </main>
      <PublicSiteFooter />
      <WhatsAppBubble />
    </div>
  )
}
