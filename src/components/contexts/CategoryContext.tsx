import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface CategoryProviderProps {
  children: ReactNode; // ReactNode est un type pour n'importe quel élément React (composants, texte, etc.)
}

const CategoryContext = createContext([]);

export const CategoryProvider: React.FC<CategoryProviderProps> = ({
  children,
}) => {
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    fetch('http://ludoviclebris-server.eddi.cloud/api/api/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategoriesData(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <CategoryContext.Provider value={categoriesData}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  return useContext(CategoryContext);
};
