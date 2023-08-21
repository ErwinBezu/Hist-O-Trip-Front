/* eslint-disable react/function-component-definition */
import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import NavBar from './NavBar/NavBar';
import './header.scss';

const Header = () => {
  return (
    <header className="header-container">
      <NavBar />
    </header>
  );
};

export default Header;
