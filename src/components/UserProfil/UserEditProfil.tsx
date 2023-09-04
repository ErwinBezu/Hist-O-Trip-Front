import { IoIosArrowBack } from 'react-icons/io';
import './UserEditProfil.scss';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Context } from '../App/App';
import Cookies from 'js-cookie';

const UserEditProfil = () => {
  const context = useContext(Context);

  if (!context) {
    return <div></div>;
  }
 

  const { setEditVisible } = context;
  const storedUserData = localStorage.getItem('userData');
  const userData = JSON.parse(storedUserData);

  
  console.log('userdata ici', userData);
  const token = Cookies.get('jwtToken');
  console.log('ici token', token);
  

  const [firstname, setFirstname] = useState(userData.firstname || '');
  const [lastname, setLastname] = useState(userData.lastname || '');
  const [pseudonym, setPseudonym] = useState(userData.pseudonym || '');
  const [password, setPassword] = useState('');

  

  const handleEdit = async (e, token) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://ludoviclebris-server.eddi.cloud/api/api/users/${userData.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ firstname, lastname, pseudonym }),
        }
      );
      if (response.ok) {
        console.log('Les données ont bien été changées');
      }
    } catch (error) {
      console.error('Erreur de changement des infos');
    }
  };

  return (
    <>
      <div
        className="edit-profil-bg"
        onClick={() => setEditVisible(false)}
      ></div>
      <form className="profil-edit-container" onSubmit={(e) => handleEdit(e, token)}>
        <div className="profil-edit-header">
          <label
            className="profil-edit-back-btn"
            onClick={() => setEditVisible(false)}
          >
            <IoIosArrowBack />
          </label>
          <h2>Mon profil</h2>
        </div>
        <div className="profil-edit-content">
          <label className="profil-edit-avatar" htmlFor="edit-profile-image">
            Télécharger une image
          </label>
          <input
            type="file"
            id="edit-profile-image"
            name="profileImage"
            accept="image/*"
          />
          <div className="profil-edit-pseudo">
            <input
              type="text"
              placeholder={userData.pseudonym}
              onChange={(e) => setPseudonym(e.target.value)}
              value={pseudonym}
            />
          </div>
          <div className="profil-edit-name">
            <input
              type="text"
              placeholder={userData.lastname}
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
            />
            <input
              type="text"
              placeholder={userData.firstname}
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
            />
          </div>
          <div className="profil-edit-inofs">
            <input
              type="email"
              placeholder={userData.email}
              disabled
            />
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            className="profil-edit-validation"
            type="submit"
            
          >
            Valider modification
          </button>
        </div>
        <div className="profil-footer"></div>
      </form>
    </>
  );
};

export default UserEditProfil;
