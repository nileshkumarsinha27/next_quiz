import React, { FC } from 'react';
import Head from 'next/head';
import Header from '../header/Header';
import { LayoutProps } from '../../types/layoutProps';

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => (
  <>
    <Head>
      <meta
        name="description"
        content="a simple quiz app developed using next.js"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    {children}
  </>
);

export default Layout;
