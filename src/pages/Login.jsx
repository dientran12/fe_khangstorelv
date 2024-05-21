import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as UserApi from '~/services/UserService';
import { MdOutlineMail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import axios from 'axios';
import { showErrorToast, showSuccessToast } from '~/ultils/toastify';
import { useLoading } from '~/hooks/LoadingContext';
import LoadingFullScreen from '~/components/Loading/LoadingFullScreen';
import { useDispatch } from 'react-redux';
import { loginUser } from '~/redux/slides/userSlide';


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const { showLoading, hideLoading } = useLoading();

  const validateField = (name, value) => {
    if (!value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      return "Email is invalid";
    }
    return "";
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    if (Object.values(newErrors).some(error => error !== "")) {
      setErrors(newErrors);
      showErrorToast("Please correct the errors before submitting.");
      return;
    }
    showLoading();
    setTimeout(async () => {
      try {
        await dispatch(loginUser({
          email: formData.email,
          password: formData.password
        })).unwrap();

        showSuccessToast("Logged in successfully!");
        navigate('/'); // Chuyển hướng người dùng
      } catch (error) {
        showErrorToast(error || "Login failed. Please try again.");
      } finally {
        hideLoading(); // Ẩn loading indicator
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-color1 dark:bg-dark">
      <LoadingFullScreen />
      <div className="w-full sm:max-w-[600px]  rounded-sm mx-2 border-stroke bg-white  sm:shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full border-stroke dark:border-strokedark ">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    className={`w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-stroke'} bg-transparent py-3 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="absolute right-4 top-4 text-lg ">
                    <MdOutlineMail />
                  </div>

                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className={`w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-stroke'} bg-transparent py-3 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="absolute right-4 top-4 text-lg ">
                    <MdLockOutline />
                  </div>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Sign In"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>

              <div className="mt-6 text-center">
                <p>
                  Don’t have any account?{' '}
                  <Link to="/signup" className="text-primary">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login