import { useRouter } from 'next/router';
import React, { FC } from 'react';

const Quiz: FC = () => {
  const router = useRouter();
  const { qid } = router.query;

  return <div>Quiz: {qid}</div>;
};

export default Quiz;
