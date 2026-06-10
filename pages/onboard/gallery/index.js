import { GalleryPage } from '../../../components/onboard/gallery-paginated'
import { getAllOnboardProjects } from '../../api/onboard/p'
import { getOnboardProject } from '../../api/onboard/p/[project]'

export default function Index({ projects, itemCount }) {
  return (
    <GalleryPage
      currentPage={1}
      itemCount={itemCount}
      currentProjects={projects}
    />
  )
}

export async function getStaticProps() {
  return { notFound: true }
}