import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductList from "./products/ProductList";
import ProductDetail from "./products/ProductDetail";
import Home from "./home/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path="products">
            <Route path="" element={<ProductList />}></Route>
            <Route path=":id" element={<ProductDetail />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
