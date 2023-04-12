import React from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import SignUp from './components/user/UserSignUp';
import Products from './components/products/Products'
import AdminPanel from './admin/AdminPanel';
import ProductPage from './components/products/ProductPage';
import Orders from './admin/Orders';
import Profile from './components/user/Profile';
import ProductManagement from './admin/ProductManagement';
import CustomerManagement from './admin/CustomerManagement';
import SignIn from './components/user/SignIn';
import CategoryProducts from './components/products/CategoryProducts';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>

          <Route path='/' element={<LandingPage />} />
          <Route
            path='/skateboards'
            element={
              <CategoryProducts
                category="Skateboards"
                title="DEKIT"
                subheading="Laaja valikoima dekkejä alan parhailta valmistajilta."
              />
            }
          />
          <Route
            path='/shirts'
            element={
              <CategoryProducts
                category="Shirts"
                title="PAIDAT"
                subheading="Paitoja joka lähtöön."
              />
            }
          />
          <Route
            path='/shoes'
            element={
              <CategoryProducts
                category="Shoes"
                title="KENGÄT"
                subheading="Valikoima kenkiä eri tarkoituksiin."
              />
            }
          />
          <Route path='/products' element={<Products />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/admin/product-management" element={<ProductManagement />} />
          <Route path="/admin/customer-management" element={<CustomerManagement />} />




        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
