import React, { useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import Decks from './components/products/Decks';
import Shirts from './components/products/Shirts';
import Shoes from './components/products/Shoes';
import SignUp from './components/user/SignUp';
import Products from './components/products/Products'
import AdminPanel from './admin/AdminPanel';
import ProductPage from './components/products/ProductPage';
import Orders from './admin/Orders';
import Profile from './components/user/Profile';
import ProductManagement from './admin/ProductManagement';
import SignIn from './components/user/SignIn';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>

          <Route path='/' element={<LandingPage />} />
          <Route path='/skateboards' element={<Decks />} />
          <Route path='/shirts' element={<Shirts />} />
          <Route path='/shoes' element={<Shoes />} />
          <Route path='/products' element={<Products />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/admin/product-management" element={<ProductManagement />} />




        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
