import { useState } from 'react'

import {
  PublicSiteFooter,
  PublicSiteHeader,
  WhatsAppBubble,
} from '../components/PublicSiteChrome'
import { LazyImage } from '../components/LazyImage'
import { siteContent } from '../data/siteContent'

const factoryMapUrl = 'https://google.com/maps?q=28.387134552001953,77.26447296142578&z=17&hl=en'
const factoryMapEmbedUrl =
  'https://maps.google.com/maps?q=28.387134552001953,77.26447296142578&z=17&hl=en&output=embed'
const officeMapUrl =
  'https://www.google.com/maps/dir//RPS+12th+Avenue,+12%2F6+Milestone,+Main,+Mathura+Rd,+Faridabad,+Haryana+121003/@28.4151045,77.320955,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x390ce73f690e51d3:0xaab05dc5cac0072a!2m2!1d77.3054758!2d28.4720663?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D'
const officeMapEmbedUrl =
  'https://maps.google.com/maps?q=28.4720663,77.3054758&z=17&hl=en&output=embed'

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

    window.location.href = `mailto:${siteContent.contact.emails.join(',')}?subject=${subject}&body=${body}`
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
                    <p>
                      <strong>Office:</strong> {siteContent.contact.officeAddress}
                    </p>
                    <p>
                      <strong>Factory:</strong> {siteContent.contact.factoryAddress}
                    </p>
                    <p>
                      <strong>Office Map</strong>
                    </p>
                    <div className="contact-page__map">
                      <iframe
                        title="GIS office location map"
                        src={officeMapEmbedUrl}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                    <p>
                      <a href={officeMapUrl} target="_blank" rel="noreferrer">
                        Open Office Map
                      </a>
                    </p>
                    <p>
                      <strong>Factory Map</strong>
                    </p>
                    <div className="contact-page__map">
                      <iframe
                        title="GIS factory location map"
                        src={factoryMapEmbedUrl}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                    <p>
                      <a href={factoryMapUrl} target="_blank" rel="noreferrer">
                        Open Factory Map
                      </a>
                    </p>
                  </div>

                  <div>
                    <span>Hours</span>
                    <p>Mon-Fri 9am to 7pm</p>
                  </div>

                  <div>
                    <span>Email</span>
                    {siteContent.contact.emails.map((email) => (
                      <p key={email}>
                        <a href={`mailto:${email}`}>{email}</a>
                      </p>
                    ))}
                  </div>

                  <div>
                    <span>Phone</span>
                    {siteContent.contact.phones.map((phone) => (
                      <p key={phone}>
                        <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
                      </p>
                    ))}
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
