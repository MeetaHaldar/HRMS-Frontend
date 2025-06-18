import React, { useState, useEffect } from "react";
import axios from "axios";
import dev_url from "../../../../config";

const SalaryComponentDropdown = ({
  onAddComponent,
  selectedComponents = [],
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [componentOptions, setComponentOptions] = useState({
    Earnings: [],
    Reimbursement: [],
    Deduction: [],
    Benefits: [],
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [earningsRes, deductionRes, reimbursementRes, benefitRes] =
          await Promise.all([
            axios.get(`${dev_url}salary/getearnigComponent`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${dev_url}salary/getdeductioncomponent`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${dev_url}salary/getreimbursementComponent`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${dev_url}salary/getbenefitComponent`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        setComponentOptions({
          Earnings:
            earningsRes.data?.map((item, index) => item.earning_name) || [],
          Deduction:
            deductionRes.data?.data?.map(
              (item, index) => item.deduction_name
            ) || [],
          Reimbursement:
            reimbursementRes.data?.map(
              (item) => item.reimbursement_type_name
            ) || [],
          Benefits:
            benefitRes.data?.data?.map(
              (item, index) => item.benefit_type_name
            ) || [],
        });
      } catch (error) {
        console.error("Error fetching salary components:", error);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    setActiveCategory(null);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  const handleItemClick = (category, item) => {
    if (selectedComponents.includes(item)) return;
    onAddComponent(category, item);
    setIsDropdownOpen(false);
    setActiveCategory(null);
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-gray-100 cursor-pointer"
        onClick={toggleDropdown}
      >
        + Add Salary Component
      </button>

      {isDropdownOpen && (
        <ul className="absolute left-0 mt-1 bg-white rounded-md shadow-lg w-full z-10">
          {Object.entries(componentOptions).map(([category, items]) => (
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
