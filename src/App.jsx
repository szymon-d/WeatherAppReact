import "./App.css";
import Layout from "./components/Layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CityLayout from "./components/CityLayout/CityLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>

        <Route path="/city/:city" element={<CityLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
