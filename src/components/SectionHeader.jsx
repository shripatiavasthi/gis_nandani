export function SectionHeader({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`section-header${centered ? ' section-header--centered' : ''}`}>
      {eyebrow ? <span className="section-header__eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  )
}
