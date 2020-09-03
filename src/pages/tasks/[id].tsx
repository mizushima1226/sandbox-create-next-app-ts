import { useRouter } from 'next/router';

const Task = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleBack = () => router.back();

  return (
    <>
      <h2>This is Task Page</h2>
      <p>param:{id}</p>
      <button type="button" onClick={handleBack}>
        戻る
      </button>
    </>
  );
};
export default Task;
