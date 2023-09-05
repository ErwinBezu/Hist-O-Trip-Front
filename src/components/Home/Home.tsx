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
  SelectedCenturies,
  SelectedPeriod,
  SelectedTags,
  MainSearchFilter,
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
  const [selectedCenturies, setSelectedCenturies] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const [searchInput, setSearchInput] = useState('');

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [selectedCentury, setSelectedCentury] = useState<Centuries | null>(
    null
  );

  const [selectedPeriod, setSelectedPeriod] = useState<Centuries | null>(null);

  const [selectedTag, setSelectedTag] = useState<Tags | null>(null);

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
