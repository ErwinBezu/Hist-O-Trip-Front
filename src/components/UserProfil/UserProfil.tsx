import React, { useContext, useEffect, useState } from 'react';
import './UserProfil.scss';
import UserEditProfil from './UserEditProfil';
import { Context } from '../App/App';
import { AiOutlineClose } from 'react-icons/ai';
import Cookies from 'js-cookie';

const UserProfil = () => {
  const handleLogout = () => {
    Cookies.remove('jwtToken');
    window.location.reload();
  };

  // ! a verifier le fonctionnement
  const context = useContext(Context);

  if (!context) {
    return null;
  }
  const {
    isLoggedIn,
    setIsLoggedIn,
    editVisible,
    setEditVisible,
    setMenueVisible,
    menueVisible
  } = context;
  // ! Fin du code à verifier

  

  return (
    <div className='profil-modal' >
    <div className="Profil-container">
      <div className="profil-header">
        <label
          className="profil-quit-btn"
          onClick={() => setMenueVisible(false)}
        >
          <AiOutlineClose />
        </label>
        <h2>Profil</h2>
      </div>
      <div className="profil-content">
        <button
          className="profil-profil-btn"
          onClick={() => setEditVisible(true)}
        >
          Mon profil
        </button>
        <button
          type="submit"
          className="profil-deco-btn"
          onClick={handleLogout}
        >
          Se déconnecter
        </button>
      </div>
    </div>
    </div>
  );
};

export default UserProfil;
