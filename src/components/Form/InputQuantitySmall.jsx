import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";

const InputQuantitySmall = ({ initialQuantity = 0, maxQuantity, minQuantity = 1, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        setQuantity(Math.min(initialQuantity, maxQuantity));
    }, [initialQuantity, maxQuantity]);

    const handleIncrease = (event) => {
        event.stopPropagation();
        if (quantity < maxQuantity) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            if (onQuantityChange) {
                onQuantityChange(newQuantity);
            }
        }
    };

    const handleDecrease = (event) => {
        event.stopPropagation();
        if (quantity > minQuantity) {
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
                className="bg-gray-300  border-2 border-slate-200  font-semibold p-2 rounded-l-md hover:bg-gray-400"
                onClick={handleDecrease}
            >
                <FaMinus />
            </button>
            <input
                type="text"
                className="w-15 text-center dark:bg-black border-y-2 p-1 border-slate-200"
                value={quantity}
                readOnly
            />
            <button
                className="bg-gray-300  border-2 border-slate-200  font-semibold p-2 rounded-r-md hover:bg-gray-400"
                onClick={handleIncrease}
            >
                <FaPlus />
            </button>
        </div>
    );
};

export default InputQuantitySmall;
