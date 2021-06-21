import React, { FC } from 'react';
import { PageProps } from '../types/pageProps';
import '../styles/_main.scss';
import Layout from '../components/layout/Layout';

const MyApp: FC<PageProps> = ({ Component, pageProps }: PageProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
