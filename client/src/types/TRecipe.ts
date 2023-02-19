export type recipe = {
  id: number;
  title: string;
  text: string;
  kitchen_id: number;
  category_id: number;
  calories: number;
  rating: null | number;
  image: string;
  created_at: null | string;
  updated_at: null | string;
  kitchen: string;
  category: string;
};
