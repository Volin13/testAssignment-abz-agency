import React from 'react';
import css from './Button.module.css';
import { ThreeDots } from 'react-loader-spinner';

const Button = ({
  text = '',
  type = '',
  onClick = () => {},
  btnFormatting = '',
  disabled = false,
  loading,
}) => {
  return (
    <div className={btnFormatting}>
      <button
        className={css.btn}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {loading ? (
          <ThreeDots
            height="27"
            width="80"
            colors={['#b8c480', '#B2A3B5', '#51E5FF']}
          />
        ) : (
          text
        )}
      </button>
    </div>
  );
};

export default Button;
