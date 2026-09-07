import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeo, seoTags } from '../data/seo'

export function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = getSeo(pathname).title
    for (const [attribute, key, content] of seoTags(pathname)) {
      let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, key)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = getSeo(pathname).canonical
  }, [pathname])
  return null
}
