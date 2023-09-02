import React, { useContext, useEffect, useState } from 'react';
import './Card.scss';

import Place from '../Place/Place';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Context } from '../App/App';
import {
  SelectedCategory,
  SelectedCentury,
  SelectedTag,
  SearchInput,
  SelectedCenturies,
  SelectedTags,
} from '../contexts';
import MapPlaces from '../MapPlaces/MapPlaces';

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
  const { setMenueVisible, isVisible } = useContext(Context) as {
    setMenueVisible: (value: boolean) => void;
    isVisible: boolean;
  };
  const { selectedCategory } = useContext(SelectedCategory);
  const { selectedCentury } = useContext(SelectedCentury);
  const { selectedTag } = useContext(SelectedTag);
  const { searchInput } = useContext(SearchInput);

  const { selectedCenturies } = useContext(SelectedCenturies);
  const { selectedTags } = useContext(SelectedTags);

  const [mapIsVisible, setMapIsVisible] = useState(false);

  console.log(selectedCategory);
  console.log(selectedCenturies);
  console.log(selectedTags);

  useEffect(() => {
    if (searchInput) {
      fetch(
        `http://ludoviclebris-server.eddi.cloud/api/api/places?search=${searchInput}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPlacesCardData(data);
        })
        .catch((err) => console.error(err));
    }
  }, [searchInput]);

  useEffect(() => {
    if (selectedCategory && !isVisible) {
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

  useEffect(() => {
    if (selectedCentury) {
      fetch(
        `http://ludoviclebris-server.eddi.cloud/api/api/places/centuries/${selectedCentury.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPlacesCardData(data);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedCentury]);

  useEffect(() => {
    if (selectedTag) {
      fetch(
        `http://ludoviclebris-server.eddi.cloud/api/api/places/tags/${selectedTag.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPlacesCardData(data);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedTag]);

  const loadMoreCards = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 12);
  };

  const toggleMapOn = () => {
    setMapIsVisible(true);
  };
  const toggleMapOff = () => {
    setMapIsVisible(false);
  };

  return (
    <div className="cards-container" onClick={() => setMenueVisible(false)}>
      {mapIsVisible ? (
        // Affiche la carte si mapIsVisible est true
        <MapPlaces />
      ) : (
        <>
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
        </>
      )}
      {visibleCards < placesCardData.length && (
        <button className="btn-style-var" onClick={loadMoreCards}>
          Afficher plus
        </button>
      )}
      <button
        className="btn-style-var"
        onClick={mapIsVisible ? toggleMapOff : toggleMapOn}
      >
        {mapIsVisible ? 'Afficher la liste' : 'Afficher la carte'}
      </button>
    </div>
  );
};

export default Card;
