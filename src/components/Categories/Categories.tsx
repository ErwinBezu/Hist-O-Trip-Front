/* eslint-disable react/function-component-definition */
import React from 'react';

import Icon from './Icon';

import categories from '../../data/categories.json';
import { useCategories } from '../contexts/CategoryContext';

import './Categories.scss';

const Categories = () => {
  const categoriesData = useCategories();

  return (
    <nav>
      <ul>
        {/* {categoriesData.map((category) => (
          <li key={category.id}>
            <Icon name={category.icon} /> <span>{category.name}</span>
          </li> 
        ))}*/}
        {categoriesData.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </nav>
  );
};

export default Categories;
