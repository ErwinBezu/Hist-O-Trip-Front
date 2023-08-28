import React, { useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import placesData from '../../data/places.json';

const MapHistory = () => {
  const [placesData, setPlacesData] = useState([]);

  useEffect(() => {
    // Initialiser la carte
    maplibregl.accessToken = 'vUMXXrQUuEfz6ZxaACyR';
    const map = new maplibregl.Map({
      container: 'map', // ID de l'élément HTML pour la carte
      style:
        'https://api.maptiler.com/maps/streets/style.json?key=vUMXXrQUuEfz6ZxaACyR', // Style de la carte
      center: [5.43362, 49.19527], // Coordonnées [longitude, latitude] du centre de la carte
      zoom: 10, // Niveau de zoom initial
    });

    console.log(placesData);

    const marker = new maplibregl.Marker()
      .setLngLat([5.43362, 49.19527])
      .addTo(map);

    // Nettoyer la carte lors de la suppression du composant
    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: '100%', height: '500px' }} />;
};

export default MapHistory;
