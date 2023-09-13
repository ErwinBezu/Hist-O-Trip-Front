import React from 'react';
import Header from '../Header/Header';
import './Error404.scss';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <>
      <Header />
      <div className="error-msg">
        <h2>Vous semblez être égaré Voyageur </h2>
        <span>
          Dirigez vous plutôt vers
          <Link to="/" className="error-home">
            l'accueil
          </Link>
        </span>
      </div>
      <img
        className="error-img"
        src="https://ik.imagekit.io/v4u5l9d7p/Histotrip-404-dessin2.jpg?updatedAt=1694165665394"
        alt="404"
      />
    </>
  );
};

export default Error404;
