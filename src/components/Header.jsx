export function Header({ company, navigation }) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href="#home" aria-label={company.name}>
          {company.logoUrl ? (
            <>
              <img className="brand__logo" src={company.logoUrl} alt={company.name} />
              <span className="sr-only">{company.logoText}</span>
            </>
          ) : (
            <>
              <span className="brand__mark">{company.shortName}</span>
              <span className="brand__text">{company.logoText}</span>
            </>
          )}
        </a>
        <nav className="site-nav" aria-label="Primary">
          {navigation.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
