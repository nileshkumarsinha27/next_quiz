import React, { FC, useEffect, ReactNode } from 'react';
import OverlayStyles from './overlay.module.scss';

export type OverlayProps = {
  closeOverlay: () => void;
  children?: ReactNode;
};

const Overlay: FC<OverlayProps> = ({
  closeOverlay,
  children = <></>,
}: OverlayProps) => {
  const overlayClose = (event: KeyboardEvent) => {
    if (event.key === 'esc') {
      closeOverlay();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', overlayClose);
    return () => window.removeEventListener('keydown', overlayClose);
  }, []);
  return (
    <div className={OverlayStyles.overlayContainer}>
      <div className={OverlayStyles.overlay} />
      {children}
    </div>
  );
};

export default Overlay;
