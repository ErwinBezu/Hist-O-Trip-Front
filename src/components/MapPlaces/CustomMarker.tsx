import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { IPictures } from '../../@types';
import L from 'leaflet';

const CustomMarker = ({ data }) => {
  const customMarkerIcon = new L.Icon({
    iconUrl:
      'https://ik.imagekit.io/v4u5l9d7p/marker-icon.png?updatedAt=1694013187611',
  });

  const { id, slug, coordinate, name, pictures } = data;
  if (coordinate) {
    const [latStr, lngStr] = coordinate.split('/');
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);
    if (!isNaN(lat) && !isNaN(lng)) {
      return (
        <Marker key={id} position={[lat, lng]} icon={customMarkerIcon}>
          <Popup className="pop-up">
            <Link to={`/${id}/${slug}`} key={id} className="pop-up-link">
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
};

export default CustomMarker;
