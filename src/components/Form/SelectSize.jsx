import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiChevronUpDown } from "react-icons/hi2"
import { FaCheck } from "react-icons/fa6";

// const Sizes = [
//     { id: 1, name: 'S', bgColor: 'bg-orange-500' },
//     { id: 2, name: 'M', bgColor: 'bg-pink-600' },
//     { id: 3, name: 'L', bgColor: 'bg-purple-600' },
//     { id: 4, name: 'XL', bgColor: 'bg-yellow-500' },
//     { id: 5, name: '2XL', bgColor: 'bg-green-500' },
// ];



const SelectSize = ({ sizes, onSelect }) => {
    const [selected, setSelected] = useState(sizes[0] || { name: 'N/A' });

    useEffect(() => {
        if (sizes.length > 0) {
            setSelected(sizes[0]);
        }
    }, [sizes]);

    return (
        <Listbox value={selected} onChange={value => { setSelected(value); onSelect(value); }}>
            {({ open }) => (
                <>
                    <div className="relative ">
                        <Listbox.Button disabled className={`relative rounded-md py-2.5 flex-shrink-0 flex items-center w-full text-md font-medium h-full text-white cursor-default  pl-3 pr-10 text-left text-gray-900 shadow-sm  sm:text-sm sm:leading-6 ${selected?.size ? 'bg-blue-500  ' : 'bg-zinc-800 cursor-not-allowed text-amber-900'} `}>
                            <span className="flex items-center">
                                <span className="ml-3 block truncate text-base">{selected?.size || "No Size"}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <HiChevronUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {sizes.map((size, index) => (
                                    <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 text-base ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`
                                        }
                                        value={size}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span
                                                        className={`block truncate   ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {size.size}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                                                    >
                                                        <FaCheck className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}

export default SelectSize;