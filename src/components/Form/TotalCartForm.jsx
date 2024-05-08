import { formatCurrencyVND } from "~/ultils/helpers";

const TotalCartForm = ({ total, itemCount, onBuyNow, selectedItems, itemTotal }) => {
    console.log("total", total);
    return (
        <div
            className="rounded-md  h-fit duration-300 ease-in-out  shadow-default  bg-white  dark:bg-boxdark col-span-12 xl:col-span-5"
        >
            <h1 className="text-3xl px-4 md:px-6 xl:px-9 font-semibold text-black border-b-2  dark:text-white py-5">
                Selected Information
            </h1>

            <div className="grid grid-cols-1 gap-5.5 p-6.5">
                <div className="text-base">Total:<p className="inline ml-10 mr-2 text-3xl font-semibold text-main">{formatCurrencyVND(total)}</p> vnđ</div>
                <div className="total-cart-form">
                    <div className="item-count">Items Selected: {selectedItems?.length}/<p className="inline text-main">{itemTotal}</p></div>
                    <div className="item-count">Number of items: {itemCount}</div>
                    <button
                        type="button"
                        onClick={() => onBuyNow(selectedItems)}
                        className={`max-w-29 ml-auto flex-1 bg-violet-700 border border-transparent rounded-md py-2 px-8 duration-200   flex items-center justify-center text-base font-medium text-white hover:bg-black-2   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full `}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TotalCartForm;
