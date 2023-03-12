type TIngredients = {
  ingredient_id: number;
  amount: string;
  measure: number;
};

export interface INewRecipeData {
  recipeName: string;
  kitchen: string;
  category: string;
  user_id: string;
  cookingTime: string;
  cookingMethod: string;
  portion: string;
  rating: string;
  ingredients: string;
  recipePicture: File;
}
