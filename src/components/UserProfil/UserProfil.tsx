import React, { useContext, useEffect, useState } from 'react';
import './UserProfil.scss';
import UserEditProfil from './UserEditProfil';
import { Context } from '../App/App';
import { AiOutlineClose } from 'react-icons/ai';
import Cookies from 'js-cookie';


const UserProfil = () => {

  const {isLoggedIn, setIsLoggedIn, editVisible, setEditVisible, setMenueVisible} = useContext(Context);
  
  const handleLogout = () => {
    Cookies.remove('jwtToken');
    window.location.reload();
  }

  // ! a verifier le fonctionnement
  const context = useContext(Context);

  if (!context) {
    return <div>Loading...</div>;
  }
  const { editVisible, setEditVisible, setMenueVisible } = context;
  // ! Fin du code à verifier


  useEffect(() => {
    if (editVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; // Remettre le scroll normal lorsque le composant est démonté
    };
  }, [editVisible]);

  return (


     <div className="Profil-container">
        <div className="profil-header">
          <label className='profil-quit-btn' onClick={() => setMenueVisible(false)}> <AiOutlineClose/> </label>
            <h2>Profil</h2>
          </div>
        <div className="profil-content">
          
          <button className='profil-profil-btn' onClick={() => setEditVisible(true)} >
              Mon profil
            </button>
            {editVisible && <UserEditProfil />}
            <button className='profil-fav-btn'>
              Favoris
              </button>
              <button className='profil-proposition-btn'>
                Mes propositions
                </button>
                
                <button type="submit" className='profil-deco-btn' onClick={handleLogout}>
                Se déconnecter

                </button>
                
        </div>

      </div>
    </div>
  );
};

export default UserProfil;
