import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Category from "./components/Category";
import Header from "./components/Header";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate replace to="/category/all" />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
