import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import path from "./ultils/path";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '~/redux/slides/categorySlide.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./pages/public/Home";
import Product from "./pages/public/Product";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import 'react-toastify/dist/ReactToastify.css';
import CartPage from "./pages/CartPage";
import Profile from "./pages/Profile";
import apiClient from "./axios";
import { getUserInfo } from "./services/UserService";
import { updateUser } from "./redux/slides/userSlide";
import DetailProduct from "./pages/DetailProduct";
import OrderPage from "./pages/OrderPage";
import HistoryOrder from "./pages/HistoryOrder";
import PaymentPage from "./pages/PaymentPage";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.category.status);
  const [isTokenReady, setIsTokenReady] = useState(false);
  console.log('Stripe Key:', process.env.REACT_APP_STRIPE_KEY);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // Cập nhật lại header Authorization trong trường hợp trang được refresh
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsTokenReady(true);
        try {
          const userInfo = await getUserInfo(); // Không cần truyền token vì đã được thiết lập trong header mặc định
          dispatch(updateUser({ ...userInfo, accessToken: token }));  // Cập nhật Redux store với thông tin người dùng
        } catch (error) {
          console.error('Error fetching user info:', error);
          localStorage.removeItem('accessToken');
          // redirectToLogin();  // Chuyển hướng người dùng đến trang đăng nhập
        }
      } else {
        setIsTokenReady(true); // Cập nhật cờ ngay cả khi không có token
      }
    };

    initAuth();
  }, [dispatch])

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

  return (

    <div className="min-h-screen  font-main">
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path={path.HOME} element={<Home />} />
          <Route path="/product/:categorySlug" element={<Product />} />
          <Route path="/product" element={<Navigate replace to="/product/all" />} />
          <Route path="/product/all" element={<Product />} />
          <Route path="/detail/:productId" element={<DetailProduct />} />
          <Route path="/cart" element={<CartPage isTokenReady={isTokenReady} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/history-orders" element={<HistoryOrder />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/checkout" element={<PaymentPage />} />

        </Routes>
      </Elements>
    </div>
  );
}

export default App;
