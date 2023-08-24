import './Card.scss';
import places from '../../data/places.json';
import { useState } from 'react';
import Place from '../Place/Place'

import { Link } from 'react-router-dom';


const Card = () => {
  const [visibleCards, setVisibleCards] = useState(12);

  const loadMoreCards = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 12);
  };

  return (
    <div className="cards-container">
      {places.slice(0, visibleCards).map((place) => (

        <Link to={`/${place.id}/${place.slug}`} className="article-card">
          <article key={place.id}>
            <img src={place.pictures[0].url} alt="avatar" />
            <div className="content">
              <h2 className="placename-card"> {place.name}</h2>
              <h3 className="placecity-card">
                <span className="zipcode">{place.postcode}</span> - {place.city}
              </h3>
              <span> {place.rating}</span>
            </div>
          </article>
        </Link>
      ))}
      {visibleCards < places.length && (
        <button className="load-more-button" onClick={loadMoreCards}>
          Afficher plus
        </button>
      )}
    </div>
  );
};

export default Card;
