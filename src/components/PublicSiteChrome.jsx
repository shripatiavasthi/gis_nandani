import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { siteContent } from '../data/siteContent'

function SocialIcon({ label }) {
  const iconMap = {
    Facebook: (
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.2-1.6 1.5-1.6H16V4.8c-.3 0-.9-.1-1.8-.1-2.9 0-4.8 1.7-4.8 4.9V11H7v3h2.4v7h4.1Z" />
    ),
    Instagram: (
      <>
        <rect x="4.5" y="4.5" width="15" height="15" rx="4" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="17.2" cy="6.8" r="1" />
      </>
    ),
    LinkedIn: (
      <>
        <rect x="4.5" y="9" width="3.3" height="10" />
        <circle cx="6.15" cy="6.4" r="1.6" />
        <path d="M10.2 9h3.1v1.4h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.2 2.2 4.2 5.2V19h-3.3v-4.6c0-1.1 0-2.5-1.6-2.5s-1.8 1.2-1.8 2.4V19h-3.3V9Z" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {iconMap[label]}
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.6 10.8a16.5 16.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.08.36 2.22.54 3.4.54a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.52 21 3 13.48 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.18.18 2.32.54 3.4a1 1 0 0 1-.24 1l-2.2 2.4Z" />
    </svg>
  )
}

export function PublicSiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname, location.hash])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink className="brand brand-text" to="/" aria-label={siteContent.company.name}>
          <img
            className="brand-logo"
            src={siteContent.company.logoUrl}
            alt={`${siteContent.company.name} logo`}
          />
          {/* <div>
            <strong>{siteContent.company.name}</strong>
            <small>Infrastructure | Interiors | Project Delivery</small>
          </div> */}
        </NavLink>

        <button
          type="button"
          className="site-nav-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          Menu
        </button>

        <nav
          id="primary-navigation"
          className={`site-nav${isMenuOpen ? ' site-nav--open' : ''}`}
          aria-label="Primary navigation"
        >
          <NavLink to="/" data-label="Home">Home</NavLink>
          <NavLink to="/about" data-label="About Us">About Us</NavLink>
          <a href="/#services" data-label="Services">Services</a>
          <NavLink to="/projects" data-label="Projects">Projects</NavLink>
          <NavLink to="/contact" data-label="Contact">Contact</NavLink>
          <span className="site-nav-divider" aria-hidden="true">
            |
          </span>
          {siteContent.contact.phones.map((phone, index) => (
            <span key={phone} className="site-nav-phone">
              {index > 0 ? (
                <span className="site-nav-divider" aria-hidden="true">
                  |
                </span>
              ) : (
                <PhoneIcon />
              )}
              <a href={`tel:${phone.replace(/\s+/g, '')}`} aria-label={`Call ${phone}`}>
                <span>{phone}</span>
              </a>
            </span>
          ))}
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
          {/* <h2>{siteContent.company.shortName}</h2> */}
          <h3>{siteContent.company.name}</h3>
          <p className="footer-tagline">Infrastructure | Interior Fit-Outs | Modular Delivery</p>
          {/* <p className="footer-copy">{siteContent.contactSection.lead}</p> */}
        </div>

        <div className="footer-contact">
          <span className="footer-label">Contact</span>
          <p>
            <strong>Office:</strong> {siteContent.contact.officeAddress}
          </p>
          <p>
            <strong>Factory:</strong> {siteContent.contact.factoryAddress}
          </p>
          {siteContent.contact.emails.map((email) => (
            <p key={email}>{email}</p>
          ))}
          <span className="footer-contact-phone">Phone No.: {siteContent.contact.phones.join(', ')}</span>
        </div>

        <div className="footer-details">
          <span className="footer-label">Reach GIS</span>
          {/* <p> */}
            {/* {siteContent.contact.headquarters} */}
          {/* </p> */}
          {/* <p>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${siteContent.contact.emails[0]}`}>{siteContent.contact.emails[0]}</a>
          </p> */}
          {/* <p>
            <strong>Call us:</strong>{' '}
            <a href={`tel:${siteContent.contact.phones[0].replace(/\s+/g, '')}`}>
              {siteContent.contact.phones[0]}
            </a>
          </p> */}
          <div className="footer-socials" aria-label="GIS social links">
            {siteContent.socialLinks.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                <SocialIcon label={item.label} />
              </a>
            ))}
          </div>
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
