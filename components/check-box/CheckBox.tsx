import React, { FC, useState, useEffect } from 'react';
import cx from 'classnames';
import CheckBoxStyles from './checkbox.module.scss';
import CheckIcon from '../logos/CheckIcon';
import CheckIconGreen from '../logos/checkIconGreen';
import chcekIconError from '../logos/checkIconGreen';
import CheckIconError from '../logos/CheckIconError';

export type CheckBoxProps = {
  type?: string;
  label?: string;
  checkState?: boolean;
  handleBoxClick: (isCheck: boolean) => void;
  isCorrectResponse?: boolean;
  isErrorResponse?: boolean;
};

const CheckBox: FC<CheckBoxProps> = ({
  type = 'checkbox',
  label = '',
  checkState = false,
  handleBoxClick,
  isCorrectResponse = false,
  isErrorResponse = false,
}: CheckBoxProps) => {
  const [isCheck, toggleCheck] = useState<boolean>(checkState);
  useEffect(() => {
    toggleCheck(checkState);
  }, [checkState]);
  const getCheckIcon = () => {
    if (isCorrectResponse) {
      return <CheckIconGreen />;
    }
    if (isErrorResponse) {
      return <CheckIconError />;
    }
    return <CheckIcon />;
  };
  return (
    <div>
      <div
        className={CheckBoxStyles.checkboxContainer}
        onClick={() => {
          toggleCheck(!isCheck);
          handleBoxClick(!isCheck);
        }}
      >
        {isCheck ? getCheckIcon() : <input type={type} />}
        <label
          className={cx(
            ['selected'],
            { [CheckBoxStyles.labelSelected]: isCheck },
            { [CheckBoxStyles.correctResponse]: isCorrectResponse },
            { [CheckBoxStyles.errorResponse]: isErrorResponse }
          )}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default CheckBox;
