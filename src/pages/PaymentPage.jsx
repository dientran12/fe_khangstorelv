import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import * as PaymentService from '~/services/PaymentService';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '~/layouts/DefaultLayout';
import * as OrderService from '~/services/OrderService';
import { FaRegEdit, FaUser } from 'react-icons/fa';
import { formatCurrencyVND } from '~/ultils/helpers';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}


function PaymentPage() {
    const [orderNote, setOrderNote] = useState('');
    const [userName, setUserName] = useState('');

    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const query = useQuery();
    console.log("query", query);
    const orderId = query.get('orderId');
    const totalAmount = query.get('totalAmount');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        if (!stripe || !elements) {
            setErrorMessage('Hệ thống thanh toán chưa sẵn sàng.');
            return;
        }

        setIsLoading(true);
        const cardElement = elements.getElement(CardElement);

        try {
            const response = await PaymentService.createPaymentIntent(orderId);
            console.log('response:', response);
            const clientSecret = response.clientSecret;

            if (!clientSecret) {
                throw new Error('clientSecret is missing in the response.');
            }

            // Xử lý giao dịch
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        // Bổ sung thông tin nếu cần
                    },
                },
            });

            console.log('result:', result);
            if (result.error) {
                setErrorMessage(result.error.message);
                setIsLoading(false);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // Cập nhật trạng thái đơn hàng
                    await PaymentService.notifyPayment(orderId, { amount: result.paymentIntent.amount, paymentId: result.paymentIntent.id, status: "success" });

                    navigate('/history-orders')
                    setErrorMessage('Thanh toán thành công!');
                }
            }
        } catch (error) {
            setErrorMessage('Failed to process payment. Please try again.');
            await PaymentService.notifyPayment(orderId, { status: "error" });

        }

        setIsLoading(false);
    };


    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8  mt-10 duration-300 ease-in-out shadow-lg  rounded-md bg-white  dark:bg-boxdark">

                <h3 className="text-xl font-semibold py-3 border-b ">Payment Confirmation</h3>
                <div className="my-5">
                    <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="Total Price"
                    >
                        Total Price:
                    </label>
                    <p className="text-lg ml-20 text-red-500 font-bold"><span className="text-3xl">{formatCurrencyVND(parseInt(totalAmount))} </span>vnd</p>
                </div>
                <div className="mb-5.5">
                    <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="shippingAddress"
                    >
                        Card holder <span className="text-meta-1">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute left-4.5 top-4.5">
                            <FaUser />
                        </div>
                        <input
                            className="w-full rounded border border-stroke bg-gray py-3 px-11.5  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="shippingAddress"
                            id="shippingAddress"
                            placeholder="Enter your shipping address"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
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

                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Details:</label>
                    <CardElement className="p-3 bg-gray-100 rounded" options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }} />
                </div>

                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                <button type="submit" disabled={!stripe || isLoading}
                    className="mt-4 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded w-full transition-colors duration-300 ease-in-out disabled:opacity-50">
                    {isLoading ? 'Processing...' : 'Pay'}
                </button>
            </form>

        </DefaultLayout>

    );
}

export default PaymentPage;
