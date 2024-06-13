import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUser, selectUser } from "./redux/slices/userSlice";
import { useAppDispatch } from "./redux/store";
import "./App.css";
import Header from "./components/Header/Header";
import InfoRecipePage from "./pages/InfoRecipePage/InfoRecipePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import RecipesPage from "./pages/RecipesPage/RecipesPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AddRecipePage from "./pages/AddRecipePage/AddRecipePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UserProfileRecipes from "./components/UserProfileRecipes/UserProfileRecipes";
import UserProfileFavourite from "./components/UserProfileFavourite/UserProfileFavourite";
import AdminPage from "./pages/AdminPage/AdminPage";
import SidebarAdmin from "./components/SidebarAdmin/SidebarAdmin";
import AdminCommentsPage from "./pages/AdminPage/AdminCommentsPage/AdminCommentsPage";
import AdminUsersPage from "./pages/AdminPage/AdminUsersPage/AdminUsersPage";
import { useSelector } from "react-redux";
import HelpPage from "./pages/HelpPage/HelpPage";
import AdminAddPage from "./pages/AdminPage/AdminAddPage/AdminAddPage";

function App() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { user } = useSelector(selectUser);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="App">
      <Header />
      <ToastContainer position="top-center" autoClose={2000} />
      {user.banned === 1 ? (
        <div className="flex justify-center flex-col items-center mt-20">
          <h1 className="text-red-500 text-2xl">Вы заблокированы администратором сайта</h1>
          <p className="text-2xl text-center text-red-500 mt-2">Причина: {user.reason}</p>
        </div>
      ) : (
        <div className="wrapper">
          {["/admin", "/admin/comments", "/admin/users", "/admin/add"].includes(pathname) && (
            <SidebarAdmin />
          )}

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipe/:id" element={<InfoRecipePage />} />
            <Route path="/addrecipe" element={<AddRecipePage />} />
            <Route path="/profile/:id" element={<ProfilePage />}>
              <Route path="" element={<UserProfileRecipes />} />
              <Route path="favourites" element={<UserProfileFavourite />} />
            </Route>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/comments" element={<AdminCommentsPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/add" element={<AdminAddPage />} />
            <Route path="/help" element={<HelpPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
