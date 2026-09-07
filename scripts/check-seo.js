import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { getSeo, pageSeo, seoTags } from '../src/data/seo.js'
import { services } from '../src/data/services.js'
import { renderSeo } from './seo-build.js'

const decode = (value) => value.replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&')
const rewrites = JSON.parse(readFileSync('vercel.json', 'utf8')).rewrites
const sitemap = readFileSync('public/sitemap.xml', 'utf8')
assert.equal(Object.keys(pageSeo).length, 9)
assert.equal(new Set(Object.values(pageSeo).map(page => page.title)).size, 9)
for (const path of [...Object.keys(pageSeo), '/crm']) {
  const file = path === '/' ? 'dist/index.html' : `dist${path}/index.html`
  const html = readFileSync(file, 'utf8')
  const page = getSeo(path)
  assert.equal(decode(html.match(/<title>(.*?)<\/title>/)[1]), page.title)
  assert.equal((html.match(/<title>/g) || []).length, 1)
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1)
  assert.ok(html.includes(`href="${page.canonical}"`))
  for (const [attribute, key, expected] of seoTags(path)) {
    const matches = [...html.matchAll(new RegExp(`<meta ${attribute}="${key}" content="([^"]*)"`, 'g'))]
    assert.equal(matches.length, 1, `${path}: duplicate or missing ${key}`)
    assert.equal(decode(matches[0][1]), expected, `${path}: ${key}`)
  }
  assert.ok(!html.includes('[homepage-og-image]'))
  if (path !== '/') assert.equal(rewrites.find(rule => rule.source === path)?.destination, `${path}/index.html`)
  if (path !== '/crm') assert.ok(sitemap.includes(`<loc>${page.canonical}</loc>`))
  assert.equal(renderSeo(html, path), html, 'Rendering metadata must be idempotent')
}
assert.ok(!sitemap.includes('/crm'))
assert.equal(getSeo('/crm').robots, 'noindex, follow')
assert.equal(getSeo('/about/').canonical, getSeo('/about').canonical)
for (const service of services) {
  assert.ok(pageSeo[service.path])
  assert.ok(service.sections.length >= 3)
}
console.log('SEO checks passed: nine public pages, CRM exclusion, metadata, canonical URLs, service content, sitemap and deployment rewrites.')
