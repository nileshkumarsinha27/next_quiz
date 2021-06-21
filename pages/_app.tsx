import React from 'react';
import { PageProps } from '../types/pageProps';
import '../styles/_main.scss';
const MyApp = ({ Component, pageProps }: PageProps): React.ReactNode => (
  <Component {...pageProps} />
);

export default MyApp;
