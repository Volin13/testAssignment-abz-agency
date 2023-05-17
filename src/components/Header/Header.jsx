import React from 'react';
import css from './Header.module.css';
import Button from '../../UI/UX/Button/Button';
import { ReactComponent as SvgLogo } from '../../assets/images/Logo/Logo.svg';

const Header = ({ handleUsersSectionІScroll, handleSignUpSectionScroll }) => {
  return (
    <div className={css.header}>
      <div className={`${css.headerSection} container`}>
        <SvgLogo />
        <div className={css.headerBtnGroup}>
          <Button
            btnFormatting={css.btnGroupBtn}
            onClick={handleUsersSectionІScroll}
            type="button"
            text="Users"
          />
          <Button
            btnFormatting={css.btnGroupBtn}
            type="button"
            text="Sign Up"
            onClick={handleSignUpSectionScroll}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
