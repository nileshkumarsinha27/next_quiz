import React, { FC } from 'react';
import { TriviaCategory } from '../../types/triviaCategory';
import CategoryCardStyles from './categoryCard.module.scss';

const CategoryCard: FC<TriviaCategory> = ({ id, name }: TriviaCategory) => (
  <div className={CategoryCardStyles.categoryCard}>
    <span>{name}</span>
  </div>
);

export default CategoryCard;
