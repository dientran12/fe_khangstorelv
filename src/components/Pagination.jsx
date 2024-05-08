
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Pagination({ currentPage, totalPages, totalProducts, onPageChange }) {

    // Xác định range của các nút số trang để hiển thị
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Xử lý khi nhấn nút "Previous"
    const handlePreviousClick = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    // Xử lý khi nhấn nút "Next"
    const handleNextClick = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    // Xử lý khi nhấn vào một số trang cụ thể
    const handlePageClick = (pageNumber) => {
        onPageChange(pageNumber);
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-md text-gray-700">
                        Showing page <span className="font-medium">{currentPage}</span> to <span className="font-medium">{totalPages} </span> pages of {' '}
                        <span className="font-medium">{totalProducts}</span> products
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <div
                            className={`relative inline-flex items-center rounded-l-md cursor-pointer px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : ''}`}
                            onClick={handlePreviousClick}
                        >
                            <MdChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </div>
                        {pageNumbers.map((number) => (
                            <div
                                key={number}
                                className={`relative inline-flex items-center cursor-pointer px-4 py-2 text-sm font-semibold ${currentPage === number ? 'bg-indigo-600 text-white' : 'text-gray-900'} ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                                onClick={() => handlePageClick(number)}
                            >
                                {number}
                            </div>
                        ))}
                        <div
                            className={`relative inline-flex items-center rounded-r-md cursor-pointer px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : ''}`}
                            onClick={handleNextClick}
                        >
                            <MdChevronRight className="h-5 w-5" aria-hidden="true" />
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
