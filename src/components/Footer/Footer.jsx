import React from 'react';
import { FaTelegram, FaYoutube } from 'react-icons/fa';
import { FaFacebookMessenger, FaTiktok, FaTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";

function Footer() {
    return (
        <footer className="flex flex-row  gap-5 sm:gap-20 justify-start py-10 px-4 sm:p-10 xl:px-40 bg-neutral text-neutral-content dark:bg-boxdark bg-boxdark-2 text-white">
            <div className="flex justify-between  gap-10 sm:gap-20 basis-2/3 xl:gap-50 ">
                <nav>
                    <h6 className="text-2xl font-semibold  hover:scale-125 hover:text-blue-600 duration-150 cursor-pointer">Services</h6>
                    <div className="cursor-pointer hover:scale-110 hover:text-blue-600 duration-150">Branding</div>
                    <div className="cursor-pointer hover:scale-110 hover:text-blue-600 duration-150">Design</div>
                    <div className="cursor-pointer hover:scale-110 hover:text-blue-600 duration-150">Marketing</div>
                    <div className="cursor-pointer hover:scale-110 hover:text-blue-600 duration-150">Advertisement</div>
                </nav>
                <nav>
                    <h6 className="text-2xl font-semibold  hover:scale-125 hover:text-blue-600 duration-150 cursor-pointer">Company</h6>
                    <div className="cursor-pointer hover:scale-110 hover:text-blue-600 duration-150">About us</div>
                    <div className="cursor-pointer hover:scale-110 hover:text-blue-600 duration-150">Contact</div>
                    <div className="cursor-pointer hover:scale-110 hover:text-blue-600 duration-150">Jobs</div>
                    <div className="cursor-pointer hover:scale-110 hover:text-blue-600 duration-150">Press kit</div>
                </nav>
                <nav>
                    <h6 className="text-2xl font-semibold  hover:scale-125 hover:text-blue-600 duration-150 cursor-pointer">Legal</h6>
                    <div className="cursor-pointer hover:scale-110 hover:text-blue-600 duration-150">Terms of use</div>
                    <div className="cursor-pointer hover:scale-110 hover:text-blue-600 duration-150">Privacy policy</div>
                    <div className="cursor-pointer hover:scale-110 hover:text-blue-600 duration-150">Cookie policy</div>
                </nav>
            </div>
            <div className='w-full xl:ml-30 basis-1/3'>

                <div
                    className="flex w-full">
                    <input
                        type="text"
                        placeholder="Email address..."
                        className="w-30 sm:w-full  px-4 py-1 leading-tight text-gray-700 bg-transparent rounded-r-none border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                    <button
                        className="px-2 sm:px-6 py-1  text-white rounded-l-none bg-blue rounded border border-l-0 shadow focus:shadow-outline hover:bg-blue-500 duration-150 focus:outline-none"
                    >
                        Subscribe
                    </button>
                </div>
                <div className="flex px-4 md:px-10 mt-10  md:text-2xl justify-between md:gap-4">
                    <div className="cursor-pointer hover:scale-150 hover:text-blue-600 duration-150 "><FaFacebook /></div>
                    <div className="cursor-pointer hover:scale-150 hover:text-blue-600 duration-150 "><FaYoutube /></div>
                    <div className="cursor-pointer hover:scale-150 hover:text-blue-600 duration-150 "><FaFacebookMessenger /></div>
                    <div className="cursor-pointer hover:scale-150 hover:text-blue-600 duration-150 "><FaTelegram /></div>
                    <div className="cursor-pointer hover:scale-150 hover:text-blue-600 duration-150 "><FaTiktok /></div>
                    <div className="cursor-pointer hover:scale-150 hover:text-blue-600 duration-150 "><FaTwitter /></div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
