import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouterProvider
} from "react-router-dom"
import Homepage from './Components/Contents/Homepage';
import About from './Components/Contents/About';
import Blog from './Components/Contents/Blog/Blog';
import Contact from './Components/Contents/Contact';
import Faq from './Components/Contents/Faq';
import Myaccount from './Components/Contents/Account/Myaccount';
import Product from './Components/Contents/Product/Product';
import Productcart from './Components/Contents/Product/Productcart';
import Productcheckout from './Components/Contents/Product/Productcheckout';
import Productdetails from './Components/Contents/Product/Productdetails';
import Wishlist from './Components/Contents/Product/Wishlist';
import Account from './Components/Contents/Account/Account';
import Blogdetails from './Components/Contents/Blog/Blogdetails';
import CreateBlog from './Components/Contents/Blog/CreateBlog';
import PageNotFound from './Components/Contents/PageNotFound';
import ResetPassword from './Components/Contents/Account/ResetPassword';
import ForgotPassword from './Components/Contents/Account/ForgotPassword';
import Orderpage from './Components/Contents/Account/Order';
import ProductFilter from './Components/Contents/Product/ProductFilter';
import BlogFilter from './Components/Contents/Blog/BlogFilter';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/filter/:id" element={<BlogFilter />} />
          <Route path="/blog-details/:id" element={<Blogdetails />} />
          <Route path="/order/:id" element={<Orderpage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/myaccount" element={<Myaccount />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/filter/:id" element={<ProductFilter />} />
          <Route path="/productcart" element={<Productcart />} />
          <Route path="/productcheckout" element={<Productcheckout />} />
          <Route path="/product-details/:id" element={<Productdetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path='/createblog' element={<CreateBlog />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
