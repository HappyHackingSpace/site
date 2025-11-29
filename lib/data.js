const { getRawFileFromRepo } = require('./github')
const markdownToHtml = require('@hackclub/markdown')

export const getBannerHtml = async () => {
  const md = await getRawFileFromRepo('README.md', 'master', 'happyhackingspace/banner')
  const html = await markdownToHtml(md, 'README.md', '', true)
  return html
}