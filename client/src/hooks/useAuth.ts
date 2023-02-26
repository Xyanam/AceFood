import { RootState } from "./../redux/store";
import { useSelector } from "react-redux/es/exports";

export function useAuth() {
  const { user, token } = useSelector((state: RootState) => state.user);

  return {
    isAuth: !!token,
    token,
  };
}
