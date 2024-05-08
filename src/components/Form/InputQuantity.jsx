import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";

const InputQuantity = ({ initialQuantity = 0, maxQuantity, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        setQuantity(Math.min(initialQuantity, maxQuantity));
    }, [initialQuantity, maxQuantity]);

    const handleIncrease = () => {
        if (quantity < maxQuantity) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            if (onQuantityChange) {
                onQuantityChange(newQuantity);
            }
        }
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            if (onQuantityChange) {
                onQuantityChange(newQuantity);
            }
        }
    };

    return (
        <div className="flex items-center">
            <button
                className="bg-gray-300  border-2 border-slate-500  font-semibold p-3 rounded-l-md hover:bg-gray-400"
                onClick={handleDecrease}
            >
                <FaMinus />
            </button>
            <input
                type="text"
                className="w-30 text-center dark:bg-black border-y-2 p-2 border-slate-500"
                value={quantity}
                readOnly
            />
            <button
                className="bg-gray-300  border-2 border-slate-500  font-semibold p-3 rounded-r-md hover:bg-gray-400"
                onClick={handleIncrease}
            >
                <FaPlus />
            </button>
        </div>
    );
};

export default InputQuantity;
