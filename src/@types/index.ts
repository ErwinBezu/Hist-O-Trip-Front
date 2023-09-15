export type IPlaceData = {
  id: number;
  name: string;
  subtitle: string;
  coordinate: string;
  adress: string;
  postcode: string;
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
  pictures: IPictures[];
  categories: ICategories[];
  tags: ITags[];
  centuries: ICenturies[];
};

export type ICategories = {
  id: number;
  name: string;
  icon: string;
};

export type ITags = {
  id: number;
  name: string;
};

export type ICenturies = {
  id: number;
  period: string;
  century: string;
};

export type IPictures = {
  id: number;
  name: string;
  picture_legend: string;
  place_id: string;
  url: string;
};
