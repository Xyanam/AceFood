import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import axiosClient from "./http/axios-client";
import InfoRecipePage from "./pages/InfoRecipePage/InfoRecipePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import RecipesPage from "./pages/RecipesPage/RecipesPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { setUser } from "./redux/slices/userSlice";
import { useAppDispatch } from "./redux/store";
import AuthService from "./services/AuthService";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    AuthService.getUser().then((user) => dispatch(setUser(user)));
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipe/:id" element={<InfoRecipePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
