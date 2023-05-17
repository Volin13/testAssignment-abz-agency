import React from 'react';
import css from './Button.module.css';

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
        {text}
      </button>
    </div>
  );
};

export default Button;
