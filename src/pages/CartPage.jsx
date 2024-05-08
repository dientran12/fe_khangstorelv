import { useEffect, useState } from 'react';
import CartItem from '~/components/Card/CartItem';
import TotalCartForm from '~/components/Form/TotalCartForm';
import DefaultLayout from '~/layouts/DefaultLayout';
import { showErrorToast, showSuccessToast } from '~/ultils/toastify';
import * as UserService from "~/services/UserService";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ isTokenReady }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [itemCount, setItemCount] = useState(0);



    const toggleItemSelection = (item) => {
        const exists = selectedItems.some(selected => selected.cartItemId === item.cartItemId);
        if (exists) {
            setSelectedItems(selectedItems.filter(selected => selected.cartItemId !== item.cartItemId));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    // Hàm để tải dữ liệu giỏ hàng
    const fetchCartItems = async () => {
        try {
            const data = await UserService.getCart();
            setCartItems(data || []); // Giả sử dữ liệu trả về có dạng { items: [...] }
        } catch (error) {
        }
    };


    const handleQuantityChange = (cartItemId, newQuantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.cartItemId === cartItemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);

        // Cập nhật selectedItems nếu item đó đang được chọn
        const updatedSelectedItems = selectedItems.map(item => {
            if (item.cartItemId === cartItemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setSelectedItems(updatedSelectedItems);
    };


    const handleRemoveItem = async (itemId) => {
        console.log("itemId", itemId);
        try {
            // await UserService.removeCartItem(user.id, itemId);
            const newCartItems = cartItems.filter(item => item.cartItemId !== itemId);
            setCartItems(newCartItems);

            return "OK"
        } catch (error) {
            showErrorToast("Failed to remove item");
            return "error"
        }
    };

    useEffect(() => {
        let newTotal = 0;
        let itemCount = 0;
        selectedItems.forEach(item => {
            const effectiveQuantity = Math.min(item.quantity, item.sizeQuantity);
            newTotal += item.price * effectiveQuantity;
            itemCount += effectiveQuantity;
        });
        setItemCount(itemCount);
        setTotal(newTotal);
    }, [selectedItems]);
    // Gọi API khi component được mounted
    useEffect(() => {
        if (isTokenReady) { // Chỉ gọi API khi token đã sẵn sàng
            fetchCartItems();
        }
    }, [isTokenReady]);


    const handleBuyNow = (selectedItems) => {
        // Logic để xử lý việc "mua ngay", có thể là chuyển hướng đến trang đặt hàng
        console.log("Proceeding to checkout with items:", selectedItems);
        sessionStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        navigate('/order');
    };

    return (
        <DefaultLayout>
            <div className={`grid grid-cols-12 gap-4 md:gap-6 2xl:mt-7.5 2xl:gap-7.5  ${selectedItems.length > 0 ? "3xl:mx-40 xl:mx-5" : " xl:mx-40"}`}>
                <div className={`col-span-12 bg-white h-fit rounded-md shadow-default dark:bg-boxdark ${selectedItems.length > 0 ? "xl:col-span-7" : "xl:col-span-12"}`}>
                    <h1 className="text-3xl px-4 md:px-6 xl:px-9 font-semibold text-black border-b-2 border-main dark:border-[#ffa70b] dark:text-white py-5">
                        Cart
                    </h1>
                    <div className="rounded-sm  bg-white  p-4 shadow-default dark:bg-boxdark md:p-6 xl:p-9  ">
                        <div className="flex flex-col gap-7.5 mx-auto max-w-270">
                            {cartItems.map((item, index) =>
                                <CartItem dataCartItem={item}
                                    key={item.cartItemId}
                                    onToggle={toggleItemSelection}
                                    isSelected={selectedItems.some(selected => selected.cartItemId === item.cartItemId)}
                                    onQuantityChange={handleQuantityChange}
                                    onRemoveItem={handleRemoveItem}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {selectedItems.length > 0 && (
                    <TotalCartForm
                        total={total}
                        itemCount={itemCount}
                        itemTotal={cartItems && cartItems?.length}
                        onBuyNow={handleBuyNow}
                        selectedItems={selectedItems}
                    />
                )}
            </div>
        </DefaultLayout>
    );
};

export default CartPage;
