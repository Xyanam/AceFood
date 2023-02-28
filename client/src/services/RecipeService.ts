import axiosClient from "../http/axios-client";
import { Ingredient } from "../types/TIngredient";
import { recipe } from "../types/TRecipe";

export default class RecipeService {
  static async getRecipes() {
    return axiosClient.get<recipe[]>("/recipes").then((resp) => resp.data);
  }
  static async getRecipeById(recipeID: string) {
    return axiosClient.get<recipe>(`/recipes/${recipeID}`).then((response) => response.data);
  }
  static async getIngredientByRecipe(recipeID: string) {
    return axiosClient
      .get<Ingredient[]>(`/recipes/${recipeID}/ingredients`)
      .then((response) => response.data);
  }
}
