import React, { useEffect, useState, createContext, useContext } from 'react';
import { useCategories } from './CategoryContext';

const CardContext = createContext([]);

export const CardProvider = ({ children }) => {
  const { selectedCategory } = useCategories();
  const [placesCardData, setPlacesCardData] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`URL/api/places/category/${selectedCategory.id}`)
        .then((response) => response.json())
        .then((data) => {
          setPlacesCardData(data);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedCategory]);

  return (
    <CardContext.Provider value={placesCardData}>
      {children}
    </CardContext.Provider>
  );
};
export const useCardPlaces = () => {
  return useContext(CardContext);
};
