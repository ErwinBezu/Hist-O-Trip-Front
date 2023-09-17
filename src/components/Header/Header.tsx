import React from 'react';
import NavBar from './NavBar/NavBar';
import FilterBar from './NavBar/FilterBar';
import MobileBar from './NavBar/MobileBar';

import './Header.scss';

const Header = () => {
  return (
    <header className="header-container">
      <NavBar />
      <FilterBar />
      <MobileBar />
    </header>
  );
};

export default Header;
