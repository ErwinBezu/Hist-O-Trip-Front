import React, { useState } from 'react';
import styles from './Filter.scss';
import Categories from '../../Categories/Categories';
import Epoques from '../../App/Epoques/Epoques';
import Periodes from '../../App/Periodes/Periodes';
import Tags from '../../App/Tags/Tags';

const Filter = ({ setIsVisible }) => {
  return (
    <>
      <div className="modal-bg" onClick={() => setIsVisible(false)} />
      <div className="modal-centered">
        <div className="modal-style">

          <header className="filter-header">
            <h4 className="filter-title"> Filtre</h4>
          </header>

          <button className="close-btn" onClick={() => setIsVisible(false)}>
            X
          </button>

            <main className="filter-content">
              <div className="filter-categories">
                Categories :
                <Categories />
              </div>
              <div className="filter-periodes">
                Périodes :
                <Periodes />
              </div>
              <div className="filter-epoques">
                Epoques :
                <Epoques />
              </div>
              <div className="filter-tags">
                Tags :
                <Tags />
              </div>
            </main>
            
          <footer className="filter-footer">
            <button className="filter-delete">Effacer</button>
            <button className="filter-search">Rechercher</button>
          </footer>
        </div>
    </div>
    </>
  );
};

export default Filter;
