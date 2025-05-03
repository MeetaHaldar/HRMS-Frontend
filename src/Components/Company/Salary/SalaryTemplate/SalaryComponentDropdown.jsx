import React, { useState } from "react";

const categoryOptions = {
  Earnings: ["Basic", "Fixed Allowance", "Bonus"],
  Reimbursement: ["Travel", "Medical", "Food"],
  Deduction: ["PF", "Tax", "Loan"],
  Benefits: ["Health Insurance", "Gratuity", "ESOP"],
};

const SalaryComponentDropdown = ({
  onAddComponent,
  selectedComponents = [],
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    setActiveCategory(null);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  const handleItemClick = (category, item) => {
    if (selectedComponents.includes(item)) return; // Avoid duplicates
    onAddComponent(category, item);
    setIsDropdownOpen(false);
    setActiveCategory(null);
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-gray-100  cursor-pointer"
        onClick={toggleDropdown}
      >
        + Add Salary Component
      </button>

      {isDropdownOpen && (
        <ul className="absolute left-0 mt-1 bg-white rounded-md shadow-lg w-full z-10">
          {Object.entries(categoryOptions).map(([category, items]) => (
            <li key={category} className="relative">
              <div
                className="px-4 py-2 text-sm text-gray-700 hover:bg-[#FFD85F] cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>

              {activeCategory === category && (
                <ul className="mt-1 ml-4 bg-white rounded-md shadow z-20">
                  {items.map((item) => {
                    const isAlreadyAdded = selectedComponents.includes(item);
                    return (
                      <li
                        key={item}
                        className={`px-4 py-2 ${
                          isAlreadyAdded
                            ? "text-gray-400 cursor-not-allowed"
                            : "hover:bg-[#FFD85F] cursor-pointer"
                        }`}
                        onClick={() =>
                          !isAlreadyAdded && handleItemClick(category, item)
                        }
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SalaryComponentDropdown;
