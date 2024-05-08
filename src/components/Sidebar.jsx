import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { createSlugify } from '~/ultils/helpers';
import { IoMenu } from "react-icons/io5";

const Sidebar = () => {
    const categories = useSelector(state => state.category.items);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const trigger = useRef(null);
    const sidebar = useRef(null);

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (sidebar.current.contains(target) || trigger.current.contains(target)) return;
            setIsSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (keyCode !== 27) return;
            setIsSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <div>
            <button ref={trigger} className="md:hidden bg-blue-600 p-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <IoMenu className="text-2xl text-white dark:text-black" />
            </button>

            {/* Sidebar drawer */}
            <div ref={sidebar} className={`fixed inset-y-0 dark:bg-boxdark-2 h-screen top-[158px] left-0 z-30 w-64  overflow-y-auto transition duration-300 ease-in-out transform bg-white ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:inset-0`}>
                {/* Your NavLinks go here */}
                <div className=" flex flex-col">
                    <NavLink
                        to="/product/all"
                        className={({ isActive }) =>
                            "px-5 py-3 hover:bg-blue-400 hover:border-r-8 hover:border-blue-600  hover:text-white transition duration-300 ease-in-out" +
                            (isActive ? " bg-blue-600 text-white border-r-8 border-blue-700" : "border-r-8 border-white")}
                    >
                        All Products
                    </NavLink>
                    {categories.map((category, index) => (
                        <NavLink
                            to={`/product/${createSlugify(category.name)}`}
                            key={index}
                            className={({ isActive }) =>
                                "px-5 py-3 hover:bg-blue-400 hover:border-r-8 hover:border-blue-600  hover:text-white transition duration-300 ease-in-out" +
                                (isActive ? " bg-blue-600 text-white border-r-8 border-blue-700" : "border-r-8 border-white")}
                        >
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

