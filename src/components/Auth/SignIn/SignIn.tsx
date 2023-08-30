import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import './SignIn.scss';

const SignIn = () => {
  return (
    <div>
      <>
    <div className="signIn-bg"></div>
    <form className="signIn-container">
      <div className="signIn-header">
        <label className='signIn-back-btn'><IoIosArrowBack/></label> 
          <h2>
          Terminer mon inscription
          </h2>
          </div>
          <div className="signIn-content">
            <div className='signIn-pseudo'>
              <input type="text" placeholder='Pseudo'/>
              </div>
              <div className="signIn-name">
                <input type="text" placeholder='Prénom' />
                <input type="text" placeholder='Nom' />
              </div>
              <div className="signIn-inofs">
              <input type="email" placeholder='Adresse e-mail' />
              <input type="password" placeholder='Mot de passe' />
              </div>
            <button className='signIn-validation' type="submit">S'inscrire</button>
          </div>
          <div className="signIn-footer">

          </div>
    </form>
    </>
    </div>
  );
};

export default SignIn;