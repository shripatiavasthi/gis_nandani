export function TopBar({ contact, socialLinks }) {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__group">
          {contact.phones.map((phone) => (
            <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`}>
              {phone}
            </a>
          ))}
          <a href={`mailto:${contact.emails[0]}`}>{contact.emails[0]}</a>
        </div>
        <div className="topbar__group topbar__group--right">
          {socialLinks.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
