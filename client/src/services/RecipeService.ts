import axiosClient from "../http/axios-client";
import { IComments } from "../types/IComments";
import { Ingredient } from "../types/TIngredient";
import { recipe } from "../types/TRecipe";

export type CommentRecipeData = {
  user_id: string;
  recipe_id: string | undefined;
  text: string;
};

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
  static async getCommentsByRecipe(recipeID: string) {
    return axiosClient
      .get<IComments[]>(`/recipes/${recipeID}/comments`)
      .then((response) => response.data);
  }
  static async addCommentsByRecipe(data: CommentRecipeData) {
    return axiosClient
      .post(`/recipes/${data.recipe_id}/comments`, data)
      .then((response) => response.data);
  }
  static async deleteCommentById(id: number) {
    return axiosClient
      .post(`/recipes/deleteComment`, { comment_id: id })
      .then((response) => response.data);
  }
}
