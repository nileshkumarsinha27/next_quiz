import React, { FC, useState, useEffect } from 'react';
import CheckBoxStyles from './checkbox.module.scss';
import CheckIcon from '../logos/CheckIcon';

export type CheckBoxProps = {
  type?: string;
  label?: string;
  checkState?: boolean;
  handleBoxClick: (isCheck: boolean) => void;
};

const CheckBox: FC<CheckBoxProps> = ({
  type = 'checkbox',
  label = '',
  checkState = false,
  handleBoxClick,
}: CheckBoxProps) => {
  const [isCheck, toggleCheck] = useState<boolean>(checkState);
  useEffect(() => {
    toggleCheck(checkState);
  }, [checkState]);
  return (
    <div>
      <div
        className={CheckBoxStyles.checkboxContainer}
        onClick={() => {
          toggleCheck(!isCheck);
          handleBoxClick(!isCheck);
        }}
      >
        {isCheck ? <CheckIcon /> : <input type={type} />}
        <label className={isCheck ? CheckBoxStyles.labelSelected : ''}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default CheckBox;
