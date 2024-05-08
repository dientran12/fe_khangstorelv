import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as UserApi from '~/services/UserService';
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { showErrorToast, showSuccessToast } from '~/ultils/toastify';
import { useLoading } from '~/hooks/LoadingContext';
import LoadingFullScreen from '~/components/Loading/LoadingFullScreen';
import { loginUser } from '~/redux/slides/userSlide';
import { useDispatch } from 'react-redux';

const SignUp = () => {
    // Khởi tạo state cho mỗi trường input
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate()

    const [isSubmitted, setIsSubmitted] = useState(false);
    const { showLoading, hideLoading } = useLoading();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {
            name: validateField("name", formData.name),
            email: validateField("email", formData.email),
            password: validateField("password", formData.password),
        };

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        } else {
            newErrors.confirmPassword = "";
        }

        return newErrors;
    }

    const validateField = (name, value) => {
        if (!value) {
            return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
            return "Email is invalid";
        }
        // Xóa điều kiện cho confirmPassword ở đây
        return "";
    }


    // Cập nhật state dựa trên input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Chỉ cập nhật lỗi cho trường đó nếu form đã được submit ít nhất một lần
        if (isSubmitted) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: validateField(name, value)
            }));
        }
    };

    useEffect(() => {
        if (isSubmitted) {
            setErrors(errors => ({
                ...errors,
                confirmPassword: validateField("confirmPassword", formData.confirmPassword)
            }));
        }
    }, [formData.password, formData.confirmPassword, isSubmitted]);

    // Xử lý khi form được submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true); // Đánh dấu rằng form đã được cố gắng submit ít nhất một lần
        const formErrors = validateForm();
        console.log('Validation Errors:', formErrors);
        if (Object.values(formErrors).some(error => error !== "")) {
            setErrors(formErrors);
            showErrorToast("Please correct the errors before submitting.");
            return;
        }
        showLoading();
        try {
            const response = await UserApi.Register(formData);
            showSuccessToast("Account created successfully! Please check your email to activate.");
            setTimeout(async () => {
                try {
                    await dispatch(loginUser({
                        email: response.email,
                        password: formData.password
                    })).unwrap();

                    navigate('/'); // Chuyển hướng người dùng
                } catch (error) {
                    showErrorToast(error || "Login failed. Please try again.");
                } finally {
                    hideLoading(); // Ẩn loading indicator
                }
            }, 1000); // Độ trễ là 1000ms hay 1 giây
        } catch (error) {
            console.error('Error:', error);
            showErrorToast("An error occurred during registration. Please try again.");
        } finally {
            hideLoading();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-color1 dark:bg-dark">
            <LoadingFullScreen />
            <div className="w-full sm:max-w-[600px] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="w-full p-4 sm:p-12.5">
                    <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                        Sign Up
                    </h2>

                    <form onSubmit={handleSubmit}>
                        {/* Các trường input */}

                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-stroke'} bg-transparent py-3 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <div className="absolute right-4 top-4 text-lg ">
                                    <FaRegUser />
                                </div>
                            </div>
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
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
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    className={`w-full rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-stroke'} bg-transparent py-3 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <div className="absolute right-4 top-4 text-lg ">
                                    <MdLockOutline />
                                </div>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}

                        </div>


                        <div className="mb-5">
                            <input
                                type="submit"
                                value="Create account"
                                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                            />
                        </div>

                        <div className="mt-6 text-center">
                            <p>
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
