import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import './Place.scss';
import Footer from '../Footer/Footer';
import { IoIosArrowBack } from 'react-icons/io';
import Error404 from '../Error/Error404';
import MapPlaces from '../MapPlaces/MapPlaces';
import { SinglePlace } from '../contexts';
import Icon from '../Categories/Icon';
import { IPlaceData } from '../../types/index';

const Place: React.FC = () => {
  const [singlePlaceData, setSinglePlaceData] = useState<
    IPlaceData | undefined
  >(undefined);
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && slug) {
      fetch(`http://localhost:8080/api/places/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.id === parseInt(id) && data.slug === slug) {
            setSinglePlaceData(data);
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error('Pas bon', error);
          setLoading(false);
        });
    }
  }, [id, slug, location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!singlePlaceData) {
    return <Error404 />;
  }

  return (
    <>
      <div className="place-header-container">
        <Header />
      </div>
      <div className="place-container">
        <div className="place-picture">
          <Link to="/" className="place-back-btn">
            <button>
              <IoIosArrowBack />
            </button>
          </Link>
          <div>
            <img src={singlePlaceData?.pictures[0].url} alt="picture" />
            <p>Source: {singlePlaceData?.pictures[0].picture_legend}</p>
          </div>
          <div className="place-tags">
            <div className="item-container">
              <p className="tags-item">Période</p>
              {singlePlaceData.centuries.map((cent) => (
                <>
                  <div className="item">
                    <span key={cent.id}>{cent.period}</span>
                  </div>
                </>
              ))}
            </div>
            <div className="item-container">
              <p className="tags-item">Epoque</p>
              {singlePlaceData.centuries.map((cent) => (
                <>
                  <div className="item">
                    <span key={cent.id}>{cent.century}</span>
                  </div>
                </>
              ))}
            </div>
            <div className="item-container">
              <p className="tags-item">Catégorie</p>
              {singlePlaceData.categories.map((cat) => (
                <>
                  <div className="item">
                    <span key={cat.id}>{cat.name}</span>
                    <Icon name={cat.icon} />
                  </div>
                </>
              ))}
            </div>
            <div className="item-container">
              <p className="tags-item">Tags</p>
              {singlePlaceData.tags.map((item) => (
                <>
                  <div className="item">
                    <span key={item.id}>{item.name}</span>{' '}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="place-name">
          <h2>{singlePlaceData?.name}</h2>
        </div>
        <div className="place-description">
          <p>{singlePlaceData?.description}</p>
        </div>
        <div className="place-infos">
          <p>Adresse: {singlePlaceData?.adress}</p>
          <p>Horaires: {singlePlaceData?.opening_hours}</p>
          <p>Tarifs: {singlePlaceData?.price}</p>
          <p>
            Site Web:
            <a target="_blank" href={singlePlaceData?.website}>
              {singlePlaceData?.website}
            </a>
          </p>
        </div>
        <div className="place-map">
          <SinglePlace.Provider value={{ singlePlaceData }}>
            <MapPlaces />
          </SinglePlace.Provider>
        </div>
      </div>
      <div className="place-footer">
        <Footer />
      </div>
    </>
  );
};

export default Place;
