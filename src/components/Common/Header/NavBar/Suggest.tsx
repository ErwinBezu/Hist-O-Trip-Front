import React from 'react';
import { Link } from 'react-router-dom';

const Suggest = () => {
  return (
    <Link to="/proposer" className="suggestLink-navbar">
      <button className="suggest-btn" type="button">
        Proposer un lieu
      </button>
    </Link>
  );
};

export default Suggest;
