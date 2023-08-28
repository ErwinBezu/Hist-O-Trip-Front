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
import Filter from '../Filter/Filter';
import './NavBar.scss';
import UserProfil from '../../UserProfil/UserProfil';
import { Context } from '../../App/App';

const NavBar = () => {
  const context = useContext(Context);

  if (!context) {
    // Le contexte n'est pas encore défini, vous pouvez choisir de rendre un état de chargement
    return <div>Loading...</div>;
  }
  const { isVisible, setIsVisible, menueVisible, setMenueVisible } = context;

  return (
    <>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src="../src/assets/images/logo.png" alt="logo Hist'O'Trip" />
        </Link>
        <div className="search-container">
          <input type="text" placeholder="Rechercher un Lieu" />
          <button type="button">
            <AiOutlineSearch />
          </button>
        </div>
        <div className="suggest-menu-container">
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
          {menueVisible && <UserProfil />}
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

      <div className="mobilebar-container">
        <Link to="/">
          <button className="home-mobile-btn">
            <AiOutlineHome />{' '}
          </button>
        </Link>
        <button
          type="button"
          onClick={() => setIsVisible(true)}
          className="filter-btn"
        >
          <AiOutlineControl />
        </button>
        {isVisible && <Filter setIsVisible={setIsVisible} />}
        <button
          type="button"
          className="menu-btn"
          onClick={() => setMenueVisible((prevstate) => !prevstate)}
        >
          <BsFillPersonFill />
        </button>
        {menueVisible && <UserProfil />}
      </div>
    </>
  );
};

export default NavBar;
