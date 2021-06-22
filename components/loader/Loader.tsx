import React, { SFC } from 'react';
import LoaderLogo from '../logos/LoaderLogo';
import LoaderStyles from './loader.module.scss';

const Loader: SFC = () => {
  return (
    <div className={LoaderStyles.loader}>
      <LoaderLogo />
    </div>
  );
};

export default Loader;
