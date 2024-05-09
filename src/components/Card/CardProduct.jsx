import { formatCurrencyVND } from "~/ultils/helpers"
import imageEmpty from '~/assets/images/image-empty.jpg';
import { useDispatch } from "react-redux";
import { addToCart as addToCartAPI } from '~/services/UserService'; // Giả sử đường dẫn này là đúng
import { addToCart } from "~/redux/slides/cartSlice";
import { useState } from "react";
import AddToCartModal from "../Modal/AddToCartModal";
import { useNavigate } from "react-router-dom";

const CardProduct = ({ product }) => {
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false);


    const handleOnClickAddToCart = async () => {
        setShowModal(true);
        navigate(`/detail/${product.id}`);
    }

    return (
        <>
            <div className="bg-slate-100 max-w-75 mx-auto dark:text-boxdark rounded-lg transition shadow-lg duration-300 border-none ease-in-out transform hover:scale-105 hover:shadow-meta-1">
                <div className="aspect-w-1 aspect-h-1">
                    <img
                        className="w-full object-cover rounded-t-lg"
                        src={product.images.length > 0 ? `${process.env.REACT_APP_API_URL_IMAGE}${product.images[0]}` : imageEmpty}
                        alt="Product"
                    />
                </div>
                <div className="p-3">
                    <div className="h-[56px] overflow-hidden "><h3 className="font-bold text-xl mb-2">{product.name}</h3></div>
                    <div className="text-sm flex justify-between items-center font-medium">
                        <span className="flex-1 text-left">Sold: <span className="font-semibold">{product.sold}</span></span>
                        {product.stock > 0 ?
                            <span className="flex-1 text-right">In Stock: <span className="font-semibold">{product.stock}</span></span>
                            :
                            <span className="font-semibold text-red-600">Out of Stock</span>
                        }
                    </div>
                    <div className="font-medium flex flex-row my-2 justify-between">
                        <h3 className="text-xl">{formatCurrencyVND(product.price)} <p className="text-red-500 inline">đ</p></h3>
                        <button
                            onClick={handleOnClickAddToCart}
                            className="px-3 py-1 h-fit rounded-md text-center duration-200 ease-out bg-black text-white hover:bg-green-500"
                        >
                            Detail
                        </button>
                    </div>
                </div>
            </div>
            {/* {showModal &&
                <AddToCartModal onClose={() => setShowModal(false)} productData={product} />
            } */}
        </>
    );
};

export default CardProduct;
