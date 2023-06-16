import axiosClient from "../http/axios-client";

export default class UserService {
  static async getUser(userId: number) {
    return axiosClient.get(`/userProfile/${userId}`).then((response) => response.data);
  }
  static async getFavourite(userId: number) {
    return axiosClient.get(`/userProfile/${userId}/favourites`).then((resp) => resp.data);
  }
}
