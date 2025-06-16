import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import dev_url from "../../../../config";
import { id } from "date-fns/locale";

const AddBenefitPopup = ({ isOpen, onClose, item = null }) => {
  const [benefitTypes, setBenefitTypes] = useState([]);
  const [formData, setFormData] = useState({
    id: item ? item.id : null,
    benefit_type_id: null,
    benefit_type_name: "",
    include_employer_contribution: 0,
    calculate_pro_rata: 0,
    is_active: 1,
  });

  const token = localStorage.getItem("token");

  const initialFormState = {
    id: item ? item.id : null,
    benefit_type_id: null,
    benefit_type_name: "",
    include_employer_contribution: 0,
    calculate_pro_rata: 0,
    is_active: 1,
  };

  useEffect(() => {
    const fetchBenefitTypes = async () => {
      try {
        const response = await axios.get(`${dev_url}salary/getBenefitTypes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const options = response.data.map((benefit) => ({
          label: benefit.name,
          value: benefit.id,
          name: benefit.name,
        }));
        setBenefitTypes(options);
      } catch (error) {
        console.error("Failed to fetch benefit types", error);
      }
    };

    fetchBenefitTypes();
  }, [token]);

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        benefit_type_id: item.benefit_type_id,
        benefit_type_name: item.benefit_type_name,
        include_employer_contribution: item.include_employer_contribution,
        calculate_pro_rata: item.calculate_pro_rata,
        is_active: item.is_active,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [item, isOpen]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked ? 1 : 0,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      benefit_type_id: selectedOption?.value || null,
      benefit_type_name: selectedOption?.name || "",
    }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = async () => {
    try {
      const endpoint = item
        ? `${dev_url}salary/updatebenfitComponent`
        : `${dev_url}salary/addbenefitComponent`;
      const method = item ? "put" : "post";
      await axios[method](endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting benefit data:", error);
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#EAEAEA",
      boxShadow: state.isFocused ? "0 0 0 2px #FFD85F" : "none",
      "&:hover": { borderColor: "#FFD85F" },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#FFD85F" : "white",
      color: "black",
    }),
    singleValue: (base) => ({
      ...base,
      color: "black",
    }),
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            {item ? `Edit Benefit` : "Add Benefit"}
          </h2>
          <button
            onClick={handleCancel}
            className="text-xl font-bold text-gray-500 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Benefit Type <span className="text-red-500">*</span>
            </label>
            <Select
              value={benefitTypes.find(
                (opt) => opt.value === formData.benefit_type_id
              )}
              onChange={handleSelectChange}
              options={benefitTypes}
              styles={customStyles}
              placeholder="Select benefit type..."
              className="w-full"
            />
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="include_employer_contribution"
                checked={!!formData.include_employer_contribution}
                onChange={handleCheckboxChange}
                className="accent-yellow-500"
              />
              <span>Include employer contribution</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="calculate_pro_rata"
                checked={!!formData.calculate_pro_rata}
                onChange={handleCheckboxChange}
                className="accent-yellow-500"
              />
              <span>Calculate on pro-rata basis</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_active"
                checked={!!formData.is_active}
                onChange={handleCheckboxChange}
                className="accent-yellow-500"
              />
              <span>Mark this active</span>
            </label>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleSubmit}
              disabled={!formData.benefit_type_id}
              className={`flex-1 bg-[#FFD85F] hover:bg-yellow-600 text-gray-700 font-semibold py-2 rounded-full mr-2 
              ${
                !formData.benefit_type_id ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {item ? "Save Changes" : "+ Add Benefit"}
            </button>

            <button
              onClick={handleCancel}
              className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-600 font-medium py-2 rounded-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBenefitPopup;
