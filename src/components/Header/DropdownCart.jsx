import { useEffect, useRef, useState } from 'react';
import { IoCart } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import NoCartItem from '~/assets/images/NoCartItem.png';
import { resetCartCount } from '~/redux/slides/cartSlice';
import { handleImageOnError, handleImageOnLoad } from '~/ultils/helpers';
import { GrFormNextLink } from "react-icons/gr";

const DropdownCart = () => {
    const dispatch = useDispatch();
    const navigete = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifying, setNotifying] = useState(false);
    const count = useSelector((state) => state.cart.count);
    const items = useSelector((state) => state.cart.items);


    const trigger = useRef(null);
    const dropdown = useRef(null);

    useEffect(() => {

        setNotifying(count > 0);  // Cập nhật notifying khi count thay đổi
    }, [count]);

    // close on click outside
    useEffect(() => {
        const clickHandler = (event) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(event.target) ||
                trigger.current.contains(event.target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = (event) => {
            if (!dropdownOpen || event.keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <li className="relative list-none ">
            <Link
                ref={trigger}
                onClick={() => {
                    setNotifying(false);
                    setDropdownOpen(!dropdownOpen);
                    dispatch(resetCartCount());
                }}
            >
                <span
                    className={`absolute -top-0.5 -right-0.5 z-1 h-2 w-2 rounded-full bg-meta-1 ${notifying === false ? 'hidden' : 'inline'
                        }`}
                >
                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                </span>
                <span className='flex gap-3 items-center cursor-pointer text-lg '>
                    <div
                        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    > <IoCart />
                    </div>
                </span>
            </Link>

            {/* <!-- Dropdown Start --> */}
            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute -right-16 mt-2.5 flex min-h-70 max-h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${dropdownOpen === true ? 'block' : 'hidden'
                    }`}
            >
                <div
                    className="px-4.5 flex  justify-between items-center py-3 cursor-pointer"
                    onClick={() => navigete('/cart')}
                >
                    <h5 className="text-sm lg:text-base font-medium">Cart</h5>
                    <GrFormNextLink />
                </div>
                {items.length > 0 ?
                    <ul className="flex h-auto list-none  flex-col overflow-y-auto">
                        {items.map(item => (
                            <li key={item.productId}>
                                <Link
                                    className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                                    to="/cart"
                                >
                                    <div className="h-12.5 w-12.5 rounded-full">
                                        <img
                                            className='h-full w-full object-cover rounded-md'
                                            src={`${process.env.REACT_APP_API_URL_IMAGE}${item.image}`} alt={item.name}
                                            onError={handleImageOnError}
                                            onLoad={handleImageOnLoad}
                                        />
                                    </div>
                                    <div>
                                        <h6 className="text-md  font-medium text-black dark:text-white">
                                            {item.name}
                                        </h6>
                                        <p className="text-sm">{item.style} - {item.size} x {item.quantity}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    : (
                        <div
                            className="rounded-full"
                        >
                            <img
                                className='h-full w-full object-cover rounded-md'
                                src={NoCartItem} alt="No item"
                                onError={handleImageOnError}
                                onLoad={handleImageOnLoad}
                            />
                        </div>
                    )}
            </div>
        </li>
    );
};

export default DropdownCart;
