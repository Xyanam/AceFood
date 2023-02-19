import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import InfoRecipePage from "./pages/InfoRecipePage/InfoRecipePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import RecipesPage from "./pages/RecipesPage/RecipesPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipe/:id" element={<InfoRecipePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
