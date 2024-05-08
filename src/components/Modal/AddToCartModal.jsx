import React, { useState, useEffect, useRef } from 'react';
import { handleImageOnError, handleImageOnLoad } from '~/ultils/helpers';
import ContentModalAddToCart from './ContentModalAddToCart';

const AddToCartModal = ({ onAdd, onClose, productData }) => {
    const [isVisible, setIsVisible] = useState(false);

    const modalRef = useRef(null);  // Tạo một ref để tham chiếu tới phần tử modal

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleClose();  // Gọi hàm onClose nếu click bên ngoài phần tử modal
        }
    };

    useEffect(() => {
        setIsVisible(true);  // Khi component được mount, bật trạng thái hiển thị
    }, []);

    const handleClose = () => {
        setIsVisible(false);  // Bắt đầu hiệu ứng fade out trước khi gọi onClose
        setTimeout(onClose, 300);  // Delay một chút để cho phép hiệu ứng hoàn thành
    };

    return (
        <div className={`fixed inset-0 z-99 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center text-black items-center ${isVisible ? 'animate-fadeIn' : 'animate-fadeOut'} `} onClick={handleOutsideClick}>
            <div ref={modalRef} className="mt-20 flex flex-col mx-5 lg:mx-40 w-full xl:max-w-270 min-h-125 sm:min-w-[400px] rounded-md border border-stroke bg-white shadow-default dark:border-stroke-dark dark:bg-box-dark" onClick={(e) => e.stopPropagation()}>
                <div className="border-b border-stroke py-4 px-6.5 dark:border-stroke-dark">
                    <h3 className="font-medium ">
                        {productData?.name || "Product added to cart"}
                    </h3>
                </div>
                <div className="flex-grow p-4">
                    <ContentModalAddToCart productData={productData} />

                    {/* <div className="aspect-w-1 aspect-h-1">
                        <img
                            className="w-full object-cover rounded-t-lg"
                            src={`${process.env.REACT_APP_API_URL_IMAGE}${productData.images[0]}`}
                            onError={handleImageOnError}
                            onLoad={handleImageOnLoad}
                            alt="Product"
                        />
                    </div> */}
                </div>
                <div className="shrink-0 flex justify-end gap-2 mt-4 p-4">
                    <button type="button" className="bg-blue-500 text-white py-1.5 px-4 rounded">
                        Add
                    </button>
                    <button type="button" onClick={handleClose} className="bg-slate-100 text-black py-2 px-4 rounded border border-stroke">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddToCartModal;
