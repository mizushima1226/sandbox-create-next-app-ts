import { gql, useQuery } from '@apollo/client'

export const ALL_TASKS_QUERY = gql`
  query {
    allTasks{
      title
      description
    }
  }
`

export default function PostList() {
  const { loading, error, data } = useQuery(ALL_TASKS_QUERY)

  if (error) return <h1>Error!!!!</h1>
  if (loading) return <div>Loading</div>

  const { allTasks } = data
  console.log(data)

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