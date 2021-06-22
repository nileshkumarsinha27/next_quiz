import React, { FC, useState } from 'react';
import CheckBoxStyles from './checkbox.module.scss';
import CheckIcon from '../logos/CheckIcon';

export type CheckBoxProps = {
  type?: string;
  label?: string;
  checkState?: boolean;
};

const CheckBox: FC<CheckBoxProps> = ({
  type = 'checkbox',
  label = '',
  checkState = false,
}: CheckBoxProps) => {
  const [isCheck, toggleCheck] = useState<boolean>(checkState || false);
  return (
    <div>
      <div
        className={CheckBoxStyles.checkboxContainer}
        onClick={() => toggleCheck(!isCheck)}
      >
        {isCheck ? <CheckIcon /> : <input type={type} />}
        <label>{label}</label>
      </div>
    </div>
  );
};

export default CheckBox;
