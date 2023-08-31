/* eslint-disable react/function-component-definition */
import { FC, useEffect, useState } from 'react';
import './Home.scss';
import Header from '../Header/Header';
import Card from '../Card/Card';
import Footer from '../Footer/Footer';

import UserProfil from '../UserProfil/UserProfil';
import UserEditProfil from '../UserProfil/UserEditProfil';

import { CategoriesList, SelectedCategory } from '../contexts/index';

type Category = {
  id: number;
  name: string;
  icon: string;
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  return (
    <>
      <SelectedCategory.Provider
        value={{ selectedCategory, setSelectedCategory }}
      >
        <Header />
        <Card />
        <Footer />
      </SelectedCategory.Provider>
    </>
  );
};

export default Home;
