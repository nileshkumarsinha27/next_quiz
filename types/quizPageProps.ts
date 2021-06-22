export type QuizQuestion = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
  index?: number;
};

export type QuizPageProps = {
  quizInfo: QuizQuestion[];
};