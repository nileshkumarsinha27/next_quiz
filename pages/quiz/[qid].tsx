require('es6-promise').polyfill();
require('isomorphic-fetch');
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { QuizPageProps, QuizQuestion } from '../../types/quizPageProps';
import QuestionCard from '../../components/question-card/QuestionCard';
import Button from '../../components/button/Button';
import Overlay from '../../components/overlay/Overlay';
import Dialogbox from '../../components/dailog-box/DialogBox';

const Quiz: NextPage<QuizPageProps> = ({ quizInfo }: QuizPageProps) => {
  const router = useRouter();
  const { qid } = router.query;
  const correctAnswers = quizInfo.map(
    (eachQuestion: QuizQuestion) => eachQuestion.correct_answer
  );
  const [responses, updateResponses] = useState(
    quizInfo.map((_) => ({ response: '', isResponseCorrect: false }))
  );
  const [showScore, toggleScore] = useState<boolean>(false);
  const [score, updateScore] = useState<number>(0);
  const [hasTestSubmit, toggleTestSubmit] = useState<boolean>(false);
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
    let finalScore = 0;
    responses.forEach((eachResponse, index) => {
      if (eachResponse.response === correctAnswers[index]) {
        finalScore += 1;
        eachResponse.isResponseCorrect = true;
      }
    });
    updateScore(finalScore);
    toggleScore(true);
    toggleTestSubmit(true);
  };

  const hadleOkClick = () => {
    toggleScore(false);
  };
  const handleCancelClick = () => {
    updateScore(0);
    toggleScore(false);
    toggleTestSubmit(false);
    updateResponses(
      quizInfo.map((_) => ({ response: '', isResponseCorrect: false }))
    );
  };

  return (
    <main className="container">
      <Head>
        <title>Quiz| {quizInfo[0].category}</title>
      </Head>
      <div className="quiz-title">
        <Link href="/">
          <span className="category-text">Categories</span>
        </Link>
        <span> &gt; {quizInfo[0].category}</span>
      </div>
      <section className="quiz-section">
        {quizInfo.map((eachQuestion: QuizQuestion, index) => (
          <QuestionCard
            {...{
              ...eachQuestion,
              index,
              handleCheckboxClick,
              userResponse: responses,
              hasTestSubmit,
            }}
            key={index}
          />
        ))}
      </section>
      {responses.every((eachResponse) => eachResponse.response) && (
        <div className="sticky-bottom">
          <div className="button-container">
            <Button
              value="Reset Quiz"
              onClick={handleCancelClick}
              btnType="error"
            />
            <Button value="Submit Quiz" onClick={handleQuizSubmit} />
          </div>
        </div>
      )}
      {showScore && (
        <Overlay closeOverlay={() => toggleScore(false)}>
          <Dialogbox
            showActionsSection
            actionsConfig={[
              {
                value: 'Ok',
                onClick: hadleOkClick,
                btnType: 'primary',
              },
              {
                value: 'Cancel',
                onClick: handleCancelClick,
                btnType: 'error',
              },
            ]}
          >
            <p className="dialog-text">
              <span>
                Your final score is
                <strong>
                  {score} / {responses.length}.
                </strong>
              </span>
              <span>Do you wish to check correct answers?</span>
            </p>
          </Dialogbox>
        </Overlay>
      )}
      <style jsx lang="scss">
        {`
          .quiz-title {
            width: 100%;
            box-sizing: border-box;
            padding: 0 15px;
          }
          .quiz-title span {
            color: #2184ff;
            font-size: 0.9rem;
            font-weight: bold;
          }
          .quiz-title .category-text {
            cursor: pointer;
            color: #000000;
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
          .button-container {
            width: 30%;
            display: flex;
            justify-content: space-evenly;
          }
          .dialog-text {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .dialog-text strong {
            padding: 0 5px;
            font-size: 1.2rem;
          }
          .dialog-text span {
            padding: 5px 0;
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
