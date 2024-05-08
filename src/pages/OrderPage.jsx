import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import OrderItem from '~/components/Card/OrderItem';
import Persional from '~/components/Persional';
import DefaultLayout from '~/layouts/DefaultLayout';
import { createOrder } from '~/services/OrderService';
import { formatCurrencyVND } from '~/ultils/helpers';
import { showErrorToast, showSuccessToast } from '~/ultils/toastify';

const OrderPage = () => {
    const [totalProductPrices, setTotalProductPrices] = useState(0);
    const [items] = useState(() => {
        // Nếu không có, lấy từ sessionStorage
        const itemsFromStorage = sessionStorage.getItem('selectedItems');
        return itemsFromStorage ? JSON.parse(itemsFromStorage) : [];
    });


    useEffect(() => {
        console.log("Items at order page:", items);
        const newTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalProductPrices(newTotal);
    }, [items]);

    const handleOrder = async (orderUserData) => {
        const { userId, ...userInfo } = orderUserData;
        const orderItems = items.map(item => ({
            productId: item.productId,
            productName: item.productName,
            productVersionId: item.productVersionId,
            productVersionSizeId: item.productVersionSizeId, // ID sản phẩm
            quantity: item.quantity, // Số lượng mua
            price: item.price,// Giá sản phẩm
            cartItemId: item.cartItemId,
            size: item.size,
            style: item.style
        }));

        const orderData = { items: orderItems, ...userInfo, totalAmount: totalProductPrices }

        console.log('orderData at order page:', orderData);
        try {
            const response = await createOrder(userId, orderData);
            showSuccessToast('Order created successfully!');
        } catch (error) {
            console.error('Error creating order:', error);
            showErrorToast('Failed to create order. Please try again.');
        }
    };

    return (
        <DefaultLayout>
            {items && <div className="grid grid-cols-12 gap-4  md:gap-6  2xl:gap-7.5 2xl:mx-40 ">
                <div className=" flex flex-col col-span-12 rounded-sm  bg-white px-5 pt-7.5 pb-5 shadow-default  dark:bg-boxdark sm:px-7.5  lg:col-span-7 md:col-span-6">
                    <div className=' '>
                        <h1 className="text-3xl  mb-10 font-semibold text-black border-b-2 border-main dark:border-[#ffa70b] dark:text-white ">
                            Order
                        </h1>
                        <div className="flex flex-col  w-full h-125  overflow-y-auto">
                            {items.length > 0 && items.map((item, index) =>
                                <OrderItem
                                    key={index}
                                    dataCartItem={item}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex  p-6 pb-0 justify-end border-t-2 text-2xl items-center">
                        Total value of products: <span className="text-main ml-5 text-3xl">{formatCurrencyVND(totalProductPrices)}đ</span>
                    </div>
                </div>
                <div className="col-span-12 rounded-sm  bg-white p-7.5 shadow-default  dark:bg-boxdark lg:col-span-5 md:col-span-6">
                    <Persional onOrderSubmit={handleOrder} />
                </div>
            </div>}
        </DefaultLayout>
    );
};

export default OrderPage;
