import React, { useContext, useEffect, useState } from 'react';
import { CategoriesList, CenturiesList, TagsList } from '../contexts';

type Category = {
  id: number;
  name: string;
  icon: string;
};

const FilterFooter = () => {
  const categoriesList = useContext(CategoriesList);
  const centuriesList = useContext(CenturiesList);
  const tagsList = useContext(TagsList);

  const [randomCategories, setRandomCategories] = useState<Category[]>([]);

  useEffect(() => {
    const randomCategories = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * categoriesList.length);
      randomCategories.push(categoriesList[randomIndex]);
    }
    setRandomCategories(randomCategories);
  }, []);

  console.log(randomCategories);

  return (
    <div>
      <h2>categories :</h2>
      <ul>
        {/* {randomCategories.map((category, key) => (
          <li key={key}>
            <label>
              <input type="checkbox" />
              {category.name}
            </label>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default FilterFooter;
