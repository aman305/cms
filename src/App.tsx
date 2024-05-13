import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import React from "react";
import { Toaster } from "react-hot-toast";
import ProductList from "./pages/products/ProductList";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import DetailPage from "./pages/DetailPage";
const App: React.FC = () => {
  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detailpage/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
