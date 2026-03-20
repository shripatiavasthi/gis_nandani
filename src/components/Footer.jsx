export function Footer({ footer, socialLinks, contact }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="container site-footer__grid">
        <div>
          <span className="section-header__eyebrow">About</span>
          <p>{footer.description}</p>
        </div>
        <div>
          <span className="section-header__eyebrow">Follow Us</span>
          <div className="footer-links">
            {socialLinks.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <span className="section-header__eyebrow">Contact</span>
          <div className="footer-links footer-links--stacked">
            {contact.phones.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`}>
                {phone}
              </a>
            ))}
            {contact.emails.map((email) => (
              <a key={email} href={`mailto:${email}`}>
                {email}
              </a>
            ))}
          </div>
          <p>{footer.creditLabel}</p>
        </div>
      </div>
    </footer>
  )
}
