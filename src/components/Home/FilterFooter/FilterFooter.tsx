import React, { useContext, useEffect, useState } from 'react';
import {
  CategoriesList,
  CenturiesList,
  SelectedCategory,
  TagsList,
  SelectedCentury,
  SelectedTag,
  SelectedPeriod,
} from '../../contexts';
import './FilterFooter.scss';
import { ICategories, ICenturies, ITags } from '../../../@types/index';

const FilterFooter = () => {
  const categoriesList = useContext(CategoriesList);
  const centuriesList = useContext(CenturiesList);
  const tagsList = useContext(TagsList);

  const [randomCategories, setRandomCategories] = useState<ICategories[]>([]);
  const [randomCenturies, setRandomCenturies] = useState<ICenturies[]>([]);
  const [randomTags, setRandomTags] = useState<ITags[]>([]);
  const [randomPeriods, setRandomPeriods] = useState<ICenturies[]>([]);

  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    'categories'
  );

  const { selectedCategory, setSelectedCategory } =
    useContext(SelectedCategory);
  const { selectedCentury, setSelectedCentury } = useContext(SelectedCentury);

  const { selectedPeriod, setSelectedPeriod } = useContext(SelectedPeriod);

  const { selectedTag, setSelectedTag } = useContext(SelectedTag);

  useEffect(() => {
    if (categoriesList.length > 0) {
      const randomCategories = [];
      const selectedIndexes = new Set<number>();

      while (randomCategories.length < 5) {
        const randomIndex = Math.floor(Math.random() * categoriesList.length);
        if (!selectedIndexes.has(randomIndex)) {
          selectedIndexes.add(randomIndex);
          randomCategories.push(categoriesList[randomIndex]);
        }
      }

      setRandomCategories(randomCategories);
    }
  }, [categoriesList]);

  const handleCategorySelect = (category: ICategories) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (centuriesList.length > 0) {
      const randomCenturies = [];
      const selectedIndexes = new Set<number>();

      while (randomCenturies.length < 5) {
        const randomIndex = Math.floor(Math.random() * centuriesList.length);
        if (!selectedIndexes.has(randomIndex)) {
          selectedIndexes.add(randomIndex);
          randomCenturies.push(centuriesList[randomIndex]);
        }
      }

      setRandomCenturies(randomCenturies);
    }
  }, [centuriesList]);

  const handleCenturySelect = (century: ICenturies) => {
    setSelectedCentury(century);
  };

  const handlePeriodSelect = (century: ICenturies) => {
    setSelectedPeriod(century);
  };

  const uniquePeriod = new Set();
  const filteredPeriods = centuriesList.filter((century) => {
    if (!uniquePeriod.has(century.period)) {
      uniquePeriod.add(century.period);
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (tagsList.length > 0) {
      const randomTags = [];
      const selectedIndexes = new Set<number>();

      while (randomTags.length < 5) {
        const randomIndex = Math.floor(Math.random() * tagsList.length);
        if (!selectedIndexes.has(randomIndex)) {
          selectedIndexes.add(randomIndex);
          randomTags.push(tagsList[randomIndex]);
        }
      }

      setRandomTags(randomTags);
    }
  }, [tagsList]);

  const handleTagSelect = (tag: ITags) => {
    setSelectedTag(tag);
  };

  return (
    <>
      <div className="filterFooter-container">
        <div className="oneFilter-container">
          <h2
            className={`${
              selectedFilter === 'categories'
                ? ' oneFilter-title active'
                : 'oneFilter-title'
            }`}
            onClick={() => setSelectedFilter('categories')}
          >
            Categories
          </h2>
          {selectedFilter === 'categories' && (
            <ul className="oneFilter-list">
              {randomCategories.map((category) => (
                <li
                  className={`${
                    selectedCategory === category
                      ? 'oneFilter-item selected'
                      : 'oneFilter-item'
                  }`}
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="oneFilter-container">
          <h2
            className={`oneFilter-title ${
              selectedFilter === 'centuries'
                ? ' oneFilter-title active'
                : 'oneFilter-title'
            }`}
            onClick={() => setSelectedFilter('centuries')}
          >
            Siècles
          </h2>
          {selectedFilter === 'centuries' && (
            <ul className="oneFilter-list">
              {randomCenturies.map((century) => (
                <li
                  className={`${
                    selectedCentury === century
                      ? 'oneFilter-item selected'
                      : 'oneFilter-item'
                  }`}
                  key={century.id}
                  onClick={() => handleCenturySelect(century)}
                >
                  {century.century}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="oneFilter-container">
          <h2
            className={`oneFilter-title ${
              selectedFilter === 'periods'
                ? ' oneFilter-title active'
                : ' oneFilter-title'
            }`}
            onClick={() => setSelectedFilter('periods')}
          >
            Périodes
          </h2>
          {selectedFilter === 'periods' && (
            <ul className="oneFilter-list">
              {filteredPeriods.map((century) => (
                <li
                  className={`${
                    selectedPeriod === century
                      ? 'oneFilter-item selected'
                      : 'oneFilter-item'
                  }`}
                  key={century.period}
                  onClick={() => handlePeriodSelect(century)}
                >
                  {century.period}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="oneFilter-container">
          <h2
            className={`oneFilter-title ${
              selectedFilter === 'tags'
                ? ' oneFilter-title active'
                : ' oneFilter-title'
            }`}
            onClick={() => setSelectedFilter('tags')}
          >
            Tags
          </h2>
          {selectedFilter === 'tags' && (
            <ul className="oneFilter-list">
              {randomTags.map((tag) => (
                <li
                  className={`${
                    selectedTag === tag
                      ? 'oneFilter-item selected'
                      : 'oneFilter-item'
                  }`}
                  key={tag.id}
                  onClick={() => handleTagSelect(tag)}
                >
                  {tag.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterFooter;
