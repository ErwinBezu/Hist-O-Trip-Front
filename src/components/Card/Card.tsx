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
import { IPlaceData } from '../../types/index';
import UserProfil from '../UserProfil/UserProfil';
import Filter from '../Header/Filter/Filter';
import UserEditProfil from '../UserProfil/UserEditProfil';
import Login from '../Auth/Login/Login';
import SignUp from '../Auth/SignUp/SignUp';

const Card: React.FC = () => {
  const [visibleCards, setVisibleCards] = React.useState<number>(12);
  const [placesCardData, setPlacesCardData] = useState<IPlaceData[]>([]);
  const {
    editVisible,
    isLoggedIn,
    signUpModal,
    isVisible,
    setIsVisible,
    menueVisible,
    setMenueVisible,
    loginModal,
  } = useContext<any>(Context);

  const { selectedCategory, setSelectedCategory } =
    useContext(SelectedCategory);
  const { selectedCentury } = useContext(SelectedCentury);
  const { selectedPeriod } = useContext(SelectedPeriod);
  const { selectedTag } = useContext(SelectedTag);
  const { searchInput } = useContext(SearchInput);
  const url = 'http://localhost:8080/';

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

  useEffect(() => {
    if (searchInput) {
      fetch(`${url}api/places?search=${searchInput}`)
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
      fetch(`${url}api/places/categories/${selectedCategory.id}`)
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
      fetch(`${url}api/places/centuries/${selectedCentury.id}`)
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
      fetch(`${url}api/places/centuries/${selectedPeriod?.period}`)
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
      fetch(`${url}api/places/tags/${selectedTag.id}`)
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
      try {
        fetch(`${url}api/places/filter`, {
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
