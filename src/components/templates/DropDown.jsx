import React, { useState } from "react";

function DropDown({title, options, setOption }) {
  const [selectedOption, setSelectedOption] = useState(title);
  const [isOpen, setIsOpen] = useState(false);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOption(option);
    setIsOpen(false);
  };
  return (
    <div className="relative inline-block w-32 md:w-40 lg:w-48">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-2 pr-1 py-1 md:px-4 md:py-2 bg-[#A6E02B] text-[#002147] text-xs md:text-sm lg:text-lg font-semibold rounded-lg shadow-md hover:bg-[#a1d13b] transition duration-300 flex justify-between items-center"
      >
        {selectedOption.split("_")
    .join(" ").toUpperCase()}
        <svg
          className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute left-0 w-full mt-2 bg-[#A6E02B] rounded-lg shadow-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-2 py-1 md:px-4 md:py-2 font-semibold text-xs md:text-sm  lg:text-lg text-[#002147] hover:bg-[#a1d13b] cursor-pointer rounded-lg transition duration-300"
              onClick={() => handleOptionClick(option)}
            >
              {option.split("_").join(" ").toUpperCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropDown;
