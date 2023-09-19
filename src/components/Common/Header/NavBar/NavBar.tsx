import React, { useContext, useEffect, useState } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import Login from '../../../Modal/Auth/Login/Login';
import Filter from '../../../Modal/Filter/Filter';
import './NavBar.scss';
import UserProfil from '../../../Modal/UserProfil/UserProfil';
import { Context } from '../../../App/App';

import SignUp from '../../../Modal/Auth/SignUp/SignUp';
import UserEditProfil from '../../../Modal/UserProfil/UserEditProfil';
import Logo from './Logo';
import Search from './Search';
import Suggest from './Suggest';

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
    signUpModal,
    loginModal,
    editVisible,
  } = context;

  const handleScrollStyle = () => {
    if (isVisible || editVisible || signUpModal || loginModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Appelez cette fonction à chaque changement d'état des modales
  useEffect(() => {
    handleScrollStyle();
  }, [
    isLoggedIn,
    menueVisible,
    editVisible,
    signUpModal,
    loginModal,
    isVisible,
  ]);

  return (
    <>
      {signUpModal && <SignUp />}
      {loginModal && <Login />}
      {menueVisible && <UserProfil />}
      {isVisible && <Filter setIsVisible={setIsVisible} />}
      {editVisible && <UserEditProfil />}
      <div
        className="navbar-container"
        onClick={() => (menueVisible ? setMenueVisible(false) : '')}
      >
        <Logo />
        <Search />

        <div className="suggest-menu-container">
          {isLoggedIn ? (
            <>
              <Suggest />

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
    </>
  );
};

export default NavBar;

/*
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

        <Link to="/proposer" className="suggestLink-navbar">
                <button className="suggest-btn" type="button">
                  Proposer un lieu
                </button>
              </Link>



      <div
        className={`mobilebar-container ${
          (isBottom as boolean) ? 'hidden' : ''
        }`}
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
*/
