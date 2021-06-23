require('es6-promise').polyfill();
require('isomorphic-fetch');
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { QuizPageProps, QuizQuestion } from '../../types/quizPageProps';
import QuestionCard from '../../components/question-card/QuestionCard';
import Button from '../../components/button/Button';
import Overlay from '../../components/overlay/Overlay';
import Dialogbox from '../../components/dailog-box/DialogBox';
import Loader from '../../components/loader/Loader';
import { isDataExists } from '../../helpers/array';

const variants = {
  initial: {
    y: '200%',
  },
  animate: (i) => ({
    y: 20,
    transition: { ease: 'easeIn', type: 'spring', delay: i * 0.1 },
  }),
  exit: { y: '200%', transition: { duration: 0.6 } },
};

const stickyBanner = {
  initial: { y: '200%' },
  animate: {
    y: 0,
    transition: { duration: 0.6, ease: 'easeIn' },
  },
  exit: { y: '200%', transition: { duration: 0.6 } },
};

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
  const [showQuiz, toggleShowQuiz] = useState<boolean>(false);
  const handleCheckboxClick = (
    isCheck: boolean,
    option: string,
    index: number
  ) => {
    let temp = [...responses];
    temp[index].response = temp[index].response === option ? '' : option;
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
      {!isDataExists(quizInfo) ? (
        <Loader />
      ) : (
        <>
          {showQuiz ? (
            <>
              <AnimatePresence>
                <section className="quiz-section">
                  {quizInfo.map((eachQuestion: QuizQuestion, index) => (
                    <motion.section
                      custom={index + 1}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={variants}
                      key={index}
                      style={{ width: '100%' }}
                    >
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
                    </motion.section>
                  ))}
                </section>
              </AnimatePresence>
              {responses.every((eachResponse) => eachResponse.response) && (
                <AnimatePresence>
                  <motion.div
                    className="sticky-bottom"
                    variants={stickyBanner}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{
                      position: 'fixed',
                      bottom: 0,
                      width: '100%',
                      height: '80px',
                      left: 0,
                      background: '#fff',
                      boxShadow: '0 0 31px 0 rgba(0, 0, 0, 0.14)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      padding: '0 20px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div className="button-container">
                      <Button
                        value="Reset Quiz"
                        onClick={handleCancelClick}
                        btnType="error"
                      />
                      <Button value="Submit Quiz" onClick={handleQuizSubmit} />
                    </div>
                  </motion.div>
                </AnimatePresence>
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
            </>
          ) : (
            <>
              <Overlay closeOverlay={() => toggleShowQuiz(true)}>
                <Dialogbox
                  showActionsSection
                  actionsConfig={[
                    {
                      value: 'Start Quiz',
                      onClick: () => toggleShowQuiz(true),
                      btnType: 'primary',
                    },
                  ]}
                >
                  <div className="dialog-text">
                    <span>Following are the rules for the quiz:</span>
                    <ol>
                      <li>
                        All the questions must be attempted in order to end the
                        quiz.
                      </li>
                      <li>
                        The quiz has a time limit of 10 minutes and will be
                        automatically submitted once the time is over.
                      </li>
                    </ol>
                    <span>All the best for the quiz!!!!!!</span>
                  </div>
                </Dialogbox>
              </Overlay>
            </>
          )}
        </>
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
          .quiz-section .quiz-card {
            width: 100%;
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
          .dialog-text ol {
            list-style: number;
            display: flex;
            flex-direction: column;
            width: 90%;
            margin: 0 auto;
          }
          .dialog-text li {
            padding: 5px 0;
            box-sizing: border-box;
          }
          @media screen and (max-width: 767px) {
            .button-container {
              width: 100%;
            }
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
