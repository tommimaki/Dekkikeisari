import React from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import SignUp from './components/user/UserSignUp';
import Products from './components/products/Products'
import AdminPanel from './admin/Orders/AdminPanel';
import ProductPage from './components/products/ProductPage';
import Orders from './admin/Orders/OrderManagement';
import Profile from './components/user/Profile';
import ProductManagement from './admin/Products/ProductManagement';
import CustomerManagement from './admin/Customers/CustomerManagement';
import SignIn from './components/user/SignIn';
import CategoryProducts from './components/products/CategoryProducts';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import withAdminAuth from './admin/withAdminAuth';
import './App.css';

function App() {

  //adminpanel routes protected 
  const AdminPanelProtected = withAdminAuth(AdminPanel);
  const OrdersProtected = withAdminAuth(Orders);
  const ProductManagementProtected = withAdminAuth(ProductManagement);
  const CustomerManagementProtected = withAdminAuth(CustomerManagement);
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
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path='/admin' element={<AdminPanelProtected />} />
          <Route path="/admin/orders" element={<OrdersProtected />} />
          <Route path="/admin/product-management" element={<ProductManagementProtected />} />
          <Route path="/admin/customer-management" element={<CustomerManagementProtected />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
