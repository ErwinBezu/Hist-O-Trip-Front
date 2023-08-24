/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';

import Icon from './Icon';

import categories from '../../data/categories.json';
import { useCategories } from '../contexts/CategoryContext';

import './Categories.scss';

const Categories = () => {
  const categoriesData = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  console.log(selectedCategory?.id);

  return (
    <nav>
      <ul>
        {/* {categoriesData.map((category) => (
          <li key={category.id}>
            <Icon name={category.icon} /> <span>{category.name}</span>
          </li> 
        ))}*/}
        {categoriesData.map((category) => (
          <li
            key={category.id}
            onClick={() => handleCategorySelect(category)}
            className={selectedCategory === category ? 'selected' : ''}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Categories;
