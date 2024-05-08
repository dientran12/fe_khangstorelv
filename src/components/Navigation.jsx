import React from 'react'
import { NavLink } from 'react-router-dom'
import { navigation } from '~/ultils/contants'


const Navigation = () => {
    return (
        <div className="w-full bg-slate-100 drop-shadow-1 dark:bg-boxdark-2 dark:drop-shadow-none mt-0.5 sticky top-[110px] z-99">
            <div className="mx-5 h-[48px] py-2 xl:mx-40 text-base flex items-center ">
                {navigation.map((element, index) => (
                    <NavLink
                        to={element.path}
                        key={index}
                        className={({ isActive }) => isActive ? 'pr-4  sm:pr-12 text-main' : 'pr-4 sm:pr-12 hover:text-main'}
                    >
                        {element.value}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Navigation