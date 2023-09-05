import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import './SignUp.scss';

const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [pseudonym, setPseudonym] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState('');

  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'http://ludoviclebris-server.eddi.cloud/api/api/users/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lastname: lastname,
            firstname: firstname,
            password: password,
            email: email,
            pseudonym: pseudonym,
            is_active: 1,
          }),
        }
      );

      console.log('Response:', response);
      console.log('Sent Data:', {
        lastname: lastname,
        firstname: firstname,
        password: password,
        email: email,
        pseudonym: pseudonym,
      });
      console.log('Response:', response);
      console.log('Response Status:', response.status);
      console.log('Response JSON:', await response.json());
    } catch (error) {
      console.error('erreur ici ');
    }
  };

  return (
    <div>
      <>
        <div className="signUp-bg"></div>
        <form className="signUp-container" onSubmit={handleSubmit}>
          <div className="signUp-header">
            <label className="signUp-back-btn">
              <IoIosArrowBack />
            </label>
            <h2>Terminer mon inscription</h2>
          </div>
          <div className="signUp-content">
            <div className="signUp-pseudo">
              <input
                type="text"
                placeholder="Pseudo"
                onChange={(e) => setPseudonym(e.target.value)}
                value={pseudonym}
              />
            </div>
            <div className="signUp-name">
              <input
                type="text"
                placeholder="Prénom"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
              />
              <input
                type="text"
                placeholder="Nom"
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
              />
            </div>
            <div className="signUp-inofs">
              <input
                type="email"
                placeholder="Adresse e-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button className="signUp-validation" type="submit">
              S'inscrire
            </button>
          </div>
          <div className="signUp-footer"></div>
        </form>
      </>
    </div>
  );
};

export default SignUp;
