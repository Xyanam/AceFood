import axiosClient from "../http/axios-client";
import AuthResponse from "../types/response/AuthResponse";

export type DataRegister = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  profilePicture: File;
  role: string;
  banned: number;
};

export type DataLogin = {
  name: string;
  password: string;
};

export default class AuthService {
  static async register(data: DataRegister) {
    return axiosClient
      .post<AuthResponse>("/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((resp) => resp.data);
  }

  static async login(data: DataLogin) {
    return axiosClient.post<AuthResponse>("/login", data).then((response) => response.data);
  }

  static async logout() {
    return axiosClient.post("/logout").then((resp) => resp.data);
  }
  static async getUser() {
    return axiosClient.get("/user").then((resp) => resp.data);
  }
}
