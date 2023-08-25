import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import './Place.scss';
import placesData from '../../data/places.json';
import Footer from '../Footer/Footer';
import { IoIosArrowBack } from 'react-icons/io';

type Picture = {
  id: number;
  name: string;
  picture_legend: string;
  place_id: string;
  url: string;
};

// Define the type for a place
type PlaceData = {
  id: number;
  name: string;
  subtitle: string;
  coordinate: string;
  adress: string;
  postcode: string;
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
};

const defaultPostData = {
  title: 'N/A',
  id: -1,
  name: 'N/A',
  subtitle: 'N/A',
  coordinate: 'N/A',
  adress: 'N/A',
  postcode: 'N/A',
  city: 'N/A',
  country: 'N/A',
  website: 'N/A',
  phone: 'N/A',
  description: 'N/A',
  user_id: 'N/A',
  price: 'N/A',
  opening_hours: 'N/A',
  rating: 'N/A',
  accessibility: 'N/A',
  guided_tour: 'N/A',
  slug: 'N/A',
  pictures: [
    {
      id: -1,
      name: 'N/A',
      picture_legend: 'N/A',
      place_id: 'N/A',
      url: 'N/A',
    },
  ],
};

const Place: React.FC = () => {
  const [singlePostData, setSinglePostData] = useState<PlaceData | undefined>(
    undefined
  );
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const location = useLocation();

  useEffect(() => {
    // Fetch the specific place data based on the ID
    fetch(`URL/api/places/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSinglePostData(data);
      })
      .catch((error) => {
        console.error('Error fetching place data:', error);
        setSinglePostData(defaultPostData);
      });
  }, [id, slug, location]);

  return (
    <>
      <div className="place-header-container">
        <Header />
      </div>
      <div className="place-container">
        <div className="place-picture">
          <button className="place-back-btn">
            {' '}
            <IoIosArrowBack />{' '}
          </button>
          <img src={singlePostData?.pictures[0].url} alt="picture" />
          <div className="place-tags">
            <p>Période</p>
            <p>Epoque</p>
            <p>Catégorie</p>
            <p>Tags</p>
          </div>
        </div>
        <div className="place-name">
          <h2>{singlePostData?.name}</h2>
        </div>
        <div className="place-description">
          <p>{singlePostData?.description}</p>
        </div>
        <div className="place-infos">
          <p>Adresse: {singlePostData?.adress}</p>
          <p>Horaires: {singlePostData?.opening_hours}</p>
          <p>Tarifs: {singlePostData?.price}</p>
          <p>
            Site Web:{' '}
            <a href={singlePostData?.website}>{singlePostData?.website}</a>
          </p>
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
