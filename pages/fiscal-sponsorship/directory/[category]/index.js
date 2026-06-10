import DirectoryPage, {
  regions,
  categories,
  fetchRawOrganizations
} from '../index'
import { find } from 'lodash'

export default function DirectoryRegionalPage({
  rawOrganizations,
  pageRegion,
  category
}) {
  return (
    <DirectoryPage
      rawOrganizations={rawOrganizations}
      pageRegion={pageRegion}
      category={category}
    />
  )
}

export const getStaticPaths = () => {
  const paths = categories.flatMap(category => ({
    params: { category: category.id }
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async () => {
  return { notFound: true }
}
