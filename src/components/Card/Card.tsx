import React, { useContext, useEffect, useState } from 'react';
import './Card.scss';
import { Link } from 'react-router-dom';
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
import { IPlaceData } from '../../@types/index';
import apiUrl from '../App/config';

const Card: React.FC = () => {
  const [visibleCards, setVisibleCards] = React.useState<number>(12);
  const [placesCardData, setPlacesCardData] = useState<IPlaceData[]>([]);
  const {
    isVisible,

    setMenueVisible,
  } = useContext<any>(Context);

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

  const { isFilterSubmitted, setIsFilterSubmitted } =
    useContext(MainSearchFilter);

  const categoryArray = [selectedCategory?.id];

  const shuffleArray = (array: any) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const fetchPlacesCardData = (url: string) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const shuffledData = shuffleArray(data);
        setPlacesCardData(shuffledData);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (searchInput) {
      const url = `${apiUrl}/places?search=${searchInput}`;
      fetchPlacesCardData(url);
    }
  }, [searchInput]);

  useEffect(() => {
    if (selectedCategory && !isVisible) {
      resetVisibleCards();
      const url = `${apiUrl}/places/categories/${selectedCategory.id}`;
      fetchPlacesCardData(url);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCentury) {
      const url = `${apiUrl}/places/centuries/${selectedCentury.id}`;
      fetchPlacesCardData(url);
    }
  }, [selectedCentury]);

  useEffect(() => {
    if (selectedPeriod) {
      const url = `${apiUrl}/places/centuries/${selectedPeriod.period}`;
      fetchPlacesCardData(url);
    }
  }, [selectedPeriod]);

  useEffect(() => {
    if (selectedTag) {
      const url = `${apiUrl}/places/tags/${selectedTag.id}`;
      fetchPlacesCardData(url);
    }
  }, [selectedTag]);

  useEffect(() => {
    if (isFilterSubmitted) {
      try {
        fetch(`${apiUrl}/places/filter`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            categoriesId: categoryArray || [],
            centuriesId: selectedCenturies,
            tagsId: selectedTags,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log('coucou');
            console.log(data);
            const shuffledData = shuffleArray(data);
            setPlacesCardData(shuffledData);
            setIsFilterSubmitted(false);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error('An error occurred:', error);
      }
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
          className="btn-style-var btn-card"
          onClick={mapIsVisible ? toggleMapOff : toggleMapOn}
        >
          {mapIsVisible ? 'Afficher la liste' : 'Afficher la carte'}
        </button>
      </div>
    </>
  );
};

export default Card;
