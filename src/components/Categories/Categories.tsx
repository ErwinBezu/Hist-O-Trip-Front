import React, { useContext, useEffect, useState } from 'react';

import Icon from './Icon';
import { CategoriesList, SelectedCategory } from '../contexts/index';

import './Categories.scss';
import { ICategories } from '../../@types';

const Categories = () => {
  const categoriesList = useContext(CategoriesList);

  const { selectedCategory, setSelectedCategory } =
    useContext(SelectedCategory);

  useEffect(() => {
    if (!selectedCategory) {
      const randomCategory =
        categoriesList[Math.floor(Math.random() * categoriesList.length)];
      setSelectedCategory(randomCategory);
    }
  }, [categoriesList, selectedCategory, setSelectedCategory]);

  const handleCategorySelect = (category: ICategories) => {
    setSelectedCategory(category);
  };

  return (
    <nav className="categories-container">
      <ul className="categories-list">
        {categoriesList.map((category: ICategories) => (
          <li
            className={
              category === selectedCategory
                ? 'category-item category-item--active'
                : 'category-item'
            }
            key={category.id}
            onClick={() => handleCategorySelect(category)}
          >
            <Icon name={category.icon} />
            <span className="category-name">{category.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Categories;
