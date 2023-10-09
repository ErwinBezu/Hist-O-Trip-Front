/* eslint-disable react/function-component-definition */
import { FC, useEffect, useState } from 'react';
import './Home.scss';
import Header from '../Common/Header/Header';
import Card from './Card/Card';
import Footer from '../Common/Footer/Footer';
import FilterFooter from './FilterFooter/FilterFooter';

import {
  SearchInput,
  SelectedCategory,
  SelectedCentury,
  SelectedTag,
  SelectedCenturies,
  SelectedPeriod,
  SelectedTags,
  MainSearchFilter,
} from '../contexts/index';

import { ICategories, ICenturies, ITags } from '../../@types';

const Home = () => {
  const [selectedCenturies, setSelectedCenturies] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const [searchInput, setSearchInput] = useState('');

  const [selectedCategory, setSelectedCategory] = useState<ICategories | null>(
    null
  );

  const [selectedCentury, setSelectedCentury] = useState<ICenturies | null>(
    null
  );

  const [selectedPeriod, setSelectedPeriod] = useState<ICenturies | null>(null);

  const [selectedTag, setSelectedTag] = useState<ITags | null>(null);

  const [isFilterSubmitted, setIsFilterSubmitted] = useState(false);

  return (
    <>
      <MainSearchFilter.Provider
        value={{ isFilterSubmitted, setIsFilterSubmitted }}
      >
        <SelectedTags.Provider value={{ selectedTags, setSelectedTags }}>
          <SelectedPeriod.Provider
            value={{ selectedPeriod, setSelectedPeriod }}
          >
            <SelectedCenturies.Provider
              value={{ selectedCenturies, setSelectedCenturies }}
            >
              <SearchInput.Provider value={{ searchInput, setSearchInput }}>
                <SelectedCategory.Provider
                  value={{ selectedCategory, setSelectedCategory }}
                >
                  <SelectedCentury.Provider
                    value={{ selectedCentury, setSelectedCentury }}
                  >
                    <SelectedTag.Provider
                      value={{ selectedTag, setSelectedTag }}
                    >
                      <Header />
                      <Card />
                      <FilterFooter />
                      <Footer />
                    </SelectedTag.Provider>
                  </SelectedCentury.Provider>
                </SelectedCategory.Provider>
              </SearchInput.Provider>
            </SelectedCenturies.Provider>
          </SelectedPeriod.Provider>
        </SelectedTags.Provider>
      </MainSearchFilter.Provider>
    </>
  );
};

export default Home;
