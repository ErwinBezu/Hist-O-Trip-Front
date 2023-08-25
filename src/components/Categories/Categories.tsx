/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';

import Icon from './Icon';

import { useCategories } from '../contexts/CategoryContext';
import './Categories.scss';

interface Category {
  id: number;
  name: string;
  icon: string;
  // Autres propriétés si nécessaires
}

const Categories = () => {
  const categoriesData: Category[] = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };
  console.log(selectedCategory?.id);

  return (
    <nav>
      <ul>
        {categoriesData.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category)}
            className={selectedCategory === category ? 'selected' : ''}
          >
            <Icon name={category.icon} /> <span>{category.name}</span>
          </button>
        ))}
      </ul>
    </nav>
  );
};

export default Categories;
