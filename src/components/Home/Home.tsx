/* eslint-disable react/function-component-definition */
import { FC, useEffect, useState } from 'react';
import './Home.scss';
import Header from '../Header/Header';
import Card from '../Card/Card';
import Footer from '../Footer/Footer';
import FilterFooter from '../FilterFooter/FilterFooter';

import {
  SearchInput,
  SelectedCategory,
  SelectedCentury,
  SelectedTag,
} from '../contexts/index';

type Category = {
  id: number;
  name: string;
  icon: string;
};

type Centuries = {
  id: number;
  period: string;
  century: string;
};

type Tags = {
  id: number;
  name: string;
};

const Home = () => {
  const [searchInput, setSearchInput] = useState('');

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [selectedCentury, setSelectedCentury] = useState<Centuries | null>(
    null
  );

  const [selectedTag, setSelectedTag] = useState<Tags | null>(null);
  return (
    <>
      <SearchInput.Provider value={{ searchInput, setSearchInput }}>
        <SelectedCategory.Provider
          value={{ selectedCategory, setSelectedCategory }}
        >
          <SelectedCentury.Provider
            value={{ selectedCentury, setSelectedCentury }}
          >
            <SelectedTag.Provider value={{ selectedTag, setSelectedTag }}>
              <Header />
              <Card />
              <FilterFooter />
              <Footer />
            </SelectedTag.Provider>
          </SelectedCentury.Provider>
        </SelectedCategory.Provider>
      </SearchInput.Provider>
    </>
  );
};

export default Home;
