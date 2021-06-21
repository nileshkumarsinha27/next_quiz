import React, { ReactElement } from 'react';
import HeaderStyles from './header.module.scss';
import AppIcon from '../logos/AppIcon';

const Header = (): ReactElement => (
  <header className={HeaderStyles.headerContainer}>
    <AppIcon />
    <span className={HeaderStyles.title}>Category Quiz</span>
  </header>
);

export default Header;
