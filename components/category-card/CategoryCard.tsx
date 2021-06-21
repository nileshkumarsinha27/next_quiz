import React, { FC } from 'react';
import Link from 'next/link';
import { TriviaCategory } from '../../types/triviaCategory';
import CategoryCardStyles from './categoryCard.module.scss';

const CategoryCard: FC<TriviaCategory> = ({ id, name }: TriviaCategory) => (
  <Link href={`/quiz/${id}`}>
    <div className={CategoryCardStyles.categoryCard}>
      <span>{name}</span>
    </div>
  </Link>
);

export default CategoryCard;
