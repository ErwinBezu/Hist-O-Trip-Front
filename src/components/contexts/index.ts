import { createContext } from 'react';

type Category = {
  id: number;
  name: string;
  icon: string;
};

type Picture = {
  id: number;
  name: string;
  picture_legend: string;
  place_id: string;
  url: string;
};

type Tags = {
  id: number;
  name: string;
};

type Centuries = {
  id: number;
  period: string;
  century: string;
};

type PlaceData = {
  id: number;
  name: string;
  subtitle: string;
  coordinate: string;
  adress: string;
  placecode: string;
  city: string;
  country: string;
  website: string;
  phone: string;
  description: string;
  user_id: string;
  price: string;
  opening_hours: string;
  rating: string;
  accessibility: string;
  guided_tour: string;
  slug: string;
  pictures: Picture[];
  categories: Category[];
  tags: Tags[];
  centuries: Centuries[];
};

export const CategoriesList = createContext<Category[]>([]);
export const CenturiesList = createContext<Centuries[]>([]);
export const TagsList = createContext<Tags[]>([]);

export const SelectedCategory = createContext<{
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}>({
  selectedCategory: { id: 1, name: 'Châteaux', icon: 'LuCastle' },
  setSelectedCategory: () => {},
});

export const SinglePlace = createContext<{
  singlePlaceData: PlaceData | undefined;
}>({
  singlePlaceData: undefined,
});
