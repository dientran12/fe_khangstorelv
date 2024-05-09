import React from 'react'
import logo from '~/assets/logo_main.jpg'
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import path from '~/ultils/path'
import { Link } from 'react-router-dom';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownCart from './DropdownCart';
import DropdownAccount from './DropdownAccount';

const Header = () => {

    return (
        <div className=" w-full  bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none sticky top-0 z-999 ">
            <div className="flex mx-1 sm:mx-5 items-center  h-[110px] justify-between py-[35px] xl:mx-40">
                <Link to={`/${path.HOME}`}><img src={logo} alt="logo" className="w-50 object-contain" /></Link>
                <div className="flex sm:gap-5">
                    <div className="flex  ">
                        <DarkModeSwitcher />
                        <div className=" p-2 hidden sm:flex">
                            <span className='flex gap-3 items-center'>
                                <BsTelephoneFill color='red' />
                                <span className='font-semibold '>(+84)  345  425  175</span>
                            </span>
                        </div>
                        <div className=" p-2 hidden sm:flex">
                            <span className='flex gap-3 items-center'>
                                <MdEmail color='red' />
                                <span className='font-semibold '>khangcute@gmail.com</span>
                            </span>
                        </div>
                    </div>
                    <div className='border-l border-stone-400 hidden sm:block'></div>
                    <div className="flex self-center">
                        <div className="flex p-2 ">
                            <DropdownAccount />
                        </div>
                        <div className="flex p-2 sm:ml-4">
                            <DropdownCart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header