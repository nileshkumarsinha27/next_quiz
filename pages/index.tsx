require('es6-promise').polyfill();
require('isomorphic-fetch');
import Head from 'next/head';
import { NextPage } from 'next';
import { HomePageProps } from '../types/homePageProps';
import { TriviaCategory } from '../types/triviaCategory';
import CategoryCard from '../components/category-card/CategoryCard';
import Loader from '../components/loader/Loader';
import { isDataExists } from '../helpers/array';

const Home: NextPage<HomePageProps> = ({ categories }: HomePageProps) => (
  <main className="container">
    <Head>
      <title>Quiz| Dashboard</title>
    </Head>
    {!isDataExists(categories) ? (
      <Loader />
    ) : (
      <>
        <section className="home-title">
          <span>Please select a category to start the quiz</span>
        </section>
        <section className="trivia-category-section">
          {categories.map(({ id, name }: TriviaCategory) => (
            <CategoryCard key={id} {...{ id, name }} />
          ))}
        </section>
      </>
    )}
    <style jsx lang="scss">
      {`
        .home-title {
          width: 100%;
          box-sizing: border-box;
          padding: 0 15px;
        }
        .home-title span {
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

Home.getInitialProps = async ({ req }) => {
  const response = await fetch('https://opentdb.com/api_category.php');
  const jsonResponse = await response.json();
  return {
    categories: jsonResponse.trivia_categories,
  };
};

export default Home;
