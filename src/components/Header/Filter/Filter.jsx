import React, { useState } from 'react';
import styles from './Filter.scss';
import Categories from '../../Categories/Categories';
import Epoques from '../../Utiles/Epoques/Epoques';
import Periodes from '../../Utiles/Periodes/Periodes';
import Tags from '../../Utiles/Tags/Tags';

const Filter = ({ setIsVisible }) => {
  return (
    <>
      <div className="modal-bg" onClick={() => setIsVisible(false)} />
      <div className="modal-centered">
        <div className="modal-style">
          <header className="filter-header">
            <h3 className="filter-title"> Filtre</h3>
          </header>

          <button className="close-btn" onClick={() => setIsVisible(false)}>
            X
          </button>

          <main className="filter-content">
            <div className="filter-categories">
              <h4>Categories</h4>
              <Categories />
            </div>
            <div className="filter-periodes">
              <h4>Périodes</h4>
              <Periodes />
            </div>
            <div className="filter-epoques">
              <h4>Epoques</h4>
              <Epoques />
            </div>
            <div className="filter-tags">
              <h4>Tags</h4>
              <Tags />
            </div>
          </main>

          <footer className="filter-footer">
            <div className="footer-btn">
              <button className="filter-delete">Effacer</button>
              <button className="filter-search">Rechercher</button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Filter;
