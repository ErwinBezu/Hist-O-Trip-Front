import React, { useContext, useEffect, useState } from 'react';

import Icon from './Icon';
import { CategoriesList, SelectedCategory } from '../contexts/index';
import categoriesList from '../../data/categories.json';

import './Categories.scss';

type Category = {
  id: number;
  name: string;
  icon: string;
};

const Categories = () => {
  // const [selectedCategory, setSelectedCategory] = useState<Category | null>(
  //   null
  // );
  const categoriesList = useContext(CategoriesList);

  const { selectedCategory, setSelectedCategory } =
    useContext(SelectedCategory);

  const categoryName = selectedCategory?.name;
  const categoryId = selectedCategory?.id;
  const categoryIcon = selectedCategory?.icon;

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  console.log(categoryId);

  return (
    <nav>
      <ul>
        {categoriesList.map((category: Category) => (
          <li key={category.id} onClick={() => handleCategorySelect(category)}>
            <Icon name={category.icon} />
            <span>{category.name}</span>
          </li>
        ))}
        {/* {categoriesData.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))} */}
      </ul>
    </nav>
  );
};

export default Categories;
