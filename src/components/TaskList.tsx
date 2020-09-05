import Link from 'next/link';
import { Button } from 'semantic-ui-react';

import { useAllTasksQuery } from 'src/graphql/graphql';

import Error from 'src/pages/_error';

export default function PostList() {
  const { loading, error, data } = useAllTasksQuery();

  if (error) return <Error statusCode={500} />;
  if (loading) return <div>Loading</div>;

  const { allTasks } = data;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>タイトル</th>
            <th>説明</th>
            <th>詳細</th>
          </tr>
        </thead>
        <tbody>
          {allTasks.map((task, idx) => {
            return (
              <tr key={task.id}>
                <td>{idx + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <Link href={`/tasks/${task.id}`}>
                    <a>詳細</a>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
