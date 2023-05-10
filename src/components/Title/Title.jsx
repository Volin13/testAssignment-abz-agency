import React, { forwardRef } from 'react';
import css from './Title.module.css';

const Title = forwardRef(function Title(props, ref) {
  const { text } = props;
  return (
    <div className={css.titleThumb} ref={ref}>
      <h2 className={css.titleText}>{text}</h2>
    </div>
  );
});
export default Title;
