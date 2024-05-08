import React, { useEffect, useState } from 'react'
import { GrMap } from "react-icons/gr";
import { HiOutlinePencil } from "react-icons/hi";
import { RiUserLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';
import SelectPay from './Form/SelectPay';

const Persional = ({ onOrderSubmit }) => {
    const userState = useSelector(state => state.user);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [orderNote, setOrderNote] = useState('');
    const [errors, setErrors] = useState({}); // State to hold the errors
    const [paymentMethod, setPaymentMethod] = useState('Direct');
    useEffect(() => {
        if (userState) {
            setPhoneNumber(userState.phone || '');
            setShippingAddress(userState.address || '');
        }
    }, [userState]);

    const validateForm = () => {
        const newErrors = {};
        if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required.';
        if (!shippingAddress.trim()) newErrors.shippingAddress = 'Shipping address is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // No errors, return true
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return

        const orderUserData = {
            userId: userState.id,
            userEmail: userState.email,
            paymentMethod,
            phoneNumber,
            shippingAddress,
            orderNote
        };
        // Gửi orderData lên server
        onOrderSubmit(orderUserData);
    };

    const handlePaymentMethodChange = (newMethod) => {
        setPaymentMethod(newMethod);
    };



    return (
        <div className="w-full">
            <h1 className="text-3xl font-semibold text-black border-b-2   dark:text-white">
                Personal Information
            </h1>
            <div>
                <div className="p-7">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/2">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="fullName"
                                >
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4.5 top-4.5">
                                        <RiUserLine />
                                    </div>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        defaultValue={userState.name || ''}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="w-full sm:w-1/2">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="phoneNumber"
                                >
                                    Phone Number <span className="text-meta-1">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4.5 top-3">
                                        +
                                    </div>

                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 pl-7 pr-11.5  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        placeholder="Enter your phone number"
                                        value={phoneNumber}
                                        onChange={e => setPhoneNumber(e.target.value)}
                                    />
                                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                                    <div className="absolute right-4.5 top-4.5">
                                        <HiOutlinePencil />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-5.5">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="emailAddress"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute left-4.5 top-4.5">
                                    <MdOutlineEmail />
                                </div>
                                <input
                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="email"
                                    name="emailAddress"
                                    id="emailAddress"
                                    defaultValue={userState.email || ''}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="mb-5.5">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="shippingAddress"
                            >
                                Shipping Address <span className="text-meta-1">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-4.5 top-4.5">
                                    <GrMap />
                                </div>
                                <input
                                    className="w-full rounded border border-stroke bg-gray py-3 px-11.5  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="shippingAddress"
                                    id="shippingAddress"
                                    placeholder="Enter your shipping address"
                                    value={shippingAddress}
                                    onChange={e => setShippingAddress(e.target.value)}
                                />
                                {errors.shippingAddress && <p className="text-red-500 text-sm">{errors.shippingAddress}</p>}
                                <div className="absolute right-4.5 top-4.5">
                                    <HiOutlinePencil />
                                </div>
                            </div>
                        </div>

                        <div className="mb-5.5">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="shippingAddress"
                            >
                                Pay ment <span className="text-meta-1">*</span>
                            </label>
                            <SelectPay onPaymentMethodChange={handlePaymentMethodChange} methodDefault={paymentMethod} />
                        </div>


                        <div className="mb-5.5">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="orderNote"
                            >
                                Note
                            </label>
                            <div className="relative">

                                <div className="absolute left-4.5 top-4.5">
                                    <FaRegEdit />
                                </div>
                                <textarea
                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    name="orderNote"
                                    id="orderNote"
                                    rows={4}
                                    placeholder="Enter any special instructions here"
                                    value={orderNote}
                                    onChange={e => setOrderNote(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex justify-end ">
                            <button
                                className="flex justify-center w-full rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                            >
                                Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Persional