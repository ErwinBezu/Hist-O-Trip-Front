/* eslint-disable react/function-component-definition */
import { FC, useEffect, useState } from 'react';
import './Home.scss';
import Header from '../Header/Header';
import Card from '../Card/Card';
import Footer from '../Footer/Footer';
import { CategoriesList, SelectedCategory } from '../contexts/index';

type Category = {
  id: number;
  name: string;
  icon: string;
};

const Home = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    fetch('http://ludoviclebris-server.eddi.cloud/api/api/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategoriesList(data);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(categoriesList);

  return (
    <>
      <SelectedCategory.Provider
        value={{ selectedCategory, setSelectedCategory }}
      >
        <CategoriesList.Provider value={categoriesList}>
          <Header />
          <Card />
          <Footer />
        </CategoriesList.Provider>
      </SelectedCategory.Provider>
    </>
  );
};

export default Home;
