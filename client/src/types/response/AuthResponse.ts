import { IUser } from "./../IUser";
export default interface AuthResponse {
  token: string;
  user: IUser;
}
