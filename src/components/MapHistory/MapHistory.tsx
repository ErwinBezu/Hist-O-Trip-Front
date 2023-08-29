import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import placesCoor from '../../data/placesCoor.json';

interface Coordinate {
  latitude: number; // Changer en nombre
  longitude: number; // Changer en nombre
}

interface Picture {
  url: string;
  name: string;
  // Autres propriétés éventuelles
}

type Category = {
  id: number;
  name: string;
  icon: string;
};

interface PlaceData {
  id: number;
  name: string;
  subtitle: string;
  coordinate: Coordinate; // Utiliser le type Coordinate modifié
  address: string;
  postcode: string;
  city: string;
  country: string;
  website: string;
  phone: string;
  description: string;
  pictures: Picture[];
  category: Category[];
}

const MapHistory = () => {
  return (
    <MapContainer
      center={[45.71301, 5.12916]}
      zoom={15}
      style={{ width: '100%', height: '500px' }}
    >
      <TileLayer
        url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        tileSize={512}
        zoomOffset={-1}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {placesCoor.map((data: PlaceData, index: number) => {
        const { coordinate, name, pictures, category } = data;
        if (coordinate) {
          const lat = coordinate.latitude;
          const lng = coordinate.longitude;
          return (
            <Marker key={index} position={[lat, lng]}>
              <Popup>
                <p>{name}</p>
                {pictures.map((picture, picIndex) => (
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
        return null;
      })}
    </MapContainer>
  );
};

export default MapHistory;
