export type recipe = {
  id: number;
  title: string;
  text: string;
  kitchen_id: number;
  category_id: number;
  user_id: string;
  calories: number;
  rating: null | number;
  portion: number;
  image: string;
  created_at: null | string;
  updated_at: null | string;
  kitchen: string;
  category: string;
  name: string;
};
