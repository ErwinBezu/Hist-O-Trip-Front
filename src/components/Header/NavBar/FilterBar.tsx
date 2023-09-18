import React, { useContext } from 'react';
import { Context } from '../../App/App';
import { useLocation } from 'react-router-dom';

import { AiOutlineControl } from 'react-icons/ai';
import Categories from '../../Utils/Categories/Categories';

const FilterBar = () => {
  const context = useContext(Context);

  if (!context) {
    // Gérer le cas où le contexte n'est pas défini
    return null;
  }

  const { setIsVisible, menueVisible, setMenueVisible } = context;

  const location = useLocation();

  return (
    <div
      className={`${
        location.pathname === '/' ? 'filter-container' : 'filter-container-none'
      }`}
      onClick={() => (menueVisible ? setMenueVisible(false) : '')}
    >
      <button type="button" className="previous-btn">
        &lt;
      </button>
      <Categories />
      <button type="button" className="next-btn">
        &gt;
      </button>
      <button
        type="button"
        onClick={() => setIsVisible(true)}
        className="filter-btn"
      >
        <AiOutlineControl /> Filtre
      </button>
    </div>
  );
};

export default FilterBar;
