import { IoIosArrowBack } from 'react-icons/io';
import './UserEditProfil.scss';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Context } from '../App/App';
import Cookies from 'js-cookie';
import { getUser } from '../Auth/Login/Login';
import Field from '../Utils/Field/FieldInput';
import apiUrl from '../App/config';

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
  const [email, setEmail] = useState(userData.email || '');

  const handleEdit = async (e: any, token: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/users/${userData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstname, lastname, pseudonym }),
      });
      if (response.ok) {
        getUser(token);
        console.log('Les données ont bien été changées');
      }
    } catch (error) {
      console.error('Erreur de changement des infos');
    }
  };

  const changeField = (
    value: string,
    name: 'pseudonym' | 'lastname' | 'firstname' | 'email'
  ) => {
    if (name === 'pseudonym') {
      setPseudonym(value);
    } else if (name === 'lastname') {
      setLastname(value);
    } else if (name === 'firstname') {
      setFirstname(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const handleChangeField =
    (name: 'pseudonym' | 'lastname' | 'firstname' | 'email') =>
    (value: string) => {
      changeField(value, name);
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
            <Field
              type="text"
              labelName="Pseudonyme"
              placeholder={userData.pseudonym ? '' : 'Entrez votre pseudonyme'}
              value={pseudonym}
              onChange={handleChangeField('pseudonym')}
              id="pseudonym"
            />
          </div>
          <div className="profil-edit-name">
            <Field
              type="text"
              labelName="Nom"
              placeholder={userData.lastname ? '' : 'Entrez votre nom'}
              value={lastname}
              onChange={handleChangeField('lastname')}
              id="lastname"
            />
            <Field
              type="text"
              labelName="Prénom"
              placeholder={userData.lastname ? '' : 'Entrez votre prénom'}
              value={firstname}
              onChange={handleChangeField('firstname')}
              id="firstname"
            />
          </div>
          <div className="profil-edit-inofs">
            <Field
              type="email"
              labelName="Adresse email"
              placeholder={userData.email ? '' : 'Entrez votre adresse email'}
              value={email}
              onChange={handleChangeField('email')}
              id="email"
              disabled
            />
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
