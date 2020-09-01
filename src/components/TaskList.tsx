import { useAllTasksQuery } from 'src/generated/graphql'

import Error from 'src/pages/_error'

export default function PostList() {
  const { loading, error, data } = useAllTasksQuery()

  if (error) return <Error statusCode={500}/>
  if (loading) return <div>Loading</div>

  const { allTasks } = data

  return (
    <ul>
        {allTasks.map((task, idx) => {
            return (
            <li key={idx}>{task.title}:{task.description}</li>
            )
        })}
    </ul>
  )
}