import React, { useState } from 'react';

import './Card.scss';
import places from '../../data/places.json';
import { Link } from 'react-router-dom';
import { useCardPlaces } from '../contexts/CardsContext';

type Place = {
  id: number;
  slug: string;
  name: string;
  pictures: { url: string }[];
  postcode: string;
  city: string;
  rating: number;
};

const Card: React.FC = () => {
  const [visibleCards, setVisibleCards] = React.useState<number>(12);
  const placesCardData: Place[] = useCardPlaces();

  const loadMoreCards = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 12);
  };

  return (
    <div className="cards-container">
      {placesCardData.slice(0, visibleCards).map((place) => (
        <Link
          to={`/${place.id}/${place.slug}`}
          className="article-card"
          key={place.id}
        >
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
      {visibleCards < placesCardData.length && (
        <button className="load-more-button" onClick={loadMoreCards}>
          Afficher plus
        </button>
      )}
    </div>
  );
};

export default Card;
