import React, { useContext, useEffect, useState } from 'react';

import Icon from './Icon';
import { CategoriesList, SelectedCategory } from '../contexts/index';

import './Categories.scss';

type Category = {
  id: number;
  name: string;
  icon: string;
};

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

  const categoryName = selectedCategory?.name;
  const categoryId = selectedCategory?.id;
  const categoryIcon = selectedCategory?.icon;

  console.log(selectedCategory);
  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <nav>
      <ul>
        {categoriesList.map((category: Category) => (
          <li key={category.id} onClick={() => handleCategorySelect(category)}>
            <Icon name={category.icon} />
            <span>{category.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Categories;
