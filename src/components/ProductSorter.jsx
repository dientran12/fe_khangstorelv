import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Đảm bảo đã cài đặt react-icons
import { useLocation } from 'react-router-dom';

const tabs = [
    { id: 1, name: 'New Arrival' },
    { id: 2, name: 'Best Seller' },
    { id: 3, name: 'Most Popular' },
];

const ProductSorter = ({ onSortChange, onSearch, searchTerm }) => {
    const [activeTab, setActiveTab] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchInput, setShowSearchInput] = useState(false);
    const searchRef = useRef(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sortCriteriaFromURL = queryParams.get('sort');

    useEffect(() => {
        if (sortCriteriaFromURL) {
            const sortMap = { 'New Arrival': 1, 'Best Seller': 2, 'Most Popular': 3 };
            setActiveTab(sortMap[sortCriteriaFromURL]);
            handleTabClick(sortMap[sortCriteriaFromURL]);
        }
    }, [sortCriteriaFromURL]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchInput(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);

    useEffect(() => {
        setSearchQuery(searchTerm);
    }, [searchTerm]);

    const handleSearch = () => {
        console.log('Search for:', searchQuery);
        onSearch(searchQuery); // Gọi callback với query tìm kiếm (searchQuery
        setShowSearchInput(false); // Hide the search input on mobile after search
    };

    const handleSearchIconClick = () => {
        setShowSearchInput(!showSearchInput);
    };

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        const sortMap = { 1: 'New Arrival', 2: 'Best Seller', 3: 'Most Popular' };
        onSortChange(sortMap[tabId]);
        setSearchQuery('');  // Xóa truy vấn tìm kiếm khi thay đổi tab
        onSearch('');       // Cập nhật truy vấn tìm kiếm trên component cha để làm mới dữ liệu
    };

    return (
        <div className='flex justify-between border-b-2 py-0 sm:py-3  border-main'>
            <div className='flex md:text-xl gap-2 ml-12 sm:gap-8 my-auto'>
                {tabs.map((tab) => (
                    <span
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`font-semibold capitalize cursor-pointer ${activeTab === tab.id ? 'text-red-500' : 'text-gray-400'}`}
                    >
                        <h1>{tab.name}</h1>
                    </span>
                ))}
            </div>
            <div className='flex h-fit relative' ref={searchRef}>
                <button
                    className={`sm:hidden px-3 py-3 text-black  rounded ${!showSearchInput && " hover:bg-main hover:text-white"} focus:shadow-outline focus:outline-none`}
                    onClick={handleSearchIconClick}
                >
                    <FaSearch />
                </button>
                <div
                    className={showSearchInput ? `absolute top-1 sm:top-0 right-0 flex w-50` : "hidden sm:flex"}
                >
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-1 leading-tight text-gray-700 bg-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-1 -ml-2 text-white rounded-l-none bg-red-500 rounded shadow hover:bg-main focus:shadow-outline focus:outline-none"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductSorter;
