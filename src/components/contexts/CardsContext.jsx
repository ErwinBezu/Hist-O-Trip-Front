import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { useCategories } from './CategoryContext';

// interface CardProviderProps {
//   children: ReactNode;
//   // ReactNode est un type pour n'importe quel élément React (composants, texte, etc.)
// }

const CardContext = createContext([]);
// : React.FC<CardProviderProps>
export const CardProvider = ({ children }) => {
  const { selectedCategory } = useCategories();
  const [placesCardData, setPlacesCardData] = useState([]);

  useEffect(() => {
    if (selectedCategory && selectedCategory.id) {
      fetch(
        `http://ludoviclebris-server.eddi.cloud/api/api/places/category/${selectedCategory.id}`
      )
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
