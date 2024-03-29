import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUser } from "./redux/slices/userSlice";
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

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <div className="App">
      <Header />
      <ToastContainer position="top-center" autoClose={2000} />
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
