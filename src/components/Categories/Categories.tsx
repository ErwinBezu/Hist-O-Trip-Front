/* eslint-disable react/function-component-definition */
import React from 'react';

import Icon from './Icon';

import categories from '../../data/categories.json';

const Categories = () => {
  return (
    <nav>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Icon name={category.icon} /> <span>{category.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Categories;
