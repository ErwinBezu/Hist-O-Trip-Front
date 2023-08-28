import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineControl,
} from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import Categories from '../../Categories/Categories';
import Filter from '../Filter/Filter';
import './NavBar.scss';

const NavBar = () => {
  const [isVisible, setIsVisisble] = useState(false);
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
          <button type="button" className="menu-btn">
            <AiOutlineMenu />
            <BsFillPersonFill />
          </button>
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
          onClick={() => setIsVisisble(true)}
          className="filter-btn"
        >
          <AiOutlineControl /> Filtre
        </button>
        {isVisible && <Filter setIsVisible={setIsVisisble} />}
      </div>

      <div className="mobilebar-container">
        <button type="button" className="menu-btn">
          <BsFillPersonFill />
        </button>
        <button
          type="button"
          onClick={() => setIsVisisble(true)}
          className="filter-btn"
        >
          <AiOutlineControl />
        </button>
        {isVisible && <Filter setIsVisible={setIsVisisble} />}
      </div>
    </>
  );
};

export default NavBar;
