import React, { FormEvent, useState } from 'react';
import Field from './Field/Field';
import './Form.scss';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const authenticateUser = async (email: string, password: string) => {
    const response = await fetch(
      'https://orecipes-api.onrender.com/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      throw new Error('Vérifiez vos données');
    }
    console.log(response);
    return response.json();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userData = await authenticateUser(email, password);
      console.log('GG leBoss');

      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Vérifiez vos données');
    }
  };

  const handleChangeField = (name: 'email' | 'password') => (value: string) => {
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <>
      <div className="log-container">
        <div className="login-title">
          <h4>Bienvenue sur Hist'O'Trip</h4>
        </div>
        <form
          autoComplete="off"
          className="login-form-element"
          onSubmit={handleSubmit}
        >
          <Field
            placeholder="Adresse Email"
            onChange={handleChangeField('email')}
            value={email}
          />
          <Field
            type="password"
            placeholder="Mot de passe"
            onChange={handleChangeField('password')}
            value={password}
          />
          <button type="submit" className="login-form-btn">
            Se connecter
          </button>
          <button type="submit" className="login-form-btn">
            Mot de passe oublié
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </>
  );
};

export default Form;
