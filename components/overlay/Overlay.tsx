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
    if (event.keyCode === 27) {
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
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Overlay;
