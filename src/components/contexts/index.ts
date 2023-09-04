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

export const SelectedCentury = createContext<{
  selectedCentury: Centuries | null;
  setSelectedCentury: React.Dispatch<React.SetStateAction<Centuries | null>>;
}>({
  selectedCentury: { id: 0, century: '', period: '' },
  setSelectedCentury: () => {},
});

export const SelectedTag = createContext<{
  selectedTag: Tags | null;
  setSelectedTag: React.Dispatch<React.SetStateAction<Tags | null>>;
}>({
  selectedTag: { id: 0, name: '' },
  setSelectedTag: () => {},
});

export const SinglePlace = createContext<{
  singlePlaceData: PlaceData | undefined;
}>({
  singlePlaceData: undefined,
});

export const SearchInput = createContext<{
  searchInput: string;
  setSearchInput: (value: string) => void;
}>({
  searchInput: '',
  setSearchInput: () => {},
});

export const SelectedCenturies = createContext<{
  selectedCenturies: number[];
  setSelectedCenturies: (centuries: number[]) => void;
}>({
  selectedCenturies: [],
  setSelectedCenturies: () => {},
});

export const SelectedTags = createContext<{
  selectedTags: number[];
  setSelectedTags: (tags: number[]) => void;
}>({
  selectedTags: [],
  setSelectedTags: () => {},
});

export const MainSearchFilter = createContext<{
  isFilterSubmitted: boolean;
  setIsFilterSubmitted: (value: boolean) => void;
}>({
  isFilterSubmitted: false,
  setIsFilterSubmitted: () => {},
});
