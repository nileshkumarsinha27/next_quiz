import React, { FC, ButtonHTMLAttributes } from 'react';
import cx from 'classnames';
import ButtonStyles from './button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  btnType?: string;
}

const Button: FC<ButtonProps> = ({
  value,
  btnType = 'primary',
  ...props
}: ButtonProps) => (
  <>
    <button className={cx([ButtonStyles.button, btnType])} {...props}>
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
        .error {
          background: #d63443;
          border: 1px solid #d63443;
        }
        .error :hover {
          background: #fff;
          color: #d63443;
        }
      `}
    </style>
  </>
);

export default Button;
