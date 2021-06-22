require('es6-promise').polyfill();
require('isomorphic-fetch');
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { QuizPageProps, QuizQuestion } from '../../types/quizPageProps';
import QuestionCard from '../../components/question-card/QuestionCard';
import Button from '../../components/button/Button';

const Quiz: NextPage<QuizPageProps> = ({ quizInfo }: QuizPageProps) => {
  const router = useRouter();
  const { qid } = router.query;
  const correctAnswers = quizInfo.map(
    (eachQuestion: QuizQuestion) => eachQuestion.correct_answer
  );
  const [responses, updateResponses] = useState(
    quizInfo.map((_) => ({ response: '' }))
  );
  const handleCheckboxClick = (
    isCheck: boolean,
    option: string,
    index: number
  ) => {
    let temp = [...responses];
    temp[index].response = option;
    updateResponses(temp);
  };

  const handleQuizSubmit = () => {
    updateResponses(quizInfo.map((_) => ({ response: '' })));
  };

  return (
    <main className="container">
      <Head>
        <title>Quiz| {quizInfo[0].category}</title>
      </Head>
      <div className="quiz-title">
        <span>Quiz on {quizInfo[0].category}</span>
      </div>
      <section className="quiz-section">
        {quizInfo.map((eachQuestion: QuizQuestion, index) => (
          <QuestionCard
            {...{
              ...eachQuestion,
              index,
              handleCheckboxClick,
              userResponse: responses,
            }}
            key={index}
          />
        ))}
      </section>
      {responses.every((eachResponse) => eachResponse.response) && (
        <div className="sticky-bottom">
          <Button value="Submit Quiz" handleClick={handleQuizSubmit} />
        </div>
      )}
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
          .quiz-section {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 100%;
            padding: 0 0 80px;
          }
          .sticky-bottom {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 80px;
            left: 0;
            background: #fff;
            box-shadow: 0 0 31px 0 rgba(0, 0, 0, 0.14);
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 0 20px;
            box-sizing: border-box;
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
