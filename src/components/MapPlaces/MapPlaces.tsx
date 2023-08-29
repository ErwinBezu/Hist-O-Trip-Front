import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import './MapPlaces.scss';
import { SelectedCategory, SinglePlace } from '../contexts';

interface Picture {
  url: string;
  name: string;
  picture_legend: string;
}

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
  category: Category[];
  tags: Tags[];
};

const MapPlaces = () => {
  // const [placesData, setPlacesData] = useState<PlaceData | undefined>(
  //   undefined
  // );

  const { id } = useParams<{ id?: string }>();
  const location = useLocation();

  const [placesCardData, setPlacesCardData] = useState<PlaceData[]>([]);

  const { singlePlaceData } = useContext(SinglePlace);

  console.log('singlePlaceData dans MapPlaces :', singlePlaceData);

  // useEffect(() => {
  //   fetch(`http://ludoviclebris-server.eddi.cloud/api/api/places`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPlacesData(data);
  //     })
  //     .catch((error) => {
  //       console.error('Pas bon', error);
  //     });
  // }, [placesData]);

  const { selectedCategory } = useContext(SelectedCategory);

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

  return location.pathname.includes(`/${id}`) ? (
    <h1>{singlePlaceData?.name}</h1>
  ) : (
    <MapContainer
      center={[45.71301, 5.12916]}
      zoom={15}
      style={{ width: '100%', height: '80vh' }}
    >
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        tileSize={512}
        zoomOffset={-1}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* {Array.isArray(placesData) &&
        placesData.map((data, index: number) => {
          const { id, slug, coordinate, name, pictures, category } = data;
          if (coordinate) {
            const [latStr, lngStr] = coordinate.split('/');
            const lat = parseFloat(latStr);
            const lng = parseFloat(lngStr);
            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <Marker key={index} position={[lat, lng]}>
                  <Popup className="pop-up">
                    <Link to={`/${id}/${slug}`} key={id}>
                      <p>{name}</p>
                    </Link>
                    {pictures.map((picture: Picture, picIndex: number) => (
                      <img
                        key={picIndex}
                        src={picture.url}
                        alt={picture.name}
                        className="img-map"
                      />
                    ))} */}
      {Array.isArray(placesCardData) &&
        placesCardData.map((data, index: number) => {
          const { id, slug, coordinate, name, pictures, category } = data;
          if (coordinate) {
            const [latStr, lngStr] = coordinate.split('/');
            const lat = parseFloat(latStr);
            const lng = parseFloat(lngStr);
            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <Marker key={index} position={[lat, lng]}>
                  <Popup className="pop-up">
                    <Link to={`/${id}/${slug}`} key={id}>
                      <p>{name}</p>
                    </Link>
                    {pictures.map((picture: Picture, picIndex: number) => (
                      <img
                        key={picIndex}
                        src={picture.url}
                        alt={picture.name}
                        className="img-map"
                      />
                    ))}
                  </Popup>
                </Marker>
              );
            }
          }
          return null;
        })}
    </MapContainer>
  );
};

export default MapPlaces;
