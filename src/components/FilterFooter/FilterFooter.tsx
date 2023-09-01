import React, { useContext, useEffect, useState } from 'react';
import {
  CategoriesList,
  CenturiesList,
  SelectedCategory,
  TagsList,
  SelectedCentury,
  SelectedTag,
} from '../contexts';

type Category = {
  id: number;
  name: string;
  icon: string;
};

type Tags = {
  id: number;
  name: string;
};

type Centuries = {
  id: number;
  period: string;
  century: string;
};

const FilterFooter = () => {
  const categoriesList = useContext(CategoriesList);
  const centuriesList = useContext(CenturiesList);
  const tagsList = useContext(TagsList);

  const [randomCategories, setRandomCategories] = useState<Category[]>([]);
  const [randomCenturies, setRandomCenturies] = useState<Centuries[]>([]);
  const [randomTags, setRandomTags] = useState<Tags[]>([]);

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const { selectedCategory, setSelectedCategory } =
    useContext(SelectedCategory);
  const { selectedCentury, setSelectedCentury } = useContext(SelectedCentury);

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

  const handleCategorySelect = (category: Category) => {
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

  const handleCenturySelect = (century: Centuries) => {
    setSelectedCentury(century);
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

  const handleTagSelect = (tag: Tags) => {
    setSelectedTag(tag);
  };

  console.log(selectedCentury);
  console.log('ici période');
  console.log(selectedCentury?.period);

  return (
    <>
      <div>
        <h2 onClick={() => setSelectedFilter('categories')}>Categories :</h2>
        {selectedFilter === 'categories' && (
          <ul>
            {randomCategories.map((category) => (
              <li
                key={category.id}
                onClick={() => handleCategorySelect(category)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 onClick={() => setSelectedFilter('centuries')}>Siècles :</h2>
        {selectedFilter === 'centuries' && (
          <ul>
            {randomCenturies.map((century) => (
              <li key={century.id} onClick={() => handleCenturySelect(century)}>
                {century.century}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 onClick={() => setSelectedFilter('periods')}>Périodes :</h2>
        {selectedFilter === 'periods' && (
          <ul>
            {filteredPeriods.map((century) => (
              <li
                key={century.period}
                onClick={() => handleCenturySelect(century)}
              >
                {century.period}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 onClick={() => setSelectedFilter('tags')}>Tags :</h2>
        {selectedFilter === 'tags' && (
          <ul>
            {randomTags.map((tag) => (
              <li key={tag.id} onClick={() => handleTagSelect(tag)}>
                {tag.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default FilterFooter;
