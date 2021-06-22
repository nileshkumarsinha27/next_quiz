require('es6-promise').polyfill();
require('isomorphic-fetch');
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { QuizPageProps } from '../../types/quizPageProps';

const Quiz: NextPage<QuizPageProps> = ({ quizInfo }: QuizPageProps) => {
  const router = useRouter();
  const { qid } = router.query;
  return (
    <main className="container">
      <Head>
        <title>Quiz| {quizInfo[0].category}</title>
      </Head>
      <div className="quiz-title">
        <span>Quiz on {quizInfo[0].category}</span>
      </div>
      <style jsx lang="scss">
        {`
          .quiz-title {
            width: 100%;
            box-sizing: border-box;
            padding: 0 15px;
          }
          .quiz-title span {
            font-size: 2rem;
          }
          .trivia-category-section {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 100%;
          }
        `}
      </style>
    </main>
  );
};

Quiz.getInitialProps = async ({ query }) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=10&category=${query.qid}`
  );
  const jsonResponse = await response.json();
  return {
    quizInfo: jsonResponse.results,
  };
};

export default Quiz;
