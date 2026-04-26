import { useState } from 'react'

import {
  PublicSiteFooter,
  PublicSiteHeader,
  WhatsAppBubble,
} from '../components/PublicSiteChrome'
import { LazyImage } from '../components/LazyImage'
import { siteContent } from '../data/siteContent'

const initialFormState = {
  fullName: '',
  phone: '',
  email: '',
  location: '',
  message: '',
}

export default function ContactPage() {
  const [formValues, setFormValues] = useState(initialFormState)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const subject = encodeURIComponent(`Project Inquiry from ${formValues.fullName || 'Website Visitor'}`)
    const body = encodeURIComponent(
      [
        `Name: ${formValues.fullName}`,
        `Phone: ${formValues.phone}`,
        `Email: ${formValues.email}`,
        `Project Location: ${formValues.location}`,
        '',
        'Message:',
        formValues.message,
      ].join('\n'),
    )

    window.location.href = `mailto:${siteContent.contact.emails[0]}?subject=${subject}&body=${body}`
  }

  return (
    <div className="site-shell">
      <PublicSiteHeader />

      <main>
        <section className="projects-hero contact-page__hero">
          <div className="container">
            {/* <p className="eyebrow">Global Infra Solutions</p> */}
            <h1>Get in Touch with Us</h1>
            <p className="hero-copy narrow">
              Reach out for civil construction, turnkey interiors, workspace transformations, and
              delivery-led project consultations.
            </p>
          </div>
        </section>

        <section className="section contact-page__section">
          <div className="container contact-page__grid">
            <div className="contact-page__aside">
              <div className="contact-page__visual">
                <LazyImage
                  src={siteContent.projectSeries[1].image}
                  alt="Premium interior consultation space"
                  eager
                />
              </div>

              <article className="contact-page__info-card">
                {/* <p className="eyebrow">Contact Us</p> */}
                {/* <h3>Reach GIS for project conversations that need clarity and execution depth.</h3>
                <p>
                  We design residential and commercial environments that balance comfort, class,
                  performance, and long-term value.
                </p> */}

                <div className="contact-page__info-list">
                  <div>
                    <span>Location</span>
                    <p>{siteContent.contact.headquarters}</p>
                  </div>

                  <div>
                    <span>Hours</span>
                    <p>Mon-Fri 9am to 7pm</p>
                  </div>

                  <div>
                    <span>Email</span>
                    <p>
                      <a href={`mailto:${siteContent.contact.emails[0]}`}>
                        {siteContent.contact.emails[0]}
                      </a>
                    </p>
                  </div>

                  <div>
                    <span>Phone</span>
                    <p>
                      <a href={`tel:${siteContent.contact.phones[0].replace(/\s+/g, '')}`}>
                        {siteContent.contact.phones[0]}
                      </a>
                    </p>
                  </div>
                </div>
              </article>
            </div>

            <article className="contact-page__form-card">
              {/* <p className="eyebrow">Contact Us</p> */}
              {/* <h2>{siteContent.contactForm.title}</h2> */}

              <form className="contact-page__form" onSubmit={handleSubmit}>
                {siteContent.contactForm.fields.map((field) => (
                  <label key={field.name} className="contact-page__field">
                    <span>{field.label}</span>
                    <input
                      required
                      name={field.name}
                      type={field.type}
                      value={formValues[field.name]}
                      onChange={handleChange}
                    />
                  </label>
                ))}

                <label className="contact-page__field">
                  <span>Your Message</span>
                  <textarea
                    required
                    name="message"
                    rows="6"
                    value={formValues.message}
                    onChange={handleChange}
                  />
                </label>

                <button className="contact-page__submit" type="submit">
                  Submit Your Inquiry
                </button>
                {/* <p className="contact-page__footnote">{siteContent.contactForm.footnote}</p> */}
              </form>
            </article>
          </div>
        </section>
      </main>

      <PublicSiteFooter />
      <WhatsAppBubble />
    </div>
  )
}
