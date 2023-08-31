import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import SignUp from '../SignUp/SignUp';
import './Login.scss'
import { Context } from '../../App/App';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {signUpModal, setSignUpModal, isLoggedIn, setIsLoggedIn} = useContext(Context);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envoyer les informations d'identification au backend pour vérification
    try {
      const response = await fetch('http://ludoviclebris-server.eddi.cloud/api/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Stocker le JWT dans le stockage local
        Cookies.set('jwtToken', data.token);
        console.log("c'est bon ");
        setError('');
        setIsLoggedIn(true);
        // Rediriger ou effectuer d'autres actions en fonction de la réussite de l'authentification
      } else {
        setError('Identifiants invalides');
      }
    } catch (error) {
      console.error('Erreur lors de l\'authentification :', error);
    }
  };
  
  const token = Cookies.get('jwtToken');
  function parseJwt(token) {
    // terminate operation if token is invalid
    if (!token) {
      return;
    }

    // Split the token and taken the second
    const base64Url = token.split(".")[1];

    // Replace "-" with "+"; "_" with "/"
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

const user = parseJwt(token);

  console.log("l'utilisateur est :", user);
    

  return (
    <div className='login-container'>
      <div className="login-body">
      <h2>Authentification</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p>{error}</p>}
      <button onClick={() => setSignUpModal(prevstate => !prevstate)}>Inscription</button>
      {signUpModal && <SignUp />}
    </div>
    </div>
  );
}

export default Login;