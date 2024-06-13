export interface IUser {
  name: string;
  email: string;
  image: string;
  id: string;
  role: string;
  banned: number;
  reason?: string;
}
