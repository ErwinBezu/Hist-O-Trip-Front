import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import './SignUp.scss';

const SignUp = () => {
  return (
    <div>
      <>
    <div className="signUp-bg"></div>
    <form className="signUp-container">
      <div className="signUp-header">
        <label className='signUp-back-btn'><IoIosArrowBack/></label> 
          <h2>
          Terminer mon inscription
          </h2>
          </div>
          <div className="signUp-content">
            <div className='signUp-pseudo'>
              <input type="text" placeholder='Pseudo'/>
              </div>
              <div className="signUp-name">
                <input type="text" placeholder='Prénom' />
                <input type="text" placeholder='Nom' />
              </div>
              <div className="signUp-inofs">
              <input type="email" placeholder='Adresse e-mail' />
              <input type="password" placeholder='Mot de passe' />
              </div>
            <button className='signUp-validation' type="submit">S'inscrire</button>
          </div>
          <div className="signUp-footer">

          </div>
    </form>
    </>
    </div>
  );
};

export default SignUp;