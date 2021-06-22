import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { QuizQuestion } from '../../types/quizPageProps';
import QuestionCardStyles from './questionCard.module.scss';
import { shuffleArray } from '../../helpers/array';
import { decodeEscapeString } from '../../helpers/string';
import Checkbox from '../check-box/CheckBox';

export interface QuestionCardProps extends QuizQuestion {
  index: number;
  handleCheckboxClick: (
    isCheck: boolean,
    option: string,
    index: number
  ) => void;
  userResponse: Array<any>;
  hasTestSubmit: boolean;
}
const variants = {
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
  hidden: { opacity: 0 },
};

const QuestionCard = ({
  correct_answer,
  incorrect_answers,
  question,
  index,
  handleCheckboxClick,
  userResponse,
  hasTestSubmit,
}) => {
  const [shuffledList, updateShuffledList] = useState<Array<string>>([]);
  useEffect(() => {
    updateShuffledList(shuffleArray([...incorrect_answers, correct_answer]));
  }, []);

  return (
    <div className={QuestionCardStyles.questionCardContainer}>
      <div className={QuestionCardStyles.questionSection}>
        <span className={QuestionCardStyles.questionIndex}>{index + 1}.</span>
        <span className={QuestionCardStyles.question}>
          {decodeEscapeString(question)}
        </span>
      </div>
      <div className={QuestionCardStyles.optionsSection}>
        {shuffledList.map((option, i) => (
          <AnimatePresence>
            <motion.div
              custom={i + 1}
              initial="hidden"
              animate="visible"
              variants={variants}
              className={QuestionCardStyles.questionContainer}
              key={option}
            >
              <Checkbox
                label={decodeEscapeString(String(option))}
                type="radio"
                handleBoxClick={(isCheck) =>
                  handleCheckboxClick(isCheck, option, index)
                }
                checkState={userResponse[index].response === option}
                isCorrectResponse={
                  hasTestSubmit &&
                  userResponse[index].isResponseCorrect &&
                  userResponse[index].response === option
                }
                isErrorResponse={
                  hasTestSubmit &&
                  !userResponse[index].isResponseCorrect &&
                  userResponse[index].response === option
                }
                key={option}
              />
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
