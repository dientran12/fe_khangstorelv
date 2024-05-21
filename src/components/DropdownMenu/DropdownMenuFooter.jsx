import React from 'react'

const DropdownMenuFooter = ({ title, items, isOpen, setIsOpen }) => {
    return (
        <div>
            <h6 className="text-lg sm:text-xl sm:font-semibold uppercase hover:scale-125 hover:text-blue-600 duration-150 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}>{title}</h6>
            <div className={`sm:block ${isOpen ? 'block' : 'hidden'}`}>
                {items.map(item => (
                    <div key={item} className="text-sm sm:text-base cursor-pointer hover:scale-110 hover:text-blue-600 duration-150">{item}</div>
                ))}
            </div>
        </div>
    )
}

export default DropdownMenuFooter