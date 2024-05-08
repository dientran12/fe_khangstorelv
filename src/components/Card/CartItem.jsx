import React, { useState } from 'react'
import imageEmpty from '~/assets/images/image-empty.jpg'
import { IoCloseOutline } from "react-icons/io5";
import { formatCurrencyVND, handleImageOnError, handleImageOnLoad } from '~/ultils/helpers';
import InputQuantitySmall from '../Form/InputQuantitySmall';

const CartItem = ({ dataCartItem, onToggle, isSelected, onQuantityChange, onRemoveItem }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [quantity, setQuantity] = useState(Math.min(dataCartItem.quantity, dataCartItem.sizeQuantity));

    const handleRemove = async (event) => {
        event.stopPropagation();  // Ngăn chặn sự kiện lan ra ngoài

        // Bắt đầu hiệu ứng trượt và đặt timeout
        setIsExiting(true);
        setTimeout(async () => {
            const checkIsSuccess = await onRemoveItem(dataCartItem.cartItemId);

            if (checkIsSuccess === "error")
                setIsExiting(false);
        }, 500);


    }

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
        onQuantityChange(dataCartItem.cartItemId, newQuantity);
    };

    const itemClass = isSelected ?
        "bg-slate-500 hover:bg-slate-400 dark:border-2 dark:border-[#1d4ed8] hover:dark:bg-slate-100  hover:dark:bg-opacity-[15%] "
        :
        "bg-slate-100  bg-opacity-[15%]  hover:bg-opacity-100 hover:dark:bg-opacity-100 dark:bg-opacity-30";

    return (
        <div className={`flex relative w-full gap-1 sm:gap-4  self-center border-l-6 rounded-md ${itemClass} border-blackhover:bg-opacity-100 cursor-pointer px-7 py-2 shadow-md dark:bg-[#1B1B24] dark:border-[#ffa70b]  md:p-4  ${isExiting ? 'animate-slideOutLeft' : ''}`}
            onClick={() => onToggle(dataCartItem)}
        >
            <div className="flex-none  mr-3">
                <img
                    src={`${process.env.REACT_APP_API_URL_IMAGE}${dataCartItem.images && dataCartItem.images[0]}`}
                    alt="product "
                    className="w-26 h-26 object-cover rounded-md"
                    onError={handleImageOnError}
                    onLoad={handleImageOnLoad}
                />
            </div>
            <div className="flex flex-row grow ">
                <div className="self-center basis-1/2">
                    <h5 className="mb-3 text-lg font-semibold dark:text-[#9D5425]">
                        {dataCartItem.productName}
                    </h5>
                    <div className="flex  flex-row gap-4">
                        <div className="leading-relaxed text-lg">
                            Style: <p className="inline ml-2 text-base text-main">{dataCartItem.style}</p>
                        </div>
                        <div className="text-lg">
                            Size:
                            <p className="leading-relaxed inline ml-2 text-base text-[#D0915C]">
                                {dataCartItem.size}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='self-center basis-1/2'>
                    <InputQuantitySmall
                        initialQuantity={dataCartItem.quantity}
                        maxQuantity={dataCartItem.sizeQuantity}  // You might need to dynamically determine this
                        onQuantityChange={handleQuantityChange}
                    />
                </div>
            </div>
            <div className='self-center flex-none items-center flex gap-3'>
                <p className="text-lg inline font-semibold dark:text-[#9D5425]">
                    {quantity}
                </p>
                x
                <p className="text-lg inline font-semibold dark:text-[#9D5425]">
                    {formatCurrencyVND(dataCartItem.price)}
                </p>
                =
                <p className="text-3xl inline font-semibold text-main">
                    {formatCurrencyVND(dataCartItem.price * quantity)}
                </p>
            </div>
            <div
                className="absolute top-0 right-0 p-2 "
                onClick={handleRemove}
            >
                <IoCloseOutline className=' text-3xl  opacity-50 hover:opacity-100 hover:text-red-600' />
            </div>
        </div>
    )
}

export default CartItem;