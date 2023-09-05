import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import SignUp from '../SignUp/SignUp';
import './Login.scss';
import { Context } from '../../App/App';
import { AiOutlineClose } from 'react-icons/ai';

export const getUser = async (token) => {
  try {
    const response = await fetch('http://ludoviclebris-server.eddi.cloud/api/api/users/@me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      const usersData = await response.json();
      const usersDataStr = JSON.stringify(usersData);
      localStorage.setItem('userData', usersDataStr);
      // userData contient les données de l'utilisateur
      console.log('Données de l\'utilisateur :', usersDataStr);
      return usersData;
    } else {
      console.error('Erreur lors de la récupération des données de l\'utilisateur');
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
    return null;
  }
};

type ContextType = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  menueVisible: boolean;
  setMenueVisible: React.Dispatch<React.SetStateAction<boolean>>;
  editVisible: boolean;
  setEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
  signUpModal: boolean;
  setSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userData: any;
  setUserData: any;
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {setMenueVisible, signUpModal, setSignUpModal, isLoggedIn, setIsLoggedIn, userData, setUserData, token, setToken} = useContext(Context);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Envoyer les informations d'identification au backend pour vérification
    try {
      const response = await fetch(
        'http://ludoviclebris-server.eddi.cloud/api/api/login_check',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Stocker le JWT dans le stockage local
        Cookies.set('jwtToken', data.token);
        console.log("c'est bon ");
        setError('');
        setIsLoggedIn(true);
        const user = await getUser(data.token);
        console.log('Données de l\'utilisateur après authentification :', user);
        setToken(data.token);
        console.log('token ici', token);

        // Rediriger ou effectuer d'autres actions en fonction de la réussite de l'authentification
      } else {
        setError('Identifiants invalides');
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
    }
  };

  const parseJwt = (token) => {

    // terminate operation if token is invalid
    if (!token) {
      console.error('Token is invalid or missing');
      return null;
    }

    try {
      // Split the token and take the second part (the payload)
      const base64Url = token.split('.')[1];
      // Replace "-" with "+"; "_" with "/"
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      // Decode the base64 payload
      const decoded = JSON.parse(window.atob(base64));
      return decoded;
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null;
    }
  };

  const user = parseJwt(token);

console.log('User :', user);

  return (
    <>
    <div className='login-modal'onClick={() => setMenueVisible(false)} ></div>
    <div className="login-container">
      <div className="login-modal-header">
      <label
          className="login-quit-btn"
          onClick={() => setMenueVisible(false)}
        >
          <AiOutlineClose />
        </label>
          <h2>Connexion ou inscription</h2>
          </div>
      <div className="login-body">
        <p className='login-title'>Bienvenue sur Hist’O’Trip</p>
        <form onSubmit={handleSubmit}>

          <input
          className='login-modal-user'
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
          className='login-modal-pw'
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          
          
            <button className='login-modal-submit' type="submit">Se connecter</button>
          
          
        </form>

        <div className='ou'>
          <div className='login-ou'>
            ou
            </div>
          </div>
        
        {error && <p>{error}</p>}


        <button className="signup-btn" onClick={() => setSignUpModal((prevstate: any) => !prevstate)}>
          Inscription
        </button>
        
        
        
      
    </div>
    </div>
    </>
  );
}

export default Login;
