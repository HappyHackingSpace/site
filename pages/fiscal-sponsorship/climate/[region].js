import ClimateDirectory, {
  regions,
  fetchRawClimateOrganizations
} from './index'
import { map, find, kebabCase, startCase } from 'lodash'

const regionsWithIds = map(regions, region => ({
  id: kebabCase(region.label),
  ...region
}))

export default function ClimateRegionalPage({ rawOrganizations, pageRegion }) {
  return (
    <ClimateDirectory
      rawOrganizations={rawOrganizations}
      pageRegion={pageRegion}
    />
  )
}

export const getStaticPaths = () => {
  const paths = map(map(regionsWithIds, 'id'), id => ({
    params: { region: `organizations-in-${id}` }
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async () => {
  return { notFound: true }
}
