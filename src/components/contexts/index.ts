import { createContext } from 'react';

type Category = {
  id: number;
  name: string;
  icon: string;
};

export const CategoriesList = createContext<Category[]>([]);

// export const SelectedCategory = createContext<Category | null>(null);

export const SelectedCategory = createContext<{
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}>({
  selectedCategory: { id: 1, name: 'Châteaux', icon: 'LuCastle' },
  setSelectedCategory: () => {},
});
