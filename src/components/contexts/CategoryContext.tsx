import React, { createContext, useContext, useState, useEffect } from 'react';

const CategoryContext = createContext([]);

export const CategoryProvider = ({ children }) => {
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    fetch('https://oblog-react.vercel.app/api/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategoriesData(data);
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
