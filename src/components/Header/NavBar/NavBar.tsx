/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
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
        <button type="button" className="filter-btn">
          <AiOutlineControl /> Filtre
        </button>
      </div>
    </>
  );
};

export default NavBar;
