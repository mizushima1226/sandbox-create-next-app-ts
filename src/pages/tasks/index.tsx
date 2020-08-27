import TaskList, {ALL_TASKS_QUERY} from '../../components/TaskList'
import { initializeApollo } from '../../lib/apolloClient'

const IndexPage = () => (
    <TaskList />
)

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_TASKS_QUERY,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default IndexPage