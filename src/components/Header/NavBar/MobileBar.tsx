import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineControl, AiOutlineHome } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';

import { Context } from '../../App/App';

const MobileBar = () => {
  const context = useContext(Context);

  if (!context) {
    // Gérer le cas où le contexte n'est pas défini
    return null;
  }

  const { isLoggedIn, setIsVisible, setMenueVisible, setLoginModal } = context;

  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    if (scrollTop + windowHeight >= documentHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`mobilebar-container ${(isBottom as boolean) ? 'hidden' : ''}`}
    >
      <Link to="/">
        <button className="home-mobile-btn">
          <AiOutlineHome /> Home
        </button>
      </Link>
      <button
        type="button"
        onClick={() => setIsVisible(true)}
        className="filter-btn"
      >
        <span className="logo-filter">
          <AiOutlineControl />
        </span>
        <span>Filter</span>
      </button>

      <button
        type="button"
        className="menu-btn"
        onClick={() =>
          isLoggedIn
            ? setMenueVisible((prevstate: any) => !prevstate)
            : setLoginModal(true)
        }
      >
        <BsFillPersonFill /> {isLoggedIn ? 'Profil' : 'Connexion'}
      </button>
    </div>
  );
};

export default MobileBar;
