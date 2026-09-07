import { getSeo, pageSeo, seoTags } from '../src/data/seo.js'

const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
export function renderSeo(html, path) {
  const page = getSeo(path)
  const tags = [
    `<title>${escape(page.title)}</title>`,
    ...seoTags(path).map(([attribute, key, content]) => `<meta ${attribute}="${key}" content="${escape(content)}" />`),
    `<link rel="canonical" href="${escape(page.canonical)}" />`,
  ].join('\n    ')
  return html.replace(/<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/, `<!-- SEO_START -->\n    ${tags}\n    <!-- SEO_END -->`)
}

export function seoBuild() {
  return {
    name: 'gis-page-seo',
    enforce: 'post',
    transformIndexHtml(html) { return renderSeo(html, '/') },
    generateBundle(_, bundle) {
      const html = bundle['index.html']?.source
      if (!html) throw new Error('Missing built index.html')
      for (const path of [...Object.keys(pageSeo).filter((path) => path !== '/'), '/crm']) {
        this.emitFile({ type: 'asset', fileName: `${path.slice(1)}/index.html`, source: renderSeo(String(html), path) })
      }
    },
  }
}
