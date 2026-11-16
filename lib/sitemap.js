// Runs before `next build` (see package.json) so public/sitemap.xml, which
// robots.txt points to, always matches the current pages.
const fs = require('fs')
const globby = require('globby')

const toRoute = page => {
  const route = page
    .replace(/^pages/, '')
    .replace(/\.(js|tsx|mdx)$/, '')
    .replace(/\/index$/, '')
  return `${route}/`
}

async function generateSitemap() {
  const pages = await globby([
    'pages/**/*.{js,tsx,mdx}',
    '!pages/_*.{js,tsx}',
    '!pages/404.js',
    '!pages/api',
    '!pages/**/\\[*'
  ])
  const urls = pages
    .map(toRoute)
    .sort()
    .map(route => `  <url><loc>https://happyhacking.space${route}</loc></url>`)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`
  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSitemap()
