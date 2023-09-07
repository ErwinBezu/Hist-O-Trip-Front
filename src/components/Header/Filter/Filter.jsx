import React, { useContext, useState } from 'react';
import './Filter.scss';
import Categories from '../../Categories/Categories';
import Epoques from '../../Utiles/Epoques/Epoques';
import Periodes from '../../Utiles/Periodes/Periodes';
import Tags from '../../Utiles/Tags/Tags';
import {
  MainSearchFilter,
  SelectedTags,
  SelectedCenturies,
  SelectedCategory,
} from '../../contexts';
import { AiOutlineClose } from 'react-icons/ai';

const Filter = ({ setIsVisible }) => {
  const { setIsFilterSubmitted } = useContext(MainSearchFilter);
  const { setSelectedTags } = useContext(SelectedTags);
  const { setSelectedCenturies } = useContext(SelectedCenturies);
  const { setSelectedCategory } = useContext(SelectedCategory);

  const handleFilterSubmit = () => {
    setIsFilterSubmitted(true);
    setIsVisible(false);
  };

  return (
    <>
      <div className="modal-bg" onClick={() => setIsVisible(false)} />
      <div className="modal-centered">
        <div className="modal-style">
          <div className="filter-header">
            <h3 className="filter-title"> Filtre</h3>
          </div>

          <button className="close-btn" onClick={() => setIsVisible(false)}>
          <AiOutlineClose />
          </button>

          <form className='filter-form'
            onSubmit={(e) => {
              e.preventDefault();
              handleFilterSubmit();
            }}
          >
            <div className="filter-content">
              <div className="filter-categories">
                <h4>Categories</h4>
                <Categories />
              </div>
              <div className="filter-periodes">
                <h4>Périodes</h4>
                <Periodes />
              </div>
              <div className="filter-tags">
                <h4>Tags</h4>
                <Tags />
              </div>
            </div>

            <div className="filter-footer">
              <div className="footer-btn">
                <button className="btn-style-var" type="submit">
                  Rechercher
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Filter;
