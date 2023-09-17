import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src="../src/assets/images/logo.png" alt="logo Hist'O'Trip" />
    </Link>
  );
};

export default Logo;
