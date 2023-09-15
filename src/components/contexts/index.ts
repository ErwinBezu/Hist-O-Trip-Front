import { createContext } from 'react';
import { ICategories, ICenturies, ITags, IPlaceData } from '../../@types/index';

export const CategoriesList = createContext<ICategories[]>([]);
export const CenturiesList = createContext<ICenturies[]>([]);
export const TagsList = createContext<ITags[]>([]);

export const SelectedCategory = createContext<{
  selectedCategory: ICategories | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<ICategories | null>>;
}>({
  selectedCategory: { id: 1, name: 'Châteaux', icon: 'LuCastle' },
  setSelectedCategory: () => {},
});

export const SelectedCentury = createContext<{
  selectedCentury: ICenturies | null;
  setSelectedCentury: React.Dispatch<React.SetStateAction<ICenturies | null>>;
}>({
  selectedCentury: { id: 0, century: '', period: '' },
  setSelectedCentury: () => {},
});

export const SelectedPeriod = createContext<{
  selectedPeriod: ICenturies | null;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<ICenturies | null>>;
}>({
  selectedPeriod: { id: 0, century: '', period: '' },
  setSelectedPeriod: () => {},
});

export const SelectedTag = createContext<{
  selectedTag: ITags | null;
  setSelectedTag: React.Dispatch<React.SetStateAction<ITags | null>>;
}>({
  selectedTag: { id: 0, name: '' },
  setSelectedTag: () => {},
});

export const SinglePlace = createContext<{
  singlePlaceData: IPlaceData | undefined;
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
