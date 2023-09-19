import React, { useContext, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocation, useParams } from 'react-router-dom';
import './MapPlaces.scss';
import { SelectedCategory, SinglePlace } from '../../contexts';
import L from 'leaflet';
import { IPlaceData } from '../../../@types/index';
import CustomMarker from './CustomMarker';
import { fetchDataList, usePlacesList } from '../../Api/ApiDataList';

const MapPlaces = () => {
  const { singlePlaceData } = useContext(SinglePlace);
  const { selectedCategory } = useContext(SelectedCategory);
  const [placesCardData, setPlacesCardData] = useState<IPlaceData[]>([]);

  const location = useLocation();
  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const urlPlace = location.pathname.includes(`/${id}/${slug}`);

  let defaultMapCenter: [number, number] = [45.71301, 5.12916];
  let singlePlaceCenter: [number, number] | null = null;

  const placesData = usePlacesList();
  fetchDataList(`places/categories/${selectedCategory?.id}`, setPlacesCardData);

  if (singlePlaceData) {
    const [latStr, lngStr] = singlePlaceData?.coordinate.split('/');
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);
    if (!isNaN(lat) && !isNaN(lng)) {
      singlePlaceCenter = [lat, lng];
    }
  }

  return (
    <MapContainer
      center={singlePlaceCenter || defaultMapCenter}
      zoom={urlPlace ? 15 : 6}
      style={
        urlPlace ? { width: '100%', height: '80vh' } : { width: '', height: '' }
      }
      className={urlPlace ? '' : 'map-container'}
    >
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        tileSize={512}
        zoomOffset={-1}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {urlPlace ? (
        <Marker
          position={singlePlaceCenter || defaultMapCenter}
          icon={L.divIcon({ className: 'custom-marker', iconSize: [24, 24] })}
        >
          <Popup className="pop-up">
            <p>{singlePlaceData?.name}</p>
          </Popup>
        </Marker>
      ) : (
        ''
      )}
      {urlPlace
        ? Array.isArray(placesData) &&
          placesData.map((data, index: number) => (
            <CustomMarker key={index} data={data} />
          ))
        : Array.isArray(placesCardData) &&
          placesCardData.map((data, index: number) => (
            <CustomMarker key={index} data={data} />
          ))}
    </MapContainer>
  );
};

export default MapPlaces;
