import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineControl,
  AiOutlineHome,
} from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import Categories from '../../Categories/Categories';
import Login from '../../Auth/Login/Login';
import Filter from '../Filter/Filter';
import './NavBar.scss';
import UserProfil from '../../UserProfil/UserProfil';
import { Context } from '../../App/App';
import { SearchInput } from '../../contexts';

const NavBar = () => {
  const context = useContext(Context);

  if (!context) {
    return;
  }

  const {
    isLoggedIn,
    setIsLoggedIn,
    isVisible,
    setIsVisible,
    menueVisible,
    setMenueVisible,
  } = context;

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

  const { searchInput, setSearchInput } = useContext(SearchInput);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src="../src/assets/images/logo.png" alt="logo Hist'O'Trip" />
        </Link>
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher un Lieu"
            name=""
            id=""
            value={searchInput}
            onChange={handleChange}
          />
          <span className="search-btn">
            <AiOutlineSearch />
          </span>
        </div>

        <div className="suggest-menu-container">
          {isLoggedIn ? (
            <>
              <button type="button" className="suggest-btn">
                Proposer un lieu
              </button>
              <button
                type="button"
                className="menu-btn"
                onClick={() => setMenueVisible((prevstate) => !prevstate)}
              >
                <AiOutlineMenu />
                <BsFillPersonFill />
              </button>
            </>
          ) : (
            <button
              type="button"
              className="menu-btn"
              onClick={() => setMenueVisible((prevstate) => !prevstate)}
            >
              <BsFillPersonFill />
            </button>
          )}

          {menueVisible && (isLoggedIn ? <UserProfil /> : <Login />)}
        </div>
      </div>

      <div className="filter-container">
        <button type="button" className="previous-btn">
          &lt;
        </button>
        <Categories />
        <button type="button" className="next-btn">
          &gt;
        </button>
        <button
          type="button"
          onClick={() => setIsVisible(true)}
          className="filter-btn"
        >
          <AiOutlineControl /> Filtre
        </button>
        {isVisible && <Filter setIsVisible={setIsVisible} />}
      </div>

      <div className={`mobilebar-container ${isBottom ? 'hidden' : ''}`}>
        {menueVisible && (isLoggedIn ? <UserProfil /> : <Login />)}
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
          <AiOutlineControl /> Filter
        </button>

        {isVisible && <Filter setIsVisible={setIsVisible} />}

        <button
          type="button"
          className="menu-btn"
          onClick={() => setMenueVisible((prevstate) => !prevstate)}
        >
          <BsFillPersonFill /> {isLoggedIn ? 'Profil' : 'Connexion'}
        </button>
      </div>
    </>
  );
};

export default NavBar;
