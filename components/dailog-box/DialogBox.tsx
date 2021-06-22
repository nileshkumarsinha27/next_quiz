import React, { FC, ReactNode } from 'react';
import DialogBoxStyles from './dialogBox.module.scss';
import Button from '../button/Button';

export type DialogBoxProps = {
  children: ReactNode;
  showActionsSection?: boolean;
  actionsConfig?: Array<any>;
};

const Dialogbox: FC<DialogBoxProps> = ({
  children,
  showActionsSection = false,
  actionsConfig = [],
}: DialogBoxProps) => {
  return (
    <div className={DialogBoxStyles.container}>
      {children}
      {showActionsSection && (
        <div className={DialogBoxStyles.actionsContainer}>
          {actionsConfig.map((action, index) => (
            <Button key={index} {...action} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dialogbox;
