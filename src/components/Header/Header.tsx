import React from 'react';
import NavBar from './NavBar/NavBar';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <NavBar />
    </header>
  );
};

export default Header;
