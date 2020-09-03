import { useRouter } from 'next/router';

const Task = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <h2>This is Task Page</h2>
      <p>param:{id}</p>
    </>
  );
};
export default Task;
