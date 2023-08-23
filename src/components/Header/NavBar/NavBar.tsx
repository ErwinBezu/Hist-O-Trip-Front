/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
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
        {/* <img
          src="../src/assets/logo.png"
          alt="logo Hist'O'Trip"
          className="logo"
        />
        <div>
          <input type="text" placeholder="Rechercher un Lieu" />
          <button type="button">
            <AiOutlineSearch />
          </button>
        </div>
        <div>
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
        <Categories /> */}
        <button type="button" onClick={() => setIsVisisble(true)}>
          <AiOutlineControl /> Filtre
        </button>
        {isVisible && <Filter setIsVisible={setIsVisisble} />}
      </div>
    </>
  );
};

export default NavBar;
