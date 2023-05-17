import React from 'react';
import Button from '../../ReusableComponents/Button/Button';
import css from './Hero.module.css';

const Hero = ({ handleSignUpSectionScroll }) => {
  return (
    <div className={css.heroImage}>
      <div className={css.heroTextGroup}>
        <h1 className={css.heroTitle}>
          Test assignment for front-end developer
        </h1>
        <p className={css.heroText}>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <Button
          btnFormatting={css.heroBtn}
          onClick={handleSignUpSectionScroll}
          type="button"
          text="Sign up"
        />
      </div>
    </div>
  );
};

export default Hero;
