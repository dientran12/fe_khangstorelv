import React, { useState } from 'react'
import imageEmpty from '~/assets/images/image-empty.jpg'
import { IoCloseOutline } from "react-icons/io5";
import { formatCurrencyVND, handleImageOnError, handleImageOnLoad } from '~/ultils/helpers';
import InputQuantitySmall from '../Form/InputQuantitySmall';

const OrderItem = ({ dataCartItem }) => {
    const totalPrice = dataCartItem.price * dataCartItem.quantity;
    return (
        <div
            className="flex gap-1 sm:gap-4.5 border-t border-stroke sm:px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
        >
            <div className="flex basis-3/4 gap-1 sm:gap-3">
                <div className="h-15 w-15 rounded-full">
                    <img
                        className='h-full w-full object-cover rounded-md'
                        src={`${process.env.REACT_APP_API_URL_IMAGE}${dataCartItem.imageUrl ? dataCartItem.imageUrl : dataCartItem?.images?.length > 0 && dataCartItem.images[0]}`} alt={dataCartItem.productName}
                        onError={handleImageOnError}
                        onLoad={handleImageOnLoad}
                    />
                </div>
                <div className='flex items-center gap-1 sm:gap-5'>
                    <h6 className="text-md  font-medium text-black dark:text-white  overflow-hidden text-nowrap text-ellipsis max-w-20 sm:max-w-50 xl:max-w-25">
                        {dataCartItem.productName}
                    </h6>
                    <div className="text-sm">{dataCartItem.style} - {dataCartItem.size} <p className='inline'>x {dataCartItem.quantity}</p>
                        <p className='hidden sm:inline text-lg ml-5 text-red-500'>x {formatCurrencyVND(Number(dataCartItem.price))}đđ</p>
                    </div>
                </div>
            </div>
            <div className='flex basis-1/4  text-xl sm:ml-5 items-center '>
                =
                <div className='ml-1 sm:ml-5 text-2xl text-main'> {formatCurrencyVND(totalPrice)}đ</div>
            </div>
        </div>
    )
}

export default OrderItem;