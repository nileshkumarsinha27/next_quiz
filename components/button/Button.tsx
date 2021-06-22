import React, { FC } from 'react';
import cx from 'classnames';
import ButtonStyles from './button.module.scss';

export type ButtonProps = {
  value: string;
  handleClick: () => void;
  btnType?: string;
};

const Button: FC<ButtonProps> = ({
  value,
  handleClick,
  btnType = 'primary',
}: ButtonProps) => (
  <>
    <button
      onClick={handleClick}
      className={cx([ButtonStyles.button, btnType])}
    >
      {value}
    </button>
    <style jsx>
      {`
        .primary {
          background: #2184ff;
          border: 1px solid #2184ff;
        }
        .primary :hover {
          background: #fff;
          color: #2184ff;
        }
      `}
    </style>
  </>
);

export default Button;
