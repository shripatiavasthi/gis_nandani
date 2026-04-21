import { NavLink } from 'react-router-dom'

import { siteContent } from '../data/siteContent'

export function PublicSiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink className="brand brand-text" to="/" aria-label={siteContent.company.name}>
          <span>{siteContent.company.shortName}</span>
          <div>
            <strong>{siteContent.company.name}</strong>
            <small>Infrastructure | Interiors | Project Delivery</small>
          </div>
        </NavLink>

        <nav className="site-nav" aria-label="Primary navigation">
          <NavLink to="/">Home</NavLink>
          <a href="/#services">Services</a>
          <a href="/#contact">Contact</a>
          <NavLink to="/projects">Projects</NavLink>
        </nav>
      </div>
    </header>
  )
}

export function PublicSiteFooter() {
  return (
    <footer id="contact" className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h2>{siteContent.company.shortName}</h2>
          <h3>{siteContent.company.name}</h3>
          <p>Infrastructure | Interior Fit-Outs | Modular Delivery</p>
          <p className="footer-copy">{siteContent.contactSection.lead}</p>
        </div>

        <div className="footer-contact">
          <span className="footer-label">{siteContent.contactSection.eyebrow.toLowerCase()}</span>
          <p>Headquarters: {siteContent.contact.headquarters}</p>
          <p>Direct Inquiry: {siteContent.contact.emails[0]}</p>
          <p>Consultation Line: {siteContent.contactSection.consultationLine}</p>
        </div>

        <div className="footer-form">
          <span className="footer-label">{siteContent.contactForm.title.toLowerCase()}</span>
          <form onSubmit={(event) => event.preventDefault()}>
            {siteContent.contactForm.fields.map((field) => (
              <label key={field.name}>
                {field.label}
                <input type={field.type} name={field.name} placeholder={field.label} />
              </label>
            ))}

            <label>
              Project Category
              <select name="projectCategory" defaultValue={siteContent.contactForm.categories[0]}>
                {siteContent.contactForm.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit">{siteContent.contactForm.submitLabel}</button>
          </form>
          <p className="footer-form-note">{siteContent.contactForm.footnote}</p>
        </div>
      </div>
      <div className="container footer-bottom">© 2026. All rights reserved.</div>
    </footer>
  )
}

export function WhatsAppBubble() {
  return (
    <a
      className="whatsapp-bubble"
      href="https://wa.me/919873342618?text=Hello!%20I%20would%20like%20to%20discuss%20a%20project%20consultation."
      aria-label="Contact on WhatsApp"
    >
      <span>WhatsApp</span>
    </a>
  )
}
