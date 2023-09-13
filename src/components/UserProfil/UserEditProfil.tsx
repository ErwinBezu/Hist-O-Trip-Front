import { IoIosArrowBack } from 'react-icons/io';
import './UserEditProfil.scss';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Context } from '../App/App';
import Cookies from 'js-cookie';
import { getUser } from '../Auth/Login/Login';

const UserEditProfil = () => {
  const context = useContext(Context);

  if (!context) {
    return null;
  }

  const { setEditVisible } = context;
  const storedUserData: any = localStorage.getItem('userData');
  const userData = JSON.parse(storedUserData);

  const token = Cookies.get('jwtToken');

  const [firstname, setFirstname] = useState(userData.firstname || '');
  const [lastname, setLastname] = useState(userData.lastname || '');
  const [pseudonym, setPseudonym] = useState(userData.pseudonym || '');

  const handleEdit = async (e: any, token: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userData.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ firstname, lastname, pseudonym }),
        }
      );
      if (response.ok) {
        getUser(token);
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
      <form
        className="profil-edit-container"
        onSubmit={(e) => handleEdit(e, token)}
      >
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
            <input type="email" placeholder={userData.email} disabled />
          </div>
          <button className="profil-edit-validation" type="submit">
            Valider modification
          </button>
        </div>
        <div className="profil-footer"></div>
      </form>
    </>
  );
};

export default UserEditProfil;
