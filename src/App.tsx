import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import LandingPage from './components/layout/LandingPage';
import Footer from './components/layout/Footer';
import SignUp from './components/user/UserSignUp';
import SignIn from './components/user/SignIn';
import Products from './components/products/Products'
import Checkout from './components/ShoppingCart/Checkout';
import AdminPanel from './admin/AdminPanel';
import ProductPage from './components/products/ProductPage';
import Orders from './admin/Orders/OrderManagement';
import Profile from './components/user/Profile';
import ProductManagement from './admin/Products/ProductManagement';
import CustomerManagement from './admin/Customers/CustomerManagement';
import CategoryProducts from './components/products/CategoryProducts';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import withAdminAuth from './admin/withAdminAuth';
import ScrollToTopArrow from './components/layout/ScrollToTop';
function App() {

  //adminpanel routes protected 
  const AdminPanelProtected = withAdminAuth(AdminPanel);
  const OrdersProtected = withAdminAuth(Orders);
  const ProductManagementProtected = withAdminAuth(ProductManagement);
  const CustomerManagementProtected = withAdminAuth(CustomerManagement);

  const [showScrollToTopArrow, setShowScrollToTopArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledPastScreen = window.scrollY > window.innerHeight;
      setShowScrollToTopArrow(isScrolledPastScreen);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


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
                subheading="Valikoima skeittikenkiä."
              />
            }
          />
          <Route path='/products' element={<Products />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path='/admin' element={<AdminPanelProtected />} />
          <Route path="/admin/orders" element={<OrdersProtected />} />
          <Route path="/admin/product-management" element={<ProductManagementProtected />} />
          <Route path="/admin/customer-management" element={<CustomerManagementProtected />} />
        </Routes>
      </div>
      {showScrollToTopArrow && <ScrollToTopArrow />}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
