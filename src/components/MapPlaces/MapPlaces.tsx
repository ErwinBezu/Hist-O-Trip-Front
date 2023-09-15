import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import './MapPlaces.scss';
import { SelectedCategory, SinglePlace } from '../contexts';
import L from 'leaflet';
import { IPictures, IPlaceData } from '../../@types/index';

const MapPlaces = () => {
  const { singlePlaceData } = useContext(SinglePlace);
  const [placesData, setPlacesData] = useState<IPlaceData | undefined>(
    undefined
  );
  const [placesCardData, setPlacesCardData] = useState<IPlaceData[]>([]);

  const location = useLocation();
  const { id, slug } = useParams<{ id?: string; slug?: string }>();

  useEffect(() => {
    fetch(`http://localhost:8080/api/places`)
      .then((response) => response.json())
      .then((data) => {
        setPlacesData(data);
      })
      .catch((error) => {
        console.error('Pas bon', error);
      });
  }, []);

  const { selectedCategory } = useContext(SelectedCategory);

  useEffect(() => {
    if (selectedCategory) {
      fetch(
        `http://localhost:8080/api/places/categories/${selectedCategory.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPlacesCardData(data);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedCategory]);

  let defaultMapCenter: [number, number] = [45.71301, 5.12916];

  let singlePlaceCenter: [number, number] | null = null;

  if (singlePlaceData) {
    const [latStr, lngStr] = singlePlaceData?.coordinate.split('/');
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);
    if (!isNaN(lat) && !isNaN(lng)) {
      singlePlaceCenter = [lat, lng];
    }
  }

  const customMarkerIcon = new L.Icon({
    iconUrl:
      'https://ik.imagekit.io/v4u5l9d7p/marker-icon.png?updatedAt=1694013187611',
  });

  return location.pathname.includes(`/${id}/${slug}`) ? (
    <MapContainer
      center={singlePlaceCenter || defaultMapCenter}
      zoom={15}
      style={{ width: '100%', height: '80vh' }}
    >
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        tileSize={512}
        zoomOffset={-1}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={singlePlaceCenter || defaultMapCenter}
        icon={L.divIcon({ className: 'custom-marker', iconSize: [24, 24] })}
      >
        <Popup className="pop-up">
          <p>{singlePlaceData?.name}</p>
        </Popup>
      </Marker>
      {Array.isArray(placesData) &&
        placesData.map((data, index: number) => {
          const { id, slug, coordinate, name, pictures, category } = data;
          if (coordinate) {
            const [latStr, lngStr] = coordinate.split('/');
            const lat = parseFloat(latStr);
            const lng = parseFloat(lngStr);
            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <Marker
                  key={index}
                  position={[lat, lng]}
                  icon={customMarkerIcon}
                >
                  <Popup className="pop-up">
                    <Link
                      to={`/${id}/${slug}`}
                      key={id}
                      className="pop-up-title"
                    >
                      <p>{name}</p>
                    </Link>
                    {pictures.map((picture: IPictures, picIndex: number) => (
                      <img
                        key={picIndex}
                        src={picture.url}
                        alt={picture.name}
                        className="pop-up-img"
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
  ) : (
    <MapContainer
      center={defaultMapCenter}
      zoom={6}
      className="map-container"
      // style={{ width: '100%', height: '70vh' }}
    >
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        tileSize={512}
        zoomOffset={-1}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {Array.isArray(placesCardData) &&
        placesCardData.map((data, index: number) => {
          const { id, slug, coordinate, name, pictures, categories } = data;
          if (coordinate) {
            const [latStr, lngStr] = coordinate.split('/');
            const lat = parseFloat(latStr);
            const lng = parseFloat(lngStr);
            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <Marker
                  key={index}
                  position={[lat, lng]}
                  icon={customMarkerIcon}
                >
                  <Popup className="pop-up">
                    <Link
                      to={`/${id}/${slug}`}
                      key={id}
                      className="pop-up-link"
                    >
                      <p className="pop-up-title">{name}</p>

                      {pictures.map((picture: IPictures, picIndex: number) => (
                        <img
                          key={picIndex}
                          src={picture.url}
                          alt={picture.name}
                          className="pop-up-img"
                        />
                      ))}
                    </Link>
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
