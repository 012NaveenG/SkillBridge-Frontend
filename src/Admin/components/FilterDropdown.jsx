import React, { useState } from 'react';

const FilterDropdown = ({title}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = (e) => {
        e.preventDefault()
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="inline-flex items-center justify-between w-full p-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm text-sm font-medium  hover:bg-gray-300 focus:outline-none text-TK_Text"
            >
                <p >{title}</p>
                {/* Arrow icon for dropdown */}
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ">
                    <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="filterButton">
                        {/* Dropdown items */}
                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem transition-all ease-linear duration-150">Option 1</p>
                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all ease-linear duration-150 hover:text-gray-900" role="menuitem">Option 2</p>
                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Option 3</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
