import React, { useState } from 'react';
import { MdOutlinePayment } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

const SelectPay = ({ onPaymentMethodChange, methodDefault }) => {
    // Thiết lập "Direct" là giá trị mặc định cho selectedOption
    const [selectedOption, setSelectedOption] = useState(methodDefault);
    const [isOptionSelected, setIsOptionSelected] = useState(true); // Cập nhật này để hiển thị màu sắc văn bản mặc định

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    return (
        <div>
            <div className="relative z-20 bg-white dark:bg-form-input">
                <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                    <MdOutlinePayment className="text-2xl text-black dark:text-white" />
                </span>
                <select
                    value={selectedOption}
                    onChange={(e) => {
                        setSelectedOption(e.target.value);
                        changeTextColor();
                        onPaymentMethodChange(e.target.value);
                    }}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
                        }`}
                >
                    <option value="Direct" className="text-body  dark:text-bodydark">
                        Direct Payment
                    </option>
                    <option value="Card" className="text-body dark:text-bodydark">
                        Card Payment
                    </option>
                </select>

                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <FaChevronDown className="text-sm text-black dark:text-white" />
                </span>
            </div>
        </div>
    );
};

export default SelectPay;
