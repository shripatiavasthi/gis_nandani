# GIS website

Run `npm ci` and `npm run dev` for local development.
Run `npm run build` followed by `npm run check:seo` to validate production SEO output.

SEO titles and descriptions from GIS SEO.docx live in `src/data/seo.js`.
Service page content lives in `src/data/services.js`. The canonical origin is
`https://www.globalinfraa.com`, as specified in the document.

The build emits separate HTML files with metadata for the nine public routes
and a noindex CRM page. `vercel.json` maps direct requests to those files.
Page content still renders through React; these files are not full server-rendered pages.
Dynamic project galleries use the SPA fallback and client-side metadata.
Keep `public/sitemap.xml` and deployment rewrites aligned when adding public routes.
