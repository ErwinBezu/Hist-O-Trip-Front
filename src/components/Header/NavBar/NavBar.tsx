import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
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

type ContextType = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  menueVisible: boolean;
  setMenueVisible: React.Dispatch<React.SetStateAction<boolean>>;
  editVisible: boolean;
  setEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
  signUpModal: boolean;
  setSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBar = () => {
  const context = useContext(Context);

  if (!context) {
    // Gérer le cas où le contexte n'est pas défini
    return null;
  }

  const {
    isLoggedIn,
    setIsLoggedIn,
    isVisible,
    setIsVisible,
    menueVisible,
    setMenueVisible,
    setLoginModal,
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

  const location = useLocation();
  const { id, slug } = useParams<{ id?: string; slug?: string }>();

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
      <div
        className="navbar-container"
        onClick={() => (menueVisible ? setMenueVisible(false) : '')}
      >
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
              <Link to="/proposer" className="suggestLink-navbar">
                <button className="suggest-btn" type="button">
                  Proposer un lieu
                </button>
              </Link>
              <button
                type="button"
                className="menu-btn"
                onClick={() => setMenueVisible((prevstate: any) => !prevstate)}
              >
                <AiOutlineMenu />
                <BsFillPersonFill />
              </button>
            </>
          ) : (
            <button
              type="button"
              className="menu-btn"
              onClick={() => setLoginModal(true)}
            >
              <BsFillPersonFill />
            </button>
          )}
        </div>
      </div>

      <div
        className={`${
          location.pathname === '/'
            ? 'filter-container'
            : 'filter-container-none'
        }`}
        onClick={() => (menueVisible ? setMenueVisible(false) : '')}
      >
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
      </div>

      <div className={`mobilebar-container ${isBottom ? 'hidden' : ''}`}>
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
    </>
  );
};

export default NavBar;
