/* eslint-disable react/function-component-definition */
import React from 'react';
import {
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineControl,
} from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import Categories from '../../Categories/Categories';
import './NavBar.scss';

const NavBar = () => {
  return (
    <>
      <div className="navbar-container">
        <img
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
        <Categories />
        <button type="button">
          <AiOutlineControl /> Filtre
        </button>
      </div>
    </>
  );
};

export default NavBar;
