import { Link } from 'react-router-dom'

import {
  PublicSiteFooter,
  PublicSiteHeader,
  WhatsAppBubble,
} from '../components/PublicSiteChrome'
import { LazyImage } from '../components/LazyImage'
import { siteContent } from '../data/siteContent'

export default function AboutPage() {
  return (
    <div className="site-shell">
      <PublicSiteHeader />

      <main>
        <section className="projects-hero">
          <div className="container">
            <p className="eyebrow">GLOBAL INFRA SOLUTIONS</p>
            <h1>About Us</h1>
            <p className="hero-copy narrow">
              Learn how GIS combines civil execution, interior delivery, and accountable project
              management into one operating model.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container split-section">
            <div className="split-visual">
              <LazyImage src={siteContent.intro.image} alt={siteContent.intro.title} eager />
            </div>

            <div className="split-copy">
              <p className="eyebrow">Company Profile</p>
              <h2>{siteContent.intro.title}</h2>
              {siteContent.intro.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <div className="intro-stats">
                {siteContent.featureStats.map((item) => (
                  <div key={item.label} className="intro-stat">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              <div>
                <Link className="hero-cta" to="/projects">
                  View Projects
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section soft-section">
          <div className="container">
            <div className="section-heading centered">
              <h2>What We Deliver</h2>
              <p>{siteContent.solutions.title}</p>
            </div>

            <div className="service-grid">
              {siteContent.solutions.items.map((solution) => (
                <article key={solution.id} className="service-card">
                  <div className="service-card-body">
                    <h4>{solution.title}</h4>
                    <p>{solution.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicSiteFooter />
      <WhatsAppBubble />
    </div>
  )
}
