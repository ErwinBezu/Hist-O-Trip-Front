import React, { useContext, useEffect, useState } from 'react';
import './Card.scss';
import Place from '../Place/Place';
import { Link } from 'react-router-dom';
import { Context } from '../App/App';
import { SelectedCategory } from '../contexts';
import Map from '../Map/Map';

import placesCardData from '../../data/places.json';

type Picture = {
  url: string;
};
type Category = {
  id: number;
  name: string;
  icon: string;
};

type Place = {
  id: number;
  slug: string;
  name: string;
  pictures: Picture[];
  postcode: string;
  city: string;
  rating: number;
  category: Category[];
};

const Card: React.FC = () => {
  const [visibleCards, setVisibleCards] = React.useState<number>(12);
  // const placesCardData: Place[] = useCardPlaces();
  const [placesCardData, setPlacesCardData] = useState<Place[]>([]);
  const { setMenueVisible } = useContext(Context) as {
    setMenueVisible: (value: boolean) => void;
  };
  const { selectedCategory } = useContext(SelectedCategory);

  console.log(selectedCategory?.name);
  console.log(placesCardData);
  useEffect(() => {
    if (selectedCategory) {
      fetch(
        `http://ludoviclebris-server.eddi.cloud/api/api/places/categories/${selectedCategory.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPlacesCardData(data);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedCategory]);

  const loadMoreCards = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 12);
  };

  return (
    <div className="cards-container" onClick={() => setMenueVisible(false)}>
      <Map />
      {placesCardData
        // .filter((placeDataItem) =>
        //   selectedCategory
        /* ? placeDataItem.category.some( */
        //         (category) => category.id === selectedCategory.id
        //       )
        //     : true
        // )
        .slice(0, visibleCards)
        .map((place) => (
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
                  <span className="zipcode">{place.postcode}</span> -{' '}
                  {place.city}
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
