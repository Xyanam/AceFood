import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import RecipesPage from "./pages/RecipesPage/RecipesPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
      </Routes>
    </div>
  );
}

export default App;
