import React from 'react';
import Form from './Form/Form';
import './LogForm.scss';

const LogForm = ({ setIsHiddenLogForm }) => {
  return (
    <>
      <div className="modal-bg" onClick={() => setIsHiddenLogForm(false)} />
      <div className="modal-centered">
        <div className="modal-container">
          <div className="head-container">
            <button
              type="button"
              className="close-btn"
              onClick={() => setIsHiddenLogForm(false)}
            >
              X
            </button>
            <h3 className="login-title"> Se Connecter</h3>
          </div>

          <div className="login-main-container">
            <Form />

            <div className="footer-btn">
              <button type="button" className="sign-btn">
                Inscription
              </button>
              <button type="button" className="help-btn">
                Besoin d'aide ?
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogForm;
