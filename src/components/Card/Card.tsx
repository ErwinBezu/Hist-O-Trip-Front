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
  MainSearchFilter,
  SelectedPeriod,
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
  const [placesCardData, setPlacesCardData] = useState<Place[]>([]);
  const { setMenueVisible, isVisible } = useContext(Context) as {
    setMenueVisible: (value: boolean) => void;
    isVisible: boolean;
  };
  const { selectedCategory, setSelectedCategory } =
    useContext(SelectedCategory);
  const { selectedCentury } = useContext(SelectedCentury);
  const { selectedPeriod } = useContext(SelectedPeriod);
  const { selectedTag } = useContext(SelectedTag);
  const { searchInput } = useContext(SearchInput);

  const { selectedCenturies, setSelectedCenturies } =
    useContext(SelectedCenturies);

  const { selectedTags, setSelectedTags } = useContext(SelectedTags);

  const [mapIsVisible, setMapIsVisible] = useState(false);

  const { isFilterSubmitted } = useContext(MainSearchFilter);

  const categoryArray = [selectedCategory?.id];
  console.log(categoryArray);
  console.log(selectedCenturies);
  console.log(selectedTags);
  console.log(isFilterSubmitted);

  const shuffleArray = (array: any) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    if (searchInput) {
      fetch(
        `http://ludoviclebris-server.eddi.cloud/api/api/places?search=${searchInput}`
      )
        .then((response) => response.json())
        .then((data) => {
          const shuffledData = shuffleArray(data);
          setPlacesCardData(shuffledData);
        })
        .catch((err) => console.error(err));
    }
  }, [searchInput]);

  useEffect(() => {
    if (selectedCategory && !isVisible) {
      resetVisibleCards();
      fetch(
        `http://ludoviclebris-server.eddi.cloud/api/api/places/categories/${selectedCategory.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          const shuffledData = shuffleArray(data);
          setPlacesCardData(shuffledData);
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
          const shuffledData = shuffleArray(data);
          setPlacesCardData(shuffledData);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedCentury]);

  useEffect(() => {
    if (SelectedPeriod) {
      fetch(
        `http://ludoviclebris-server.eddi.cloud/api/api/places/centuries/${selectedPeriod?.period}`
      )
        .then((response) => response.json())
        .then((data) => {
          const shuffledData = shuffleArray(data);
          setPlacesCardData(shuffledData);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedPeriod]);

  useEffect(() => {
    if (selectedTag) {
      fetch(
        `http://ludoviclebris-server.eddi.cloud/api/api/places/tags/${selectedTag.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          const shuffledData = shuffleArray(data);
          setPlacesCardData(shuffledData);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedTag]);

  useEffect(() => {
    if (isFilterSubmitted) {
      fetch('http://ludoviclebris-server.eddi.cloud/api/api/places/filter', {
        method: 'POST', // Changez la méthode en POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoriesId: categoryArray,
          centuriesId: selectedCenturies,
          tagsId: selectedTags,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('coucou');
          console.log(data);
          setPlacesCardData(data);
          setSelectedCategory(null);
          setSelectedCenturies([]);
          setSelectedTags([]);
        })
        .catch((err) => console.error(err));
    }
  }, [isFilterSubmitted]);

  const loadMoreCards = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 12);
  };

  const resetVisibleCards = () => {
    setVisibleCards(12);
  };
  const toggleMapOn = () => {
    setMapIsVisible(true);
  };
  const toggleMapOff = () => {
    setMapIsVisible(false);
  };

  return (
    <>
      <div className="cards-container" onClick={() => setMenueVisible(false)}>
        {mapIsVisible ? (
          <MapPlaces />
        ) : (
          <>
            {placesCardData.slice(0, visibleCards).map((place) => (
              <Link
                to={`/${place.id}/${place.slug}`}
                className="article-card"
                key={place.id}
              >
                <article key={place.id}>
                  {place.pictures && place.pictures.length > 0 ? (
                    <img src={place.pictures[0].url} alt="avatar" />
                  ) : (
                    <img src="" alt="Image par défaut" />
                  )}
                  <div className="content">
                    <h2 className="placename-card"> {place.name}</h2>
                    <h3 className="placecity-card">
                      <span className="zipcode">{place.postcode}</span> -{' '}
                      {place.city}
                    </h3>
                    {/* <span> {place.rating}</span> */}
                  </div>
                </article>
              </Link>
            ))}
          </>
        )}
      </div>
      <div className="btn-container">
        {!mapIsVisible && visibleCards < placesCardData.length && (
          <button className="btn-style-var " onClick={loadMoreCards}>
            <span> Afficher plus</span>
          </button>
        )}
        <button
          className="btn-style-var"
          onClick={mapIsVisible ? toggleMapOff : toggleMapOn}
        >
          {mapIsVisible ? 'Afficher la liste' : 'Afficher la carte'}
        </button>
      </div>
    </>
  );
};

export default Card;
