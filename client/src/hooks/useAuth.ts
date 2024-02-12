import { selectUser } from "../redux/slices/userSlice";
import { RootState } from "./../redux/store";
import { useSelector } from "react-redux/es/exports";

export function useAuth() {
  const { user, token } = useSelector(selectUser);

  return {
    isAuth: !!token,
    token,
  };
}
