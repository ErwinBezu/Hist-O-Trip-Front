/* eslint-disable react/function-component-definition */
import React, { useContext, useEffect, useState } from 'react';

import Icon from './Icon';

import categories from '../../data/categories.json';
import { useCategories } from '../contexts/CategoryContext';

import './Categories.scss';
import { Context } from '../App/App';

const Categories = () => {
  // const categoriesData = useCategories();
  const {selectedCate, setSelectedCate} = useContext(Context);
  const {resultAPI, setResultAPI} = useContext(Context);

  useEffect(() => {
    fetch(`http://ludoviclebris-server.eddi.cloud/api/api/places/categories/${selectedCate}`)
    .then((response) => response.json())
      .then((data) => {
        setResultAPI(data);
      })},[selectedCate])
      console.log(resultAPI);

  return (
    <nav>
      <ul>
         {categories.map((category, id) => (
          <li key={id} onClick={() => setSelectedCate(id)}>
            <Icon name={category.icon} /> <span>{category.name}</span>
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
