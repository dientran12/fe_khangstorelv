import React, { useState } from 'react'
import imageEmpty from '~/assets/images/image-empty.jpg'
import { IoCloseOutline } from "react-icons/io5";
import { formatCurrencyVND, formatDateTime, handleImageOnError, handleImageOnLoad } from '~/ultils/helpers';

const OrderedItem = ({ dataCartItem, onSelect }) => {
    console.log("dataCartItem", dataCartItem)
    const handleItemClick = () => {
        onSelect(dataCartItem);
    };
    const getTotalQuantity = (items) => {
        return items.reduce((total, item) => total + item.quantity, 0);
    }
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'text-lime-400'; // Màu cam
            case 'paid':
                return 'text-blue-500'; // Màu xanh dương
            case 'fulfilled':
                return 'text-green-500'; // Màu xanh lá
            case 'cancelled':
                return 'text-red-500'; // Màu đỏ
            default:
                return 'text-gray-500'; // Một màu mặc định nếu không có trạng thái phù hợp
        }
    }
    return (
        <>
            {dataCartItem &&
                <div
                    className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 cursor-pointer"
                    onClick={handleItemClick}
                >
                    <div className="h-15 w-15 sm:h-20 sm:w-20 rounded-full flex-none">
                        <img
                            className='h-full w-full object-cover rounded-md'
                            src={`${process.env.REACT_APP_API_URL_IMAGE}${dataCartItem.items.length > 0 && dataCartItem.items[0].imageUrl}`} alt="ordered item"
                            onError={handleImageOnError}
                            onLoad={handleImageOnLoad}
                        />
                    </div>
                    <div className="flex-none">
                        <h6 className="text-lg   font-medium text-black dark:text-white">
                            {formatDateTime(dataCartItem.createdAt).date}
                        </h6>
                        <p className="text-sm text-red-500 dark:text-gray-400">
                            {formatDateTime(dataCartItem.createdAt).time}
                        </p>
                    </div>
                    <div className='grow gap-2 flex items-center justify-between lg:ml-10 w-full'>
                        <div className='text-sm '>
                            Method: <span className={`font-bold text-xl`}>{dataCartItem.paymentMethod}</span>
                        </div>
                        <div className='text-sm'>
                            Status: <span className={`${getStatusColor(dataCartItem?.status)} font-bold text-xl capitalize`}>{dataCartItem?.status}</span>
                        </div>
                        <div className='text-sm text-nowrap hidden sm:block'>
                            Total Items: <span className='font-bold text-xl'>{getTotalQuantity(dataCartItem.items)}</span>
                        </div>
                        <div className='flex  text-xl ml-5 items-center '>
                            <div className=' text-2xl text-main'> {formatCurrencyVND(dataCartItem.totalAmount)}đ</div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default OrderedItem;