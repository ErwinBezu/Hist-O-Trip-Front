import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import './Place.scss';
import placesData from '../../data/places.json';
import Footer from '../Footer/Footer';
import { IoIosArrowBack } from 'react-icons/io';
import Error404 from '../Error/Error404';
import MapPlaces from '../MapPlaces/MapPlaces';
import { SinglePlace } from '../contexts';
import Icon from '../Categories/Icon';

type Picture = {
  id: number;
  name: string;
  picture_legend: string;
  place_id: string;
  url: string;
};
type Category = {
  id: number;
  name: string;
  icon: string;
};
type Tags = {
  id: number;
  name: string;
};

type PlaceData = {
  id: number;
  name: string;
  subtitle: string;
  coordinate: string;
  adress: string;
  placecode: string;
  city: string;
  country: string;
  website: string;
  phone: string;
  description: string;
  user_id: string;
  price: string;
  opening_hours: string;
  rating: string;
  accessibility: string;
  guided_tour: string;
  slug: string;
  pictures: Picture[];
  categories: Category[];
  tags: Tags[];
};

const Place: React.FC = () => {
  const [singlePlaceData, setSinglePlaceData] = useState<PlaceData | undefined>(
    undefined
  );
  console.log(singlePlaceData);
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const location = useLocation();

  // useEffect(() => {
  //   const foundPlaceData = placesData.find(
  //     (PlaceItem) => PlaceItem.id === parseInt(id) && PlaceItem.slug === slug
  //   );

  //   if (foundPlaceData) {
  //     console.log(foundPlaceData);
  //     setSinglePlaceData(foundPlaceData || defaultPlaceData);
  //   } else {

  //     setSinglePlaceData(defaultPlaceData);
  //   }
  // }, [id, slug, location]);

  // if (!singlePlaceData || singlePlaceData === defaultPlaceData) {
  //   return <Error404 />;
  // }

  useEffect(() => {
    if (id && slug) {
      fetch(`http://ludoviclebris-server.eddi.cloud/api/api/places/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.id === parseInt(id) && data.slug === slug) {
            setSinglePlaceData(data);
          } else {
            return <Error404 />;
          }
        })
        .catch((error) => {
          console.error('Pas bon', error);
          return <Error404 />;
        });
    }
  }, [id, slug, location]);

  if (!singlePlaceData) {
    return <Error404 />;
  }

  console.log(singlePlaceData?.categories);
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
          <img src={singlePlaceData?.pictures[0].url} alt="picture" />
          <div className="place-tags">
            <p>Période</p>
            <p>Epoque</p>
            <p>Catégorie</p>
            {singlePlaceData.categories.map((cat) => (
              <>
                <span key={cat.id}>{cat.name}</span>
                <Icon name={cat.icon} />
              </>
            ))}
            <p>Tags</p>
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
            <a href={singlePlaceData?.website}>{singlePlaceData?.website}</a>
          </p>
        </div>
        <div className="place-map">
          <SinglePlace.Provider value={{ singlePlaceData }}>
            <MapPlaces />
          </SinglePlace.Provider>
        </div>
        {/* <div className="place-review"><h3>Commentaires</h3>
      </div> */}
      </div>
      <div className="place-footer">
        <Footer />
      </div>
    </>
  );
};

export default Place;
