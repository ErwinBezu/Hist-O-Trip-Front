/* eslint-disable react/function-component-definition */
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

  const [resultAPI, setResultAPI] = useState();

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  console.log(categoryId);

  return (
    <nav>
      <ul>
        {categoriesList.map(
          (category: { id: number; name: string; icon: string }) => (
            <li
              key={(category as Category).id}
              onClick={() => handleCategorySelect(category)}
            >
              <Icon name={(category as Category).icon} />{' '}
              <span>{(category as Category).name}</span>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default Categories;
