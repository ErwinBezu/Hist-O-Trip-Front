import { useEffect, useState } from 'react';
import apiUrl from '../App/config';
import { IPlaceData } from '../../@types';

export const fetchDataList = (url: string, setter: any) => {
  useEffect(() => {
    fetch(`${apiUrl}/${url}`)
      .then((response) => response.json())
      .then((data) => {
        setter(data);
      })
      .catch((err) => console.error(err));
  }, [setter]);
};

export const useCategoriesList = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  fetchDataList('categories', setCategoriesList);
  return categoriesList;
};

export const useTagsList = () => {
  const [tagsList, setTagsList] = useState([]);
  fetchDataList('tags', setTagsList);
  return tagsList;
};

export const useCenturiesList = () => {
  const [centuriesList, setCenturiesList] = useState([]);
  fetchDataList('centuries', setCenturiesList);
  return centuriesList;
};

export const usePlacesList = () => {
  const [placesData, setPlacesData] = useState<IPlaceData | []>([]);
  fetchDataList('places', setPlacesData);
  return placesData;
};
