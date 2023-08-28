import React, { useContext, useEffect, useState } from 'react';
import './UserProfil.scss';
import UserEditProfil from './UserEditProfil';
import { Context } from '../App/App';
import { AiOutlineClose } from 'react-icons/ai';

const UserProfil = () => {
  const {editVisible, setEditVisible, setMenueVisible} = useContext(Context);

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
                <button className='profil-deco-btn'>
                Se déconnecter

                </button>
        </div>
      </div>
    
  )
};

export default UserProfil;
