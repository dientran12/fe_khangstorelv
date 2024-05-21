import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import OrderedItem from '~/components/Card/OrderedItem';
import OrderedInfo from '~/components/OrderedInfo';
import DefaultLayout from '~/layouts/DefaultLayout'
import * as OrderService from '~/services/OrderService';

const HistoryOrder = () => {
    const [orders, setOrders] = useState([]);  // Lưu trữ danh sách đơn hàng
    const userState = useSelector((state) => state.user);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Hàm giả định lấy dữ liệu đơn hàng
    const getAllOrdered = async () => {
        if (userState.id) {  // Chỉ gọi API khi userState.id có sẵn
            try {
                const response = await OrderService.getAllOrdered(userState.id);
                const data = await response;
                setOrders(data);
                if (data.length > 0) {
                    setSelectedOrder(data[0]);  // Chọn order đầu tiên khi có dữ liệu
                }
            } catch (error) {
                console.error('Failed to fetch orders', error);
            }
        }
    };

    // Sử dụng useEffect để gọi hàm getAllOrdered khi component được mount
    useEffect(() => {
        if (userState.id) {
            getAllOrdered();
        }
    }, [userState.id]);  // Theo dõi sự thay đổi của userState.id

    return (
        <DefaultLayout  >
            {orders.length > 0 ? <div className={`grid grid-cols-12 gap-4 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 3xl:mx-40 xl:mx-5`}>
                <div className={`col-span-12 xl:col-span-7 order-2 xl:order-1 duration-300 ease-in-out shadow-default  rounded-md bg-white  dark:bg-boxdark`}>
                    <h1 className="text-3xl px-4 md:px-6 xl:px-9 font-semibold text-black border-b-2 border-main dark:border-[#ffa70b] dark:text-white py-5">
                        All Orders
                    </h1>
                    <div className="rounded-sm bg-white px-0 sm:p-4 shadow-default dark:bg-boxdark md:p-6 xl:p-9 h-80 overflow-y-auto">
                        {orders.map((order, index) => (
                            <OrderedItem key={index} dataCartItem={order} onSelect={() => setSelectedOrder(order)} />
                        ))}
                    </div>
                </div>
                <div className={`col-span-12 xl:col-span-5 order-1 xl:order-2 `}>
                    <OrderedInfo order={selectedOrder} refreshData={() => getAllOrdered()} />
                </div>
            </div>
                :
                <div className="flex items-center justify-center  h-100">
                    <p className="text-2xl text-black dark:text-white">No orders found</p>
                </div>
            }
        </DefaultLayout>
    )
}

export default HistoryOrder