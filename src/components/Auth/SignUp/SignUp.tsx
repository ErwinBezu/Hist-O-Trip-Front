import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import './SignUp.scss';
import { BsCheckLg } from 'react-icons/bs';
import { FaInfoCircle, FaTimes } from 'react-icons/fa';
import { Context } from '../../App/App';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {
  const { setSignUpModal, setMenueVisible, setLoginModal } =
    useContext<any>(Context);
  const userRef = useRef<any>();
  const errRef = useRef<any>();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  const [pseudonym, setPseudonym] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(pseudonym));
  }, [pseudonym]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg('');
  }, [pseudonym, password, matchPassword]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(pseudonym);
    const v2 = PWD_REGEX.test(password);

    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }
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
      if (response.ok) {
        setSuccess(true);
        setPseudonym('');
        setPassword('');
        setMatchPassword('');
      } else {
        // Gérer l'erreur si la réponse n'est pas 'ok'
        const data = await response.json();
        if (data.status === 409) {
          setErrMsg('Username Taken');
        } else {
          setErrMsg('Registration Failed');
        }
      }
    } catch (err) {
      // Gérer les erreurs de réseau ou autres
      console.error(err);
      setErrMsg('Network Error');
    }
  };

  return (
    <>
      {success ? (
        <section></section>
      ) : (
        <>
          <div
            className="signUp-bg"
            onClick={() => setSignUpModal(false)}
          ></div>

          <section className="signUp-container">
            <p
              ref={errRef}
              className={errMsg ? 'errmsg' : 'offscreen'}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="signUp-header">
              <label
                className="signUp-back-btn"
                onClick={() => {
                  setSignUpModal(false);
                  setLoginModal(true);
                }}
              >
                <IoIosArrowBack />
              </label>
              <h2>Terminer mon inscription</h2>
            </div>
            <form className="signUp-form" onSubmit={handleSubmit}>
              <label htmlFor="username">
                <BsCheckLg className={validName ? 'valid' : 'hide'} />
                <FaTimes
                  className={validName || !pseudonym ? 'hide' : 'invalid'}
                />
              </label>
              <input
                id="pseudonym"
                type="text"
                ref={userRef}
                autoComplete="off"
                required
                placeholder="Pseudo"
                onChange={(e) => setPseudonym(e.target.value)}
                value={pseudonym}
                aria-invalid={validName ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && pseudonym && !validName
                    ? 'instructions'
                    : 'offscreen'
                }
              >
                <FaInfoCircle />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
              <div className="signUp-names">
                <input
                  type="text"
                  placeholder="Nom"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  required
                />
                <input
                  type="text"
                  placeholder="Prénom"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Adresse e-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <div className="signUp-pw">
                <label htmlFor="password">
                  <BsCheckLg className={validPwd ? 'valid' : 'hide'} />
                  <FaTimes
                    className={validPwd || !password ? 'hide' : 'invalid'}
                  />
                </label>

                <input
                  type="password"
                  id="password"
                  placeholder="Mot de passe"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  aria-invalid={validPwd ? 'false' : 'true'}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? 'instructions' : 'offscreen'
                  }
                >
                  <FaInfoCircle />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{' '}
                  <span aria-label="exclamation mark">!</span>{' '}
                  <span aria-label="at symbol">@</span>{' '}
                  <span aria-label="hashtag">#</span>{' '}
                  <span aria-label="dollar sign">$</span>{' '}
                  <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirm_pwd">
                  <BsCheckLg
                    className={validMatch && matchPassword ? 'valid' : 'hide'}
                  />
                  <FaTimes
                    className={
                      validMatch || !matchPassword ? 'hide' : 'invalid'
                    }
                  />
                </label>
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPassword(e.target.value)}
                  value={matchPassword}
                  required
                  placeholder="Confirmer Mot de passe"
                  aria-invalid={validMatch ? 'false' : 'true'}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? 'instructions' : 'offscreen'
                  }
                >
                  <FaInfoCircle />
                  Must match the first password input field.
                </p>
              </div>
              <button className="signUp-validation" type="submit">
                S'inscrire
              </button>
            </form>
          </section>
        </>
      )}
    </>
  );
};

export default SignUp;
