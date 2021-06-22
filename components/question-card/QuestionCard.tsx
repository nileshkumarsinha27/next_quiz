import React from 'react';
import { QuizQuestion } from '../../types/quizPageProps';
import QuestionCardStyles from './questionCard.module.scss';
import { shuffleArray } from '../../helpers/array';
import { decodeEscapeString } from '../../helpers/string';
import Checkbox from '../check-box/CheckBox';

const QuestionCard = ({
  correct_answer,
  incorrect_answers,
  question,
  index,
}: QuizQuestion) => {
  return (
    <div className={QuestionCardStyles.questionCardContainer}>
      <div className={QuestionCardStyles.questionSection}>
        <span className={QuestionCardStyles.questionIndex}>{index + 1}.</span>
        <span className={QuestionCardStyles.question}>
          {decodeEscapeString(question)}
        </span>
      </div>
      <div className={QuestionCardStyles.optionsSection}>
        {shuffleArray([...incorrect_answers, correct_answer]).map(
          (option, index) => (
            <Checkbox
              key={index}
              label={decodeEscapeString(option)}
              type="radio"
            />
          )
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
