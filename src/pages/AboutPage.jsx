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
            {/* <p className="eyebrow">GLOBAL INFRA SOLUTIONS</p> */}
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
              <LazyImage src={siteContent.intro.image} alt="About Global Infra Solutions" eager />
            </div>

            <div className="split-copy about-page__copy">
              {/* <p className="eyebrow">Company Profile</p> */}
              <h2>About Global Infra Solutions</h2>
              <p>
                Global Infra Solutions stands at the intersection of precision engineering and
                refined execution-delivering bespoke civil construction and interior turnkey
                solutions for clients who expect nothing less than excellence.
              </p>
              <p>
                With 25+ years of combined industry experience, we have successfully delivered 100+
                projects across commercial and residential segments-each reflecting our commitment
                to quality, detail, and timely execution.
              </p>
              <p>
                We are more than a construction company; we are strategic partners in shaping
                environments that reflect ambition, sophistication, and long-term value. Every
                project we undertake is guided by a singular philosophy: to build with purpose,
                execute with perfection, and deliver beyond expectation.
              </p>

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
          <div className="container about-page__blocks">
            <article className="about-page__panel">
              <p className="eyebrow">Our Vision</p>
              <h2>Our Vision</h2>
              <p>
                To emerge as a distinguished leader in the infrastructure and construction
                landscape-recognized for delivering high-value projects defined by quality,
                innovation, and enduring impact.
              </p>
            </article>

            <article className="about-page__panel">
              <p className="eyebrow">Our Mission</p>
              <h2>Our Mission</h2>
              <p>To deliver world-class construction and interior turnkey solutions backed by:</p>
              <ul className="about-page__list">
                <li>25+ years of expertise-driven insights</li>
                <li>Proven systems ensuring on-time project delivery</li>
                <li>A portfolio of 100+ successfully executed projects</li>
                <li>Long-term relationships built on trust and transparency</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="container about-page__statement">
            <div className="section-heading centered">
              <h2>A Statement of Excellence</h2>
              <p>
                At Global Infra Solutions, we don’t just construct buildings-we create enduring
                assets backed by experience, scale, and trust.
              </p>
              <p>
                With a growing portfolio, strong execution capabilities, and a commitment to
                excellence, we continue to set new benchmarks in civil construction and turnkey
                interiors.
              </p>
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
