import React, { useContext, useEffect, useState } from 'react';
import './Filter.scss';
import Categories from '../../Categories/Categories';
import Epoques from '../../Utiles/Epoques/Epoques';
import Periodes from '../../Utiles/Periodes/Periodes';
import Tags from '../../Utiles/Tags/Tags';
import { Context } from 'react-responsive';
import { SelectedCategory } from '../../contexts';


const Filter = ({ setIsVisible }) => {

  const { selectedCategory, setSelectedCategory } =
    useContext(SelectedCategory);
    const [selectedPeriodeIds, setSelectedPeriodeIds] = useState([]);
    const [selectedEpoqueIds, setSelectedEpoqueIds] = useState([]);
    const [selectedTagIds, setSelectedTagIds] = useState([]);

    const handleCategoryChange = (selectedCategoryId) => {
      if (selectedCategory.includes(selectedCategoryId)) {
        // Si l'ID est déjà sélectionné, le retirez
        setSelectedCategory(selectedCategory.filter(id => id !== selectedCategoryId));
      } else {
        // Sinon, l'ajoutez
        setSelectedCategory([...selectedCategory, selectedCategoryId]);
      }
    };

    const buildFilterQuery = () => {
      const queryParams = [];
    
      // Catégories
      if (selectedCategory.length > 0) {
        queryParams.push(`category[]=${selectedCategory.join('&category[]=')}`);
      }
    
      // Périodes
      if (selectedPeriodeIds.length > 0) {
        queryParams.push(`periode[]=${selectedPeriodeIds.join('&periode[]=')}`);
      }
    
      // Epoques
      if (selectedEpoqueIds.length > 0) {
        queryParams.push(`epoque[]=${selectedEpoqueIds.join('&epoque[]=')}`);
      }
    
      // Tags
      if (selectedTagIds.length > 0) {
        queryParams.push(`tag[]=${selectedTagIds.join('&tag[]=')}`);
      }
    
      // Concaténez les paramètres de requête en une seule chaîne
      return queryParams.join('&');
    };
 
    const handleSearch = (e) => {
      e.preventDefault();
      const filterQuery = buildFilterQuery();
    
      fetch(`http://ludoviclebris-server.eddi.cloud/api/api/places/filter?${filterQuery}`)
        .then((response) => response.json())
        .then((data) => {
          // Traitez les données résultantes ici, par exemple, mettez-les à jour dans un état de votre composant.
        })
        .catch((error) => {
          // Gérez les erreurs ici, par exemple, affichez un message d'erreur.
        });
    };

  return (
    <>
      <div className="modal-bg" onClick={() => setIsVisible(false)} />
      <div className="modal-centered">
        <form className="modal-style" >
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
              <button className="filter-search" onClick={handleSearch}>Rechercher</button>
            </div>
          </footer>
        </form>
      </div>
    </>
  );
};

export default Filter;
