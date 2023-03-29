import React from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import Decks from './components/products/Decks';
import Shirts from './components/products/Shirts';
import Shoes from './components/products/Shoes';
import SignUp from './components/user/signup';
import Products from './components/products/Products'
import AdminPanel from './admin/AdminPanel';
import ProductPage from './components/products/ProductPage';


import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';

function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>

          <Route path='/' element={<LandingPage />} />
          <Route path='/decks' element={<Decks />} />
          <Route path='/shirts' element={<Shirts />} />
          <Route path='/shoes' element={<Shoes />} />
          <Route path='/products' element={<Products />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path="/products/:id" element={<ProductPage />} />


        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
