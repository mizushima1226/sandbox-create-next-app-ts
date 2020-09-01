import TaskList from 'src/components/TaskList'
import { initializeApollo } from 'src/lib/apolloClient'

import { from } from '@apollo/client'

const IndexPage = () => (
    <TaskList />
)

export async function getStaticProps() {
  const apolloClient = initializeApollo()
  // try {
  //   await apolloClient.query({
  //     query: ALL_TASKS_QUERY,
  //   })  
  // } catch (error) {
  //   console.log(error);
  // }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default IndexPage